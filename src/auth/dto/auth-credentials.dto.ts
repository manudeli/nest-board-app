import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { User } from '../user.entity';

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: User['username'];

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password must be combination of english, number',
  })
  password: User['password'];
}
