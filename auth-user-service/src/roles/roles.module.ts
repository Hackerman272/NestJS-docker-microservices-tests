import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {User} from "../users/user.model";
import {UserRoles} from "./user-roles.model";
import {Sequelize} from "sequelize";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
      SequelizeModule.forFeature([Role, User, UserRoles])
  ],
    exports: [
        RolesService,
        RolesModule
    ]
})
export class RolesModule {}
