import { Component, OnInit } from '@angular/core';
import { HeroesService} from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Heroe[] = [];

  constructor(private router:Router,
              private heroesService: HeroesService) {

   }

  ngOnInit(): void {
    this.heroes = this.heroesService.getHeroes();
    console.log(this.heroes)
  }

  verHeroe(idx:number){
    this.router.navigate(['/heroe',idx])
  }
}
