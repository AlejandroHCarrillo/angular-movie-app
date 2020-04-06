import { Injectable } from '@angular/core';
import { Jsonp } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apikey:string = "c7e4dadabc5e084a06b15016e8090015";
  private urlMoviedb:string = "https://api.themoviedb.org/3";

  constructor( private jsonp:Jsonp ) { }

  peliculas:any[] = [];
  // pelicula:any = {};

  getCartelera(){
    let desde = new Date();
    let hasta = new Date();
    hasta.setDate(hasta.getDate()+7);

    let strDesde = `${ desde.getFullYear() }-${ this.zerosleft((desde.getMonth() + 1).toString()) }-${ this.zerosleft((desde.getDate()).toString()) }`;
    let strHasta = `${ hasta.getFullYear() }-${ this.zerosleft((hasta.getMonth() + 1).toString()) }-${ this.zerosleft((hasta.getDate()).toString()) }`;

    let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${ strDesde }&primary_release_date.lte=${ strHasta }&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    console.log(url);
    
    return this.jsonp.get( url )
                     .pipe( map( res => res.json().results ) );
  }

  getPopulares(){
    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    return this.jsonp.get( url )
                     .pipe( map( res => res.json().results ) );
  }

  getPopularesKids(){
    let url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    return this.jsonp.get( url )
                     .pipe( map( res => res.json().results ) );
  }

  buscarPelicula( texto:string ){

    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    return this.jsonp.get( url )
                     .pipe( map( res => { 
                      this.peliculas = res.json().results; 
                      return this.peliculas;
                    } ) );
  }

  getPelicula( id:string ){
    let url = `${ this.urlMoviedb }/movie/${id}?api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
    console.log(url);
    return this.jsonp.get( url )
                     .pipe( map( res => {
                      //  console.log(res);
                        
                      // this.pelicula = res.json(); 
                      return res.json();
                    } ) );
  }

  private zerosleft(value:string):string{
    let resp = "00" + value;    
    return resp.substr(resp.length-2);
  }

}
