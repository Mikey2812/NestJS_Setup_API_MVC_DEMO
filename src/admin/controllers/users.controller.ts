import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

const transformError = (error: ValidationError) => {
  const { property, constraints } = error;
  return {
    property,
    constraints,
  };
};

@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('user/index')
  root() {
    return {};
  }

  @Get('create')
  @Render('user/create')
  create() {
    return {};
  }

  @Post()
  @Render('user/create')
  @FormDataRequest()
  async store(@Body() createUserDto: CreateUserDto, @Res() res) {
    const data = {
      mode: 'create',
    };
    // validation
    const object = plainToInstance(CreateUserDto, createUserDto);
    const errors = await validate(object, {
      stopAtFirstError: true,
    });
    if (errors.length > 0) {
      Reflect.set(data, 'error', 'Please correct all fields!');
      const responseError = {};
      errors.map((error) => {
        const rawError = transformError(error);
        Reflect.set(responseError, rawError.property, Object.values(rawError.constraints)[0]);
      });
      Reflect.set(data, 'errors', responseError);
      return { data };
    }
    // set value and show success message
    Reflect.set(data, 'values', object);

    const newUser = this.usersService.create(createUserDto);
    if (newUser) {
      return res.redirect('/admin/users');
    }
    return { data };
  }
}
