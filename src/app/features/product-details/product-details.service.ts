import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http:HttpClient) { }

  getProductById(id:number){
    return this.http.get(`https://fakestoreapi.com/products/${id}`)
  }

   

}
