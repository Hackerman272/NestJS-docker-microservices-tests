import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {RolesModule} from "../src/roles/roles.module";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Role} from "../src/roles/roles.model";

describe('RolesController (e2e)', () => {
    let app: INestApplication;

    const mockRolesRepository = {

    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [RolesModule],
        }).overrideProvider(getRepositoryToken(Role)).useValue(mockRolesRepository).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/roles (GET)', () => {
        return request(app.getHttpServer())
            .get('/roles/TEST')
            .expect(200)
    });
});
