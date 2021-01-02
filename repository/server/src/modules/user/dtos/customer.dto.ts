import { IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CustomerDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  firstname: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  username: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  password: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  avatar: string;
}

export class CustomerCreateDto extends CustomerDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  firstname: string;
  
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  lastname: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  username: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  password: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  phone: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  email: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  salt: string;
}