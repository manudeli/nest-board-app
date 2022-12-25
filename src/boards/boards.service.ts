import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(isOnlyMine: boolean, user: User) {
    return this.boardRepository.find(
      isOnlyMine ? { where: { user: { id: user.id } } } : undefined,
    );
  }

  async createBoard(dto: CreateBoardDTO, user: User) {
    const board = this.boardRepository.create({
      status: BoardStatus.PUBLIC,
      ...dto,
      user,
    });

    await this.boardRepository.save(board);

    return board;
  }

  async getBoardById(id: Board['id']) {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: Board['id'], user: User) {
    const { affected } = await this.boardRepository.delete({ id, user });

    if (affected === 0) {
      throw new NotFoundException(`Can't delete Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: Board['id'], status: Board['status']) {
    const found = await this.getBoardById(id);

    found.status = status;
    await this.boardRepository.save(found);

    return found;
  }
}
