export interface Persona {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
    created_at: string;
    updated_at: string;
}

export interface Cliente {
    id: number;
    persona_id: number;
    estado: number;
    created_at: string;
    updated_at: string;
    persona: Persona;
}