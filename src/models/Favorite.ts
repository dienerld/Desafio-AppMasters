import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Favorite')
export default class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  token: string;

  @Column()
  gameName: string;

  @Column()
  appId: string;

  @Column()
  rating: number;
}
