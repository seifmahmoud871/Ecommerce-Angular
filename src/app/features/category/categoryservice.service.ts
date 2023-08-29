import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get('https://fakestoreapi.com/products/categories');
  }

  getSpecificCategory(name:String){
    return this.http.get(`https://fakestoreapi.com/products/categories/${name}`);
  }

}
