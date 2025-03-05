export interface ViajeResult {
    id: number;
    ruta_id: number;
    vehiculo_id: number;
    fecha_salida: string;
    fecha_llegada: string;
    precio: string;
    created_at: string;
    updated_at: string;
    total_asientos_disponibles: number;
    total_asientos: number;
    numeros_asientos_utilizados: any[];
    asientos_disponibles: AsientosDisponible[];
    ruta: Ruta;
    vehiculo: Vehiculo;
}

export interface AsientosDisponible {
    boleto_id: number;
    nro_asiento: number;
}

export interface Ruta {
    id: number;
    origen: string;
    destino: string;
    duracion: string;
    clase: string;
    horario: string;
    created_at: string;
    updated_at: string;
}

export interface Vehiculo {
    id: number;
    placa: string;
    capacidad: number;
    modelo: string;
    estado: string;
    created_at: string;
    updated_at: string;
}
