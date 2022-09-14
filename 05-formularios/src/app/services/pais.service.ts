import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http:HttpClient) { }

  getPaises(){


    //Api fuera de servicio actualmente
    /*return this.http.get<any[]>("https://restcountries.eu/rest/v2/lang/es")
    .pipe(
      map( (resp:any[]) =>{
      return resp.map(pais =>{
        return {
          nombre: pais.name, 
          codigo: pais.alpha3code
        }
      })
    })
    );*/

    return [{nombre: "España", codigo: 1},{nombre: "Argentina", codigo: 2},{nombre: "Chile", codigo: 3},{nombre: "Mexico", codigo: 4},{nombre: "Colombia", codigo: 5},]
  }
}
