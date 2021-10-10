import {ApiProperty} from '@nestjs/swagger';
import {IsOptional, IsString} from 'class-validator';
import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'cats'})
export class Cat {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @PrimaryColumn()
  id!: string;

  @ApiProperty()
  @IsString()
  @Column()
  userId!: string;

  @ApiProperty()
  @IsOptional()
  @CreateDateColumn({type: 'timestamp without time zone'})
  createdAt!: Date;

  @ApiProperty()
  @IsOptional()
  @UpdateDateColumn({type: 'timestamp without time zone'})
  updatedAt!: Date;
}
