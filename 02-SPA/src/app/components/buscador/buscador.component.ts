import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  heroes:Heroe[] = [];
  termino:string;

  constructor(private router:Router,
              private aRoute:ActivatedRoute,
              private heroesService:HeroesService) { 
              }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params =>{ 
      this.termino = params['termino'];
      this.heroes = this.heroesService.buscarHeroes(this.termino);

    })
  }

  verHeroe(idx:number){
    this.router.navigate(['/heroe',idx])
  }
  

}
