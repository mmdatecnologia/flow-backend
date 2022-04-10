import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

import { User } from './user.interface'

@Entity('users')
export class UserEntity implements User {
  @ApiProperty()
  @ObjectIdColumn()
  id: string

  @ApiProperty()
  @Column()
  @Index()
  email: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
