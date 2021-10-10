import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsOptional, IsString} from 'class-validator';
import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'users'})
export class User {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @PrimaryColumn()
  id!: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  credits!: number;

  @ApiProperty()
  @IsOptional()
  @CreateDateColumn({type: 'timestamp without time zone'})
  createdAt!: Date;

  @ApiProperty()
  @IsOptional()
  @UpdateDateColumn({type: 'timestamp without time zone'})
  updatedAt!: Date;
}
