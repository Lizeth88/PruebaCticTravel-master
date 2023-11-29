import {Plan} from "./plan.model";
import {Usuario} from "./usuario.model";

export class Inscripcion{
  constructor(
    public plan: Plan,
    public usuario: Usuario,
    public Estado: string // activa, inactiva
  ) {
  }
}
