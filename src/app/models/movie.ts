export interface Movie {
    id?: number;
    title: string;
    synopsis: string;
    year: number;
    cover: string;
    director?: string;  // Agregado para compatibilidad
    genre?: string;     // Agregado para compatibilidad
    poster?: string;    // Alias para cover para compatibilidad
    created_at?: string;
    updated_at?: string;
}
