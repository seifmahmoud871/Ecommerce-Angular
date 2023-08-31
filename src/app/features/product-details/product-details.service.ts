import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  
  constructor(private http:HttpClient) { }

  public count = new BehaviorSubject<number>(0);
  public wishCount = new BehaviorSubject<number>(0);
  getProductById(id:number){
    return this.http.get(`https://fakestoreapi.com/products/${id}`)
  }

   

}
