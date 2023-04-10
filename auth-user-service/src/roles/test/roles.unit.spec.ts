import {UsersService} from "../../users/users.service";
import {ClientProxy} from "@nestjs/microservices";
import {RolesService} from "../roles.service";
import {Role} from "../roles.model";
import {RolesController} from "../roles.controller";

describe('RolesController', () => {
    let rolesController: RolesController;
    let rolesService: RolesService;

    beforeEach(() => {
        rolesService = new RolesService(Role);
        rolesController = new RolesController(rolesService);
    });

    const isValidOrg = function(res) {
        res.body.should.have.property("id", "value", "description");
    };

    describe('create', () => {
        it('new role', async () => {
            jest.spyOn(rolesService, 'createRole');
            expect(await rolesController.create(
                {
                    value: "TEST",
                    description: "тестовая роль"
                }
            )).toBe(isValidOrg);
        });

        // it('duplicate role', async () => {
        //     jest.spyOn(rolesService, 'createRole').mockImplementation();
        //     expect(await rolesController.create(
        //         {
        //             value: "TEST",
        //             description: "тестовая роль"
        //         }
        //     )).to;
        // });
    });
});
