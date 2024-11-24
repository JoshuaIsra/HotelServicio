export interface Habitaciones{
    id: number;
    precio_noche: number;
    estado: boolean;
    capacidad_personas: number;
    servicios: servicios;
    numero_camas: number;
    tipo_cama: string;
    tipo_habitacion: string;
    
}

export interface servicios {
    wifi: boolean;
    tv: boolean;
    calefaccion: boolean;
    aire_acondicionado: boolean;
}