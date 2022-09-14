import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: "John",
    apellido: "Doe",
    correo: "john@doe.com",
    pais: ""
  }

  paises:any[] = [];

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
    
    this.paises = this.paisService.getPaises();

    //Api actualmente fuera de servicio
    /*this.paisService.getPaises().subscribe(paises =>{
      console.log(paises)
      this.paises = paises;
    });*/

    this.paises.unshift({ nombre: '[Seleccione pais]', codigo: ''})
  }

  guardar(forma:NgForm){
    if(forma.invalid){
      Object.values(forma.controls).forEach(control =>{
        control.markAsTouched();
      });

      return;
    }

    console.log(forma.value)
  }
}
