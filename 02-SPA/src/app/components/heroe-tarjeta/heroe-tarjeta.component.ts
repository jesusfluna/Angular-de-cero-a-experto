import { Component, OnInit, Input, /*Output, EventEmitter*/ } from '@angular/core';
import { Heroe } from "../../interfaces/heroe.interface";
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent implements OnInit {
  @Input() heroe:Heroe;
  @Input() indice:number;

  //@Output() heroeSeleccionado: EventEmitter<number>;
  constructor(private router:Router) { 
    //this.heroeSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  verHeroe(){
    this.router.navigate(['/heroe',this.indice])//sin usar funcion padre con el output y el eventemmiter
    //this.heroeSeleccionado.emit(this.indice);
    
  }
}
