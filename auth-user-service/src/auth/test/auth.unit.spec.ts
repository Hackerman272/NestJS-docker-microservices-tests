import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import {UsersService} from "../../users/users.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ClientProxy, ClientProxyFactory, Transport} from "@nestjs/microservices";
import {Test} from "@nestjs/testing";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {forwardRef} from "@nestjs/common";
import {UsersModule} from "../../users/users.module";
import {RolesModule} from "../../roles/roles.module";
import * as process from "process";
import {AuthModule} from "../auth.module";

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;
    let clientProxy: ClientProxy;

    beforeEach(() => {
        authService = new AuthService(usersService, jwtService, clientProxy);
        authService.profileClient.connect().then(result => console.log(result)).catch(error => console.log(error));
        authController = new AuthController(authService);
    });
    //
    // describe('generateToken', () => {
    //     it('new user', async () => {
    //         jest.spyOn(authService, 'generateToken').mockImplementation();
    //         expect(await authService.generateToken({
    //                 id: 123,
    //                 email: "mail@mail.ru",
    //             banReason: "",
    //             banned: false,
    //             password: "",
    //             profileId: 0,
    //             roles: []
    //             }
    //         )).toHaveProperty('token');
    //     });
    // })

    describe('registration', () => {
        const new_user_email = `test${Math.floor(Math.random() * 100000)}@test.ru`
        const isValidOrg = function(res) {
            res.body.should.have.property("userId", "authInfo", "profileInfo");
            res.body.authInfo.should.have.property("token")
            res.body.profileInfo.should.have.property("id", "name", "surname", "phoneNumber", "middleName")
        };

        it('new user', async () => {
            jest.spyOn(authService, 'registration').mockImplementation();
            expect(await authController.registration(
                {
                    email: new_user_email,
                    password: "123123",
                    name: "qqqqqq",
                    surname: "qqqq",
                    phoneNumber: "+354454453343",
                    middleName: "qq"
                }
            )).toBe(isValidOrg);
        });

        it('user already here', async () => {
            jest.spyOn(authService, 'registration').mockImplementation();
            expect(await authController.registration(
                {
                    email: new_user_email,
                    password: "123123",
                    name: "qqqqqq",
                    surname: "qqqq",
                    phoneNumber: "+354454453343",
                    middleName: "qq"
                }
            )).toBe({
                    "statusCode": 400,
                    "message": "Пользователь с таким email уже есть"
                }
            );
        });
    });
});
