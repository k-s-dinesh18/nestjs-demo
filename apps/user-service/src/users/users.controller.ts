import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { Users } from './schema/users.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Query as ExpressQuery } from 'express-serve-static-core';
@Controller('users')
export class UsersController {
    constructor(private service: UsersService){}

    @Get()
    async getAllUsers(@Query() query: ExpressQuery): Promise<Users[]>
    {
        return await this.service.findAllUsers(query);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<Users>
    {   
        return await this.service.findUserById(id);
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<Users>
    {
        return this.service.create(user);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<Users>
    {
        return await this.service.update(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string)
    {
        return this.service.delete(id);
    }
}
