import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = "AIzaSyARwPLWE9y9Hs0KUmSkyQEzNHTMEuaPofU";
  userToken:string;

  constructor(private http:HttpClient) { 
    this.leerToken();
  }

  logout(){}
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
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = "";
    }
    return this.userToken;
  }
}
