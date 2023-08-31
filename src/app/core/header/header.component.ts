import { ProductDetailsService } from './../../features/product-details/product-details.service';
import { WishlistService } from './../../features/wishlist/wishlist.service';
import { CartService } from './../../features/cart/cart.service';
import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { HomeServiceService } from 'src/app/features/home/home-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog , private homeService:HomeServiceService , private CartService:CartService ,private wishlistService: WishlistService,private productDetailsService :ProductDetailsService) { }
  myArr = ['Cart'];
  wishList: any[] = [];
  cart: any[] = [];
  products: any[] = [];
  public searchInput: string ="" ;
  subs:Subscription[]=[];
  wishSubs:Subscription[]=[];
  cartCount:number=0;
  wishCount:number=0;
  wishListLength=0;
  ngOnInit(): void {
    window.scrollTo(0, 0)
    
    this.wishList = JSON.parse(localStorage.getItem('wish')!);
    for(let i =0;i<this.wishList.length;i++){
      if(this.wishList[i].wishList==1){
        this.wishListLength++;
      }
    }
    this.cart = JSON.parse(localStorage.getItem('cart')!);
    this.products = JSON.parse(localStorage.getItem('products')!);
    this.subs.push(
      this.productDetailsService.count.subscribe((res:any)=>{
        
        // res=this.cart;
        // console.log({res});
        if(res==0){
          this.cartCount=this.cart.length;
        }
        else{
          this.cartCount=res;
        }
      })
    )
    this.wishSubs.push(
      this.productDetailsService.wishCount.subscribe((res:any)=>{
        
        // res=this.cart;
        console.log({res});
        if(res==0){
          this.wishCount=this.wishList.length;
        }
        else{
          this.wishCount=res;
        }
      })
    )
    // this.title="";
  }


  login() {
    const dialogConfig = new MatDialogConfig;
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.panelClass = 'custom-container';
    this.dialog.open(LoginComponent, dialogConfig)
  }

  search(event : any) {
   this.searchInput = (event.target as HTMLInputElement).value
   console.log(this.searchInput);
   this.homeService.search.next(this.searchInput);
   this.CartService.search.next(this.searchInput);
   this.wishlistService.search.next(this.searchInput);
  }

}
