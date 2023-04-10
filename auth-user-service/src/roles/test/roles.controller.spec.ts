import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../roles.service';
import { RolesController } from '../roles.controller';
import {RolesModule} from "../roles.module";

describe('RolesController', () => {
    let controller: RolesController;

    const mockRolesService = {
        createRole: jest.fn((dto) => {
            return {
                id: Math.floor(Math.random() * 100),
                ...dto
            }
        }),
        getRoleByValue: jest.fn((value: string) => {
            if (value === "NOROLE") {
                return {};
            } else if (value === "TEST") {
                return {
                    "id": Math.floor(Math.random() * 100),
                    "value": "TEST",
                    "description": "test",
                    "createdAt": "2023-04-07T13:43:46.697Z",
                    "updatedAt": "2023-04-07T13:43:46.697Z"
                }
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RolesService],
            controllers: [RolesController]
        }).overrideProvider(RolesService).useValue(mockRolesService).compile();

        controller = module.get<RolesController>(RolesController);
    });

    it('RolesController - should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('roles', () => {
        it('no role', async () => {
            const getRole = controller.getByValue("NOROLE");
            await expect(getRole).toEqual({});
        });

        it('create role', () => {
            expect(controller.create({
                "value": "TEST",
                "description": "тестовая роль"
            })).toEqual({
                id: expect.any(Number),
                value: "TEST",
                description: "тестовая роль"
            });
        });

        it('existing role', async () => {
            const getRole = controller.getByValue("TEST");
            await expect(getRole).toEqual({
                id: expect.any(Number),
                value: "TEST",
                description: "test",
                createdAt: "2023-04-07T13:43:46.697Z",
                updatedAt: "2023-04-07T13:43:46.697Z"
            });
        });

        // it('pokemon ID greater than 151 should throw error', async () => {
        //     const getPokemon = pokemonService.getPokemon(152);
        //
        //     await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
        // });
        //
        // it('valid pokemon ID to return the pokemon name', async () => {
        //     const getPokemon = pokemonService.getPokemon(1);
        //
        //     await expect(getPokemon).resolves.toBe('bulbasaur');
        // });
    });


});
