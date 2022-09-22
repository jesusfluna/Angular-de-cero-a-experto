import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.models';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService:HeroesService) {

   }

  ngOnInit(): void {
    this.cargando = true;

    this.heroesService.getHeroes().subscribe(resp => {
      console.log(resp);
      this.heroes = resp;
      this.cargando = false;
    });
  }

  borrarHeroe(heroe:HeroeModel, pos:number){
    Swal.fire({
      title: "Borrar "+heroe.nombre,
      text: "Está seguro que desea borrar a "+heroe.nombre+" permanentemente",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{

      if(resp.value){
        if(heroe !== null && heroe.id !== undefined){
          this.heroes.splice(pos,1)
          this.heroesService.borrarHeroe(heroe.id).subscribe();
        }
      }

    });

  }
}
