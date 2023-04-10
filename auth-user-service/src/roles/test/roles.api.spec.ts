import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {forwardRef, INestApplication} from '@nestjs/common';
import {RolesModule} from "../roles.module";
import {RolesService} from "../roles.service";
import {RolesController} from "../roles.controller";


describe('Roles', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [RolesService],
            controllers: [RolesController]
        })
            .overrideProvider(RolesService)
            .useValue(RolesService)
            .compile();

        app = await moduleRef.createNestApplication();
        await app.init();
        await app.listen(9000);
        await console.log(await app.getUrl())
    });

    it(`/POST roles valid`, () => {
        const isValidOrg = function(res) {
            res.body.should.have.property("id", "value", "description");
        };
        return request(app.getHttpServer())
            .post("roles")
            .send({
                "value": "TEST",
                "description": "тестовая роль"
            })
            .expect(201)
            .expect(isValidOrg);
    });


    it(`/POST roles invalid`, () => {
        return request(app.getHttpServer())
            .post('roles')
            .send({
                "value": "TEST",
                "description": "тестовая роль"
            })
            .expect(500);
    });

    afterAll(async () => {
        await app.close();
    });
});
