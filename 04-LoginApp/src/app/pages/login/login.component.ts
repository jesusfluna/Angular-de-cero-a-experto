import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { usuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:usuarioModel;
  recordarme:boolean = false;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.usuario = new usuarioModel();

    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form:NgForm){
    Swal.fire({
      allowOutsideClick: false,
      text:"spere por favor...",
      icon:"info"
    });

    Swal.showLoading();

    if(form.invalid){
      return;
    }

    
    this.auth.login(this.usuario).subscribe(
      data =>{ 
        Swal.close()
        if (this.recordarme){
          localStorage.setItem('email',this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      },
      err => { 
          Swal.fire({
            allowOutsideClick: true,
            text: err.error.error.message,
            icon:"error",
            title:"Error al autenticar"
          });
      })
  }
}
