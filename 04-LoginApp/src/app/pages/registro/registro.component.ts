import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { usuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:usuarioModel;
  recordarme:boolean = false;


  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() { 
    this.usuario = new usuarioModel();
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text:"Espere por favor...",
      icon:"info"
    });

    Swal.showLoading();
    
    this.auth.nuevoUsuario(this.usuario).subscribe(
      data =>{ 
        console.log(data)
        Swal.close();

        if (this.recordarme){
          localStorage.setItem('email',this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      },
      err =>{ 
        Swal.fire({
          allowOutsideClick: true,
          text: err.error.error.message,
          icon:"error",
          title:"Error al registrar"
        });
      });

  }
}
