import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) body: AuthCredentialsDTO) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) body: AuthCredentialsDTO) {
    return this.authService.signIn(body);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
