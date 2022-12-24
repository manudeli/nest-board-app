import { BoardStatus } from './../board.model';
import { BadRequestException, PipeTransform } from '@nestjs/common';

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
