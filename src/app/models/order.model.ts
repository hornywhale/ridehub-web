import { Moto } from "./moto.model";

export interface Order {
    id: number;
    user: string;
    motos: {
      moto: Moto;
      quantity: number;
    }[];
    timestamp: string;
    status: 'ongoing' | 'completed' | 'canceled';
  }