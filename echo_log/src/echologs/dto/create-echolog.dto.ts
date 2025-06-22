import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEchologDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
