import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("UnpaidOrders")
export class UnpaidOrdersEntity {

    @PrimaryColumn()
    public Pedido: string;

    @Column()
    public Status: string;

    @Column()
    public Tienda: string;

    @Column()
    public Vitrina: string;

    @Column()
    public Cliente: string;

    @Column()
    public FechaCreacion: string;
}