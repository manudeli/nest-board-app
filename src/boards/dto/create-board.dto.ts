import { Board } from '../board.model';

export class CreateBoardDTO {
  title: Board['title'];
  description: Board['description'];

  constructor({ title, description }: Pick<Board, 'title' | 'description'>) {
    this.title = title;
    this.description = description;
  }
}
