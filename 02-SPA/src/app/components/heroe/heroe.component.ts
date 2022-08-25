import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe:Heroe;

  constructor(private aRoute:ActivatedRoute,
              private heroesService:HeroesService) { 
    this.aRoute.params.subscribe(params => {
      this.heroe = this.heroesService.getHeroe(params['id']);
    })
    
  }

  ngOnInit(): void {
  }

}
