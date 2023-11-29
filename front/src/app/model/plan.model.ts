import {Sitio} from "./sitio.model";
import {Destino} from "./destino.model";

export class Plan {
  constructor(
      public id: number,
      public destino: Destino,
      public sitio: Sitio,
      public precioPaquete: number,
      public duracionDias: number,
      public duracionNoches: number,
      public tipoTransporte: string,
      public cantidadPaquetes: number
  ) {}
}
