export interface Factura {
    idFactura : number;
    reserva_id: number;
    fechaEmision:Date;
    montoTotal : number;
    metodoPago: string;
    estadoPago: string;
}