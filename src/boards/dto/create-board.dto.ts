import { IsNotEmpty } from 'class-validator';
import { Board } from '../board.model';

export class CreateBoardDTO {
  @IsNotEmpty()
  title: Board['title'];

  @IsNotEmpty()
  description: Board['description'];
}
