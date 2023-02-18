import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty({message: "password can't be empty"})
    @Length(6,20,{message:"password length is min.6 and max 20"})
    password: string
}