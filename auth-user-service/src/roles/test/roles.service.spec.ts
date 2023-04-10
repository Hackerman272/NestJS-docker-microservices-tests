import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../roles.service';
import {Role} from "../roles.model";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('rolesService', () => {
    let rolesService: RolesService;
    const mockRoleRepository = {
        createRole: jest.fn().mockImplementation(dto => Promise.resolve( {
            id: Math.floor(Math.random() * 100),
            ...dto
        })),
        getRoleByValue: jest.fn().mockImplementation((value: string) =>  {
            if (value === "NOROLE") {
                Promise.resolve({});
            } else if (value === "TEST") {
                Promise.resolve({
                    "id": Math.floor(Math.random() * 100),
                    "value": "TEST",
                    "description": "test",
                    "createdAt": "2023-04-07T13:43:46.697Z",
                    "updatedAt": "2023-04-07T13:43:46.697Z"
                })
            }
        })
    }

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [RolesService, {
                provide: getRepositoryToken(Role),
                useValue: mockRoleRepository
            }],
        }).compile();

        rolesService = module.get<RolesService>(RolesService);
    });

    it('should be defined', () => {
        expect(rolesService).toBeDefined();
    });

    it('should create new role', async () => {
        expect(await rolesService.createRole({
            "value": "TEST",
            "description": "тестовая роль"
        })).toEqual({
            id: expect.any(Number),
            value: "TEST",
            description: "тестовая роль"
        });
    })

});

