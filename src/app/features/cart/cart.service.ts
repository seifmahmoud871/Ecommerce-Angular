import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http : HttpClient) {}

  deleteProduct(id:number){
    return this.http.delete(`https://fakestoreapi.com/products/${id}`);
  }
  public search = new BehaviorSubject<string>("");


  updateProduct(id:number){
    return this.http.put(`https://fakestoreapi.com/products/${id}`,JSON.stringify(
      {
          title: 'test product',
          price: 13.5,
          description: 'lorem ipsum set',
          image: 'https://i.pravatar.cc',
          category: 'electronic'
      }
  ));
  }


 

}
