import { IsDefined, IsMongoId } from 'class-validator';

export class ReadMessageDto {
  @IsDefined()
  @IsMongoId()
  _id: string;
}
