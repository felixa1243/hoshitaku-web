import {Module} from '@nestjs/common';
import {AuthService} from './service/auth.service';
import {AuthController} from './controllers/auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../entity/users.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]),JwtModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [TypeOrmModule, AuthService]
})
export class AuthModule {
}
