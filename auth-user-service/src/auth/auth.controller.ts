import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {RegistrationDtoDto} from "./dto/registration.dto";
import {EventPattern} from "@nestjs/microservices";

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Post('/login')
    login(@Body()  userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body()  registrationDto: RegistrationDtoDto){
        return this.authService.registration(registrationDto)
    }

    // Не работает
    // @EventPattern('profile_create') // временное решение проблемы с отсутствием паттерна для сообщения через раз
    // async test() {
    //     return 1;
    // }
}
