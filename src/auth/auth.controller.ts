import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) body: AuthCredentialsDTO) {
    await this.authService.signUp(body);
  }
}
