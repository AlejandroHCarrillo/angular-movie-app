import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {
  pelicula: any;
  regresarA:string;
  busqueda:string = "";

  constructor(public _ps:PeliculasService, 
    public route:ActivatedRoute) {
      this.route.params.subscribe( params => {
        this.regresarA = params['pag'];
        if(params['busqueda']){
          this.busqueda = params['busqueda'];
        }

        this.getPelicula(params['id']);
      })
   }

  ngOnInit() {
  }

  getPelicula(id:string){    
    this._ps.getPelicula(id)
            .subscribe( res => {
              this.pelicula = res;
            });

  }

}
