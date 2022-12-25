import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { ParseBoardStatusPipe } from './pipes/board-status-validation.pipe';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {
    this.boardsService = boardsService;
  }

  @Get('/')
  getAllBoards(
    @Query('isOnlyMine', ParseBoolPipe) isOnlyMine: boolean,
    @GetUser() user: User,
  ) {
    return this.boardsService.getAllBoards(isOnlyMine, user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: CreateBoardDTO, @GetUser() user: User) {
    return this.boardsService.createBoard(body, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: Board['id']) {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseUUIDPipe) id: Board['id'],
    @GetUser() user: User,
  ) {
    return this.boardsService.deleteBoard(id, user);
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
