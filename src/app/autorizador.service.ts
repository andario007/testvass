import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutorizadorService {

  constructor( private http: HttpClient) { }


  getUsuarios() {

      var url_1 = `https://jsonplaceholder.typicode.com/users`;
      let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      return this.http.get(url_1);
  }

  deleteUsuarios(userId) {

    var url_1 = `https://jsonplaceholder.typicode.com/users/${userId}`;
    let header = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.http.delete(url_1);
}  

  postUsuarios(datos){
    var url_1 = `https://jsonplaceholder.typicode.com/users/`;
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      return this.http.post(url_1,datos);
    
  }

  putUsuarios(datos){
    var url_1 = `https://jsonplaceholder.typicode.com/users/`;
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      return this.http.put(url_1,datos);
    
  }  
}
