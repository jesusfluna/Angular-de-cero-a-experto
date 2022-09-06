import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:usuarioModel;


  constructor(private auth:AuthService) { }

  ngOnInit() { 
    this.usuario = new usuarioModel();
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }
    
    this.auth.nuevoUsuario(this.usuario).subscribe(
      data =>{ console.log(data)},
      err =>{ console.log(err.error.error.message) });

  }
}
