import { IsDefined, IsEnum, IsString, MinLength } from 'class-validator';
import { Permition } from 'src/common/enum/common.enum';

export class CreateAdminBodyDto {
  @IsDefined()
  @IsString()
  @MinLength(5)
  username: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;

  @IsDefined()
  @IsEnum(Permition)
  permission: Permition;
}
