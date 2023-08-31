import { ToastrService } from 'ngx-toastr';
import { ProductDetailsService } from '../product-details/product-details.service';
import { WishlistService } from './wishlist.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private wishlistService: WishlistService , private http:ProductDetailsService, private toastr: ToastrService) { };

  wishList: any[] = [];
  status: boolean = true;
  empty:boolean=false;
  key :  string="";

  ngOnInit(): void {
    this.getWishlist();
    this.wishlistService.search.subscribe((res:any)=>{
      this.key=res;
    })
  }



  getWishlist() {
    this.wishList = JSON.parse(localStorage.getItem('wish')!);
    for(let i=0;i<this.wishList.length;i++){
      if(this.wishList[i]?.wishList==0){
        this.wishList.slice(i,1);
      }
    }
    if(this.wishList.length==0){
      this.empty=true;
    }
    

  }

  
  // selectedProductIndex: number = -1;

  // isSelectedProduct(index: number): boolean {
  //   return index === this.selectedProductIndex;
  // }
  clickEvent(product: any, index: number) {
    this.status = !this.status;
    
    
    // console.log({index});
    // console.log('dssda');
    
    this.wishList = JSON.parse(localStorage.getItem('wish')!) || [];
    for(let i=0;i<this.wishList.length;i++){
      if(this.wishList[i]?.wishList==0){
        this.wishList.slice(i,1);
      }
    }
    this.wishList.forEach((item, index) => {
      if (item.id == product.id) {
        item.wishList=0*item.wishList;
        this.wishList.splice(index, 1);
        // check = true
        localStorage.setItem("wish", JSON.stringify(this.wishList));
        console.log(this.wishList.length);
        this.toastr.warning('Removed Item From Wish List')
        this.http.wishCount.next(this.wishList.length);
      }

    })

    if(this.wishList.length==0){
      this.http.wishCount.next(this.wishList.length);
      this.empty=true;
    }


  }

  getRating(id:number):number{
    // console.log((this.productArr[id-1]?.rating?.rate/5)*100);
    let index;
    for(let i=0;i<this.wishList.length;i++){
      if(this.wishList[i].id==id){
        // console.log(this.wishList[i].rating.rate);
        console.log((this.wishList[i].rating.rate/5)*100);
        
        return (this.wishList[i].rating.rate/5)*100;
      }
      // console.log(this.wishList[i].rating.rate);
    }
   
    return 0;
    
    // console.log(this.wishList[id-1].rating.rate);
    // if(index) return (this.wishList[index].rating.rate/5)*100;
    // else{
    //   return 0*1;
    // }
  
  }

}
