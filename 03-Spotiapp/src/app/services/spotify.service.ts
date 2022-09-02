import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private token:string = "BQB_X8OBA0Bi8eKPzX7ySczNNx_bLICx4tKyTYk3fROrphzybq7qOAmzgQ4RKatJ1cVTb1vXIWT8WZp2ct9yyAjEHNxudnNwRDFHEQ0vVkEL1hhh7LQh7EuGwVdLiH-sx9AqNjgib6ZwitnJJI_CR1dK-2i3TEaiVz5I8kJXj2f7mw";

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

  getArtista(termino:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    })
    return this.getQuery('search?q='+termino+'&type=artist&limit=15').pipe(map((data:any) => {
      return data['artists'].items;
    }));
  }
}
