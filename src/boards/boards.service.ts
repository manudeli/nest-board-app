import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard(dto: CreateBoardDTO) {
    const board: Board = { id: uuid(), status: BoardStatus.PUBLIC, ...dto };
    this.boards.push(board);

    return board;
  }

  getBoardById(id: Board['id']) {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find Boar with id ${id}`);
    }

    return found;
  }

  deleteBoard(id: Board['id']) {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: Board['id'], status: BoardStatus) {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
