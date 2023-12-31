import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { Product } from "./productsEntities";

@Entity()
export class Client extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    tel: string

    // @OneToOne(() => Profile)
    // @JoinColumn()
    // profile: Profile;

    @OneToMany(() => Product, product => product.client)
    products: Product[];
  

} 