import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from '../service/auth.service';
import {AuthDto} from "../../models/requests/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/sign-up')
    signUp(@Body() signUpRequest: AuthDto) {
        return this.authService.signUp(signUpRequest)
    }

    @Post('/sign-in')
    async signIn(@Body() signInRequest: AuthDto) {
        return await this.authService.signIn(signInRequest)
    }
}
