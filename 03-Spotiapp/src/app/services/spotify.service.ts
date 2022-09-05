import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId:string =
  private clientSecret:string =
  public token:string = "";

  constructor(private http:HttpClient) { }

  login(){
    this.generarToken().subscribe((data:any)=>{
      this.token = data['access_token'];
      console.log(this.token);
    })
  }

  getQuery(query:string){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    })

    return this.http.get(url, {headers});
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases').pipe(map((data:any) => data['albums'].items ));
  }

  getArtistas(termino:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    })
    return this.getQuery('search?q='+termino+'&type=artist&limit=15').pipe(map((data:any) => {
      return data['artists'].items;
    }));
  }

  getArtista(id:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    })
    
    return this.getQuery("artists/"+id).pipe(map((data:any) => {
      return data;
    }));
  }

  getTopTracks(id:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    })
    
    return this.getQuery("artists/"+id+"/top-tracks?country=es").pipe(map((data:any) => {
      return data['tracks'];
    }));
  }

  generarToken(){
    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = 'grant_type=client_credentials';
    return this.http.post(authorizationTokenUrl, body, {
        headers: new HttpHeaders({
            Authorization:
                'Basic  ' + btoa(this.clientId + ':' + this.clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded;',
        }),
    });
  }
}
