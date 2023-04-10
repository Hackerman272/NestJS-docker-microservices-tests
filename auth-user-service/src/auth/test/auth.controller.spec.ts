import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import {AuthController} from "../auth.controller";

describe('AuthController', () => {
    let controller: AuthController;

    const mockAuthService = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService],
            controllers: [AuthController]
        }).overrideProvider(AuthService).useValue(mockAuthService).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
