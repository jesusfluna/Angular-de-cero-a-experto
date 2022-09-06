import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.usuario = new usuarioModel();
  }

  login(form:NgForm){

    if(form.invalid){
      return;
    }

    sw
    this.auth.login(this.usuario).subscribe(
      data =>{ console.log(data)},
      err => { console.log(err.error.error.message) })
  }
}
