import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { ParseBoardStatusPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {
    this.boardsService = boardsService;
  }

  @Get('/')
  getBoards() {
    return this.boardsService.getBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: CreateBoardDTO) {
    return this.boardsService.createBoard(body);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: Board['id']) {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseUUIDPipe) id: Board['id']) {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseUUIDPipe) id: Board['id'],
    @Body('status', ParseBoardStatusPipe)
    status: Board['status'],
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
