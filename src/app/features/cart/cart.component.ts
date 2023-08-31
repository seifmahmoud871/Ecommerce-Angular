import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/core/login/login.component';
import { ProductDetailsService } from '../product-details/product-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private products: CartService,private dialog:MatDialog, private productDetailsService:ProductDetailsService , private toastr :ToastrService) { }

  cartProduct: any[] = [];
  deletedArr: any = [];
  key :  string="";
  starWidth: number = 0;
  total:any=0;
  empty:boolean=false;
  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.getProducts();
    this.products.search.subscribe((res:any)=>{
      this.key=res;
    })
  }

  getProducts() {

    if("cart"in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
      if(this.cartProduct.length==0){
        this.empty=true;
      }
      else{
        this.empty=false;
      }
      console.log(this.cartProduct );
    }
    else{
      this.empty=true;
    }
    this.getTotalPrice();
    
    console.log("dsasd");

  }

  deleteProduct(index: number) {
    this.cartProduct.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    this.productDetailsService.count.next(this.cartProduct.length);
    console.log(this.cartProduct);
    this.toastr.warning('Removed Item From Cart')
    this.getProducts();
  }

  updateProduct(id: number) {
    console.log(id);
    this.products.updateProduct(id).subscribe((res: any) => {
      console.log(res);

    })
  }

  getRating(id:number):number{
   
    let index;
    for(let i=0;i<this.cartProduct.length;i++){
      if(this.cartProduct[i].id==id){
        console.log((this.cartProduct[i].rating.rate/5)*100);
        
        return (this.cartProduct[i].rating.rate/5)*100;
      }
     
    }
   
    return 0;
  
  
  }


  getTotalPrice(){
    // this.cartProduct=JSON.parse(localStorage.getItem('cart')!);
    this.total=0;
    for(let i=0;i<this.cartProduct.length;i++){
      this.total+=this.cartProduct[i].price*this.cartProduct[i].quantity;
      
      
    }
    this.total=this.total.toFixed(2);

    console.log(this.total);
  }


  decreaseQuantity(index:number){
    this.cartProduct[index].quantity--;
    console.log("dsfasf");
    this.getTotalPrice();
    console.log(this.total);
    
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }
  increaseQuantity(index:number){
    this.cartProduct[index].quantity++;
    this.getTotalPrice(); 
    console.log(this.total);
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }

  detectChange(){
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }

  login(){
    const dialogConfig = new MatDialogConfig;
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    dialogConfig.panelClass='custom-container';
    this.dialog.open(LoginComponent,dialogConfig)
  }

}
