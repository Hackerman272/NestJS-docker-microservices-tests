import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../../../src/auth/auth.module';

describe('e2e', () => {
    let app: INestApplication;
    const new_user_email = `test${Math.floor(Math.random() * 100000)}@test.ru`

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    storage: ':memory:',
                    autoLoadModels: true,
                    logging: false,
                }),
                AuthModule
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Пытаемся регистрировать пользователя до инициализации сервера - ошибка 418', async () => {
        return request(app.getHttpServer())
            .post('/auth/registration')
            .send({email: new_user_email, password: '123123'})
            .expect(418)
            .expect({
                "statusCode": 418,
                "message": "Роль 'USER' не найдена, необходимо выполнение инициализации ресурса"
            });
    });

    it('Инициализируем ресурс /api/init. Создаем админа со слабым паролем - ошибка', () => {
        return request(app.getHttpServer())
            .post('/auth/registration')
            .send({email: new_user_email, password: 'admin' })
            .expect(400)
            .expect(['password - Пароль должен иметь минимальную длину 6 символов, иметь минимум 1 строчную букву, 1 заглавную, 1 цифру и 1 спецсимвол']);
    });

    it('Инициализируем ресурс /api/init. Создаем админа с сильным паролем - успех', () => {
        return request(app.getHttpServer())
            .post('/auth/registration')
            .send({email: 'admin@mail.ru', password: '123123123' })
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});
