import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userHash: string;

  @Column()
  appId: number;

  @Column()
  rating: number;
}
