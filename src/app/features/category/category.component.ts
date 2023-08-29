import { Component } from '@angular/core';
import { CategoryserviceService } from './categoryservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent  {


  constructor(private categories:CategoryserviceService){

  }

  ngOnInit(): void {
    
  }

  getSpecificCategory(name:String){
      this.categories.getSpecificCategory(name).subscribe((res:any)=>{
        console.log(res);
        
      })
  }

}


