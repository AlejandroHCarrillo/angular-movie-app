import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  cartelera: any[];
  kids: any[];
  populares: any[];
  
  constructor(public _ps: PeliculasService) {
    // console.log('constructor peliculas');
    
    this._ps.getCartelera()
            .subscribe( data => { 
              this.cartelera = data;
             });

    this._ps.getPopularesKids()
             .subscribe( data => { 
               this.kids = data;
              });
 
    this._ps.getPopulares()
             .subscribe( data => { 
               this.populares = data;
              });
 
   }

  ngOnInit() {
  }

}
