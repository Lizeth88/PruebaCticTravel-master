import {Sitio} from "./sitio.model";
import {Destino} from "./destino.model";

export class Plan {
  constructor(
    public destinosTuristicos: Destino[],
    public hospedajes: Sitio[],
    public precio: number,
    public duracionDiasNoches: {
      dias: number,
      noches: number
    },
    public tipoTransporte: string, // aéreo, terrestre
    public cantidadPaquetesHabilitados: number
  ) {}
}
