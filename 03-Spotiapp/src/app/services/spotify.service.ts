import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId:string = "";
  private clientSecret:string = "";
  private token:string = "BQBtfKiYSftJAySfFMR-K1k-7KzJzQBJIRiCl5XxIgM6EGIfI_X-oaIYQMkpERd6s1TRKoXOel0-DDFlB9TWw7-sHVJRvCT_-_CYXFz97Qi7pzga4Tgs39T4b3e-GyVC8g1GQ57t4l-soNDlcHNY4ZqeVO-i13JfFdvcCwfkoyl4jA";

  constructor(private http:HttpClient) { }

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

  /* generarToken(){
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

  this.authService.login().subscribe(data => {
    this.accessToken = data['access_token'];
    this.tokenType = data['token_type'];
}); */

}
