import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  loading:boolean;
  artista:any = {};
  topTracks:any[] = [];

  constructor(private actRouter:ActivatedRoute, private spotifyService:SpotifyService) { 
    this.loading = true;
    
    this.actRouter.params.subscribe(params =>{
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    })
  }

  ngOnInit(): void {
  }

  getArtista(id:string){
    this.loading= true;
    
    this.spotifyService.getArtista(id).subscribe(artista =>{
      this.artista = artista;
      this.loading = false;
    })
  }

  getTopTracks(id:string){
    this.spotifyService.getTopTracks(id).subscribe(topTracks =>{
      console.log({topTracks})
      this.topTracks = topTracks;
    })
  }
}
