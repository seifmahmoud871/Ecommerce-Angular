import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from './home-service.service';

// import AOS from 'aos'
// import 'aos/dist/aos.css';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productArr: any;
  categories: any = [];
  wishList: any[] = [];
  categ:any[]=[];
  loading:boolean=false; 
  key :  string="";
  

  constructor(private http: HomeServiceService , private toastr:ToastrService) {

  }
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    AOS.init();
    this.http.search.subscribe((res:any)=>{
      this.key=res;
    })
    // AOS.init();
  }
  getCategories() {
    this.loading=true;
    this.http.getCategories().subscribe((res: any) => {
      // console.log(res);
      this.categories = res;
      this.categ = res;
      this.loading=false;
      console.log(this.categories);
      for (let i = 0; i < this.categories.length; i++) {
        this.categories[i] = '../../../assets/images/' + this.categories[i] + '.png';
      }
      console.log(this.categories);


    })
  }
  getSpecificCategory(name: String) {
    name=name.replace("../../../assets/images/",'');
    name=name.replace(".png",'');
    console.log(name);
    this.loading=true;
    
    this.http.getSpecificCategory(name).subscribe((res: any) => {
      this.loading=false;
      console.log(res);
      this.productArr = res;
    })
  }

  getProducts() {
    this.loading=true;
    this.http.getProducts().subscribe(res => {
      console.log(res);
      this.productArr = res;
      this.loading=false;
      localStorage.setItem('products',JSON.stringify(this.productArr));
      //  for(let i=0;i<this.deletedArr.length;i++){
      //       this.productArr[this.deletedArr[i]].isDeleted=1;
      //  }

    })

  }

  status: boolean = false;
  selectedProductIndex: number = -1;

  isSelectedProduct(index: number): boolean {
    return index === this.selectedProductIndex;
  }
  showToastr(){
    if(this.status){
      this.toastr.success('Item Added To Wish List')
    }
    else{
      this.toastr.warning('Removed Item From Wish List')
    }
  }
  clickEvent(product: any, index: number) {
    this.status = !this.status;
    
    
    console.log({index});
    console.log('dssda');
    if (this.selectedProductIndex === index) {
      this.selectedProductIndex = -1;
    } else {
      this.selectedProductIndex = index;
    }
    
    this.wishList = JSON.parse(localStorage.getItem('wish')!) || [];
 

    if (this.wishList.length == 0) {
      this.wishList.push(product);
      console.log(this.wishList);
      
      localStorage.setItem("wish", JSON.stringify(this.wishList));
      return;
    }
    let check = false;
    this.wishList.forEach((item, index) => {
      if (item.id == product.id) {
        this.wishList.splice(index, 1);
        check = true
        localStorage.setItem("wish", JSON.stringify(this.wishList));
      }
      
    })
    if (!check) {
      this.wishList.push(product);
      localStorage.setItem("wish", JSON.stringify(this.wishList));
    }

    console.log(this.wishList);




  }


}
