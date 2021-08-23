import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  token: string;

  @Column()
  appId: string;

  @Column()
  rating: number;
}
