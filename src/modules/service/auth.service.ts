import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {UsersEntity} from "../../entity/users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthDto} from "../../models/requests/auth.dto";
import {hashPassword, verifyPassword} from "../../utils/hashPassword";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>, private readonly jwtService: JwtService) {
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOneBy({email})
    }

    async signUp(signUpRequest: AuthDto) {
        const {email, password} = signUpRequest
        const userFound: UsersEntity = await this.findByEmail(email)
        if (userFound) {
            throw new BadRequestException("Email already exists")
        }
        const hashedPassword = await hashPassword(password)
        const user = new UsersEntity()
        user.email = email
        user.password = hashedPassword
        await this.userRepository.save(user)
        return {message: 'registration successful', data: user.email}
    }

    async signIn(signInRequest: AuthDto) {
        const {email, password} = signInRequest
        const foundUser = await this.findByEmail(email)
        if (!foundUser) {
            throw new NotFoundException("Wrong credentials or password")
        }
        const isMatch = await verifyPassword(password, foundUser.password)
        if (!isMatch) {
            throw new NotFoundException("Wrong credentials or password")
        }
        const token = await this.signToken(foundUser.email)
        return {
            message: 'sign in successful',
            user: foundUser.email,
            token
        }
    }

    async signToken(email: string) {
        const secret = process.env.JWT_SECRET
        return await this.jwtService.signAsync({email}, {secret})
    }
}
