import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.models';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url:string = "https://loginapp-4059a-default-rtdb.europe-west1.firebasedatabase.app";

  constructor(private http:HttpClient) { }

  crearHeroe(heroe:HeroeModel){
    return this.http.post(this.url+"/heroes.json", heroe).pipe(
      map((res:any) => {
        heroe.id = res.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe:HeroeModel){
  const heroeTemp = { //copia las propiedades y valores del objeto heroe en heroeTemp (copia el objeto en otro)
    ...heroe
  } 

  delete heroeTemp.id; //borra una propiedad

    return this.http.put(this.url+"/heroes/"+heroe.id+".json", heroeTemp);
  }

  getHeroes(){
    return this.http.get(this.url+"/heroes.json").pipe(map(resp => this.crearArray(resp)),delay(1500));
  }

  private crearArray(heroeObj:any){
    const heroes:HeroeModel[] = [];

    if (heroeObj === null) { return [] }

    Object.keys(heroeObj).forEach(key =>{
      const heroe: HeroeModel = heroeObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })

    return heroes;
  }

  getHeroe(id:string){
    return this.http.get(this.url+"/heroes/"+id+".json");
  }

  borrarHeroe(id:string) {
    return this.http.delete(this.url+"/heroes/"+id+".json");
  }
}
