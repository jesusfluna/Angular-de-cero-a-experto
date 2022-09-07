import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = ""; //TODO aqui habria que indicar la apiKey de nuestra aplicacion de fireBase
  userToken:string;

  constructor(private http:HttpClient) { 
    this.leerToken();
  }

  logout(){
    localStorage.removeItem("token");
  }

  login(usuario:usuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true 
    }

    return this.http.post( this.url+"signInWithPassword?key="+this.apiKey,authData).pipe(
      map(resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      }));
  }
  nuevoUsuario(usuario:usuarioModel){

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true 
    }

    return this.http.post( this.url+"signUp?key="+this.apiKey,authData).pipe(
      map(resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      }));
  }

  private guardarToken(id:string){
    this.userToken = id;
    localStorage.setItem("token",id);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = "";
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    if(this.userToken.length<2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const hoy = new Date();
    hoy.setTime(expira);
    
    if(hoy > new Date())
      return true;
    else
      return false;
  }
}
