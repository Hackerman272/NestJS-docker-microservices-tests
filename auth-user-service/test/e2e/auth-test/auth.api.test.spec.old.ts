import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from "../../../src/auth/auth.module";
import { AuthService } from '../../../src/auth/auth.service';
import { INestApplication } from '@nestjs/common';
import {RolesModule} from "../../../src/roles/roles.module";
import {SequelizeModule} from "@nestjs/sequelize";

describe('Auth', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AuthModule, RolesModule, SequelizeModule],
        })
            .overrideProvider(AuthService)
            .useValue(AuthService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    const new_user_email = `test${Math.floor(Math.random() * 100000)}@test.ru`
    it(`/POST auth/registration valid`, () => {
        const isValidOrg = function(res) {
            res.body.should.have.property("userId", "authInfo", "profileInfo");
            res.body.authInfo.should.have.property("token")
            res.body.profileInfo.should.have.property("id", "name", "surname", "phoneNumber", "middleName")
        };

        return request(app.getHttpServer())
            .post('/auth/registration')
            .send({
                "email": new_user_email,
                "password": "123123",
                "name": "test",
                "surname": "test",
                "phoneNumber": "+354454453343"
            })
            .expect(201)
            .expect(isValidOrg);
    });
    it(`/POST auth/registration invalid`, () => {
        const isValidOrg = function(res) {
            res.body.should.have.property("userId", "authInfo", "profileInfo");
            res.body.authInfo.should.have.property("token")
            res.body.profileInfo.should.have.property("id", "name", "surname", "phoneNumber", "middleName")
        };

        return request(app.getHttpServer())
            .post('/auth/registration')
            .send({
                "email": new_user_email,
                "password": "123123",
                "name": "test",
                "surname": "test",
                "phoneNumber": "+354454453343"
            })
            .expect(400)
            .expect({
                "statusCode": 400,
                "message": "Пользователь с таким email уже есть"
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
