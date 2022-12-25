import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({ username, password }: AuthCredentialsDTO) {
    const salt = await bcrypt.genSalt();
    const user = await this.userRepository.create({
      username,
      password: await bcrypt.hash(password, salt),
    });

    try {
      await this.userRepository.save(user);
      return `sign up success ${user.username}`;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Existing username ${user.username}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn({ username, password }: AuthCredentialsDTO) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException('sign in failed');
  }
}
