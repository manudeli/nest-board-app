import { BoardStatus } from '../board-status.enum';
import {
  BadRequestException,
  ParseEnumPipe,
  PipeTransform,
} from '@nestjs/common';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status`);
    }

    return value;
  }

  private isStatusValid(status) {
    return this.StatusOptions.indexOf(status) !== -1;
  }
}

export const ParseBoardStatusPipe = new ParseEnumPipe(BoardStatus);
