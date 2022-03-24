import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = `KpZgNT0Pyr16FBpFNOUphIRO3vGUuZup`;
  private servicioURL: string = `https://api.giphy.com/v1/gifs`;
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem(`historial`)! ) || [];
    this.resultados = JSON.parse(localStorage.getItem(`resultdos`)! ) || [];
    // if (localStorage.getItem(`historial`)) {
    //   this._historial = JSON.parse( localStorage.getItem(`historial`)! );
    // }
  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs( query: string = `` ){

    query = query.trim().toLocaleLowerCase();
    if ( !this._historial.includes( query )) {
      this._historial.unshift( query );
      // this._historial = this.shuffle(this._historial);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem(`historial`, JSON.stringify( this._historial ) );
    }

    const params = new HttpParams()
      .set(`api_key`, this.apiKey)
      .set(`limit`, `10`)
      .set(`q`, query);

    this.http.get<SearchGifsResponse>(`${ this.servicioURL }/search?`, { params })
    .subscribe( ( resp ) => {
      this.resultados = resp.data;
      localStorage.setItem(`resultados`, JSON.stringify(this.resultados));
    });
  }

  // shuffle(array: any) {
  //   let currentIndex = array.length,  randomIndex;

  //   // While there remain elements to shuffle...
  //   while (currentIndex != 0) {

  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex], array[currentIndex]];
  //   }

  //   return array;
  // }

}
