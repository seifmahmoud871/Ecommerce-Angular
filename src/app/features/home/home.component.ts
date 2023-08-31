import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from './home-service.service';

// import AOS from 'aos'
// import 'aos/dist/aos.css';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailsService } from '../product-details/product-details.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productArr: any[]=[];
  categories: any = [];
  wishList: any[] = [];
  categ: any[] = [];
  loading: boolean = false;
  key: string = "";
  wishIds: any[] = [];

  constructor(private http: HomeServiceService, private toastr: ToastrService, private productDetailsService: ProductDetailsService) {

  }
  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.getCategories();
    this.getProducts();
    AOS.init();
    this.http.search.subscribe((res: any) => {
      this.key = res;
    })
    // AOS.init();
  }
  getCategories() {
    this.loading = true;
    this.http.getCategories().subscribe((res: any) => {
      // console.log(res);
      this.categories = res;
      this.categ = res;
      this.loading = false;
      console.log(this.categories);
      for (let i = 0; i < this.categories.length; i++) {
        this.categories[i] = '../../../assets/images/' + this.categories[i] + '.png';
      }
      console.log(this.categories);


    })
  }
  getSpecificCategory(name: String) {
    name = name.replace("../../../assets/images/", '');
    name = name.replace(".png", '');
    console.log(name);
    this.loading = true;

    this.http.getSpecificCategory(name).subscribe((res: any) => {
      this.loading = false;
      console.log(res);
      this.productArr = res;
    })
  }

  getProducts() {
    this.loading = true;
    this.wishList = JSON.parse(localStorage.getItem('wish')!) || [];
    this.http.getProducts().subscribe((res:any) => {
      console.log(res);
      this.productArr = res;
      this.loading = false;
      //  for(let i=0;i<this.deletedArr.length;i++){
      //       this.productArr[this.deletedArr[i]].isDeleted=1;
      //  }
      for(let i=0;i<this.wishList.length;i++){
        for(let j=0;j<this.productArr.length;j++){
            if(this.wishList[i].id==this.productArr[j].id){
              this.productArr[j].wishList=1;
            }
        }
      }
      localStorage.setItem('products', JSON.stringify(this.productArr));

    })
    

  }

  status: boolean = false;
  selectedProductIndex: number = -1;

  isSelectedProduct(index: number): boolean {
    return index === this.selectedProductIndex;
  }
  // showToastr() {
  //   if (this.status) {
  //     this.toastr.success('Item Added To Wish List')
  //   }
  //   else {
  //     this.toastr.warning('Removed Item From Wish List')
  //   }
  // }

  // clickEvent(product: any, index: number) {
  //   this.status = !this.status;


  //   console.log({index});
  //   console.log('dssda');
  //   if (this.selectedProductIndex === index) {
  //     this.selectedProductIndex = -1;
  //   } else {
  //     this.selectedProductIndex = index;
  //   }

  //   this.wishList = JSON.parse(localStorage.getItem('wish')!) || [];


  //   if (this.wishList.length == 0) {
  //     this.wishList.push(product);
  //     console.log(this.wishList);

  //     localStorage.setItem("wish", JSON.stringify(this.wishList));
  //     this.productDetailsService.wishCount.next(this.wishList.length);
  //     return;
  //   }
  //   let check = false;
  //   this.wishList.forEach((item, index) => {
  //     if (item.id == product.id) {
  //       this.wishList.splice(index, 1);
  //       check = true
  //       localStorage.setItem("wish", JSON.stringify(this.wishList));
  //       this.productDetailsService.wishCount.next(this.wishList.length);
  //     }

  //   })
  //   if (!check) {
  //     this.wishList.push(product);
  //     localStorage.setItem("wish", JSON.stringify(this.wishList));
  //     this.productDetailsService.wishCount.next(this.wishList.length);
  //   }

  //   console.log(this.wishList);




  // }

  clickEvent(product: any) {

    this.wishList = JSON.parse(localStorage.getItem('wish')!) || [];
    if (this.wishList.length == 0) {
      product.wishList = 1;
      this.wishList.push(product);
      this.toastr.success('Item Added To Wish List')
      localStorage.setItem("wish", JSON.stringify(this.wishList));
      this.productDetailsService.wishCount.next(this.wishList.length);
      return;

    }

    let check = false;
    this.wishList.forEach((item,index) => {
      if (item.id == product.id) {
        product.wishList = 0;
        this.wishList.splice(index, 1);
        check = true
        this.toastr.warning('Removed Item From Wish List')
        localStorage.setItem("wish", JSON.stringify(this.wishList));
        this.productDetailsService.wishCount.next(this.wishList.length);
      }

    })
    if (!check) {
      product.wishList = 1;
      this.wishList.push(product);
      this.toastr.success('Item Added To Wish List')
      localStorage.setItem("wish", JSON.stringify(this.wishList));
      this.productDetailsService.wishCount.next(this.wishList.length);
    }




  }

}