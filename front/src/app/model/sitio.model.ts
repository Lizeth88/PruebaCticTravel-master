export class Sitio{
  constructor(
    public nombreHospedaje: string,
    public tipoHospedaje: string, // hotel, hospedaje, residencia, apto privado, habitación en casa compartida
    public horarioCheckIn: string,
    public horarioCheckOut: string,
    public lugarUbicacion: string,
    public cantidadHabitaciones?: number,
    public id?: number
    ) {}
}
