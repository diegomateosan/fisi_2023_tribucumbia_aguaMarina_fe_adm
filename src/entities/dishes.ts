export interface DishesDefault {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  id_categoria: number;
  id_oferta: number;
}

export interface DishesState {
  state: DishesDefault;
}
