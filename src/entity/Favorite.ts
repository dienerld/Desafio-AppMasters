import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Favorite {
  @PrimaryGeneratedColumn()
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
