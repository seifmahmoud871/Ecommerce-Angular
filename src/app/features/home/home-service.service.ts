import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {


  constructor(private http:HttpClient) { }
  public search = new BehaviorSubject<string>("");
  
  getCategories(){
    return this.http.get('https://fakestoreapi.com/products/categories');
  }

  getSpecificCategory(name:String){
    return this.http.get(`https://fakestoreapi.com/products/category/${name}`);
  }

  getProducts(){
    return this.http.get('https://fakestoreapi.com/products');
  }
  
 
}
