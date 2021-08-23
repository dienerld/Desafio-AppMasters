import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  appId: number;

  @Column()
  rating: number;
}
