// src/pages/controller.ts
import { JsonController, Get, Put, Param, Body, Post, HttpCode, NotFoundError  } from 'routing-controllers'

import User from './entity'


@JsonController()
export default class UserController {

  @Get('/users/:id')
    getUser(
      @Param('id') id: number
    ) {
      return User.findOneById(id)
    }

    // @Get('/users/:id')
    // getPage( @Param('id') id: number ) { return User.findOneById(id) }

      @Get('/users/')
        async allUsers() {
        const allusers = await User.find()
        return { allusers }
      }

      @Put('/users/:id')
      async updateUser(
          @Param('id') id: number,
          @Body() update: Partial<User>
      ) {
        const user = await User.findOneById(id)
        if (!user) throw new NotFoundError('Cannot find user')

        return User.merge(user, update).save()
      }

      @Post('/users')
      @HttpCode(201)
      createUser(
        @Body() user: User
      ) {
        return user.save()
      }




}
