import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './product-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit{
  data:any;
  id:any;
  loading:boolean=false;
  wishList: any[] = [];
  statusCart: boolean = false;
  statusWishList: boolean = false;
  cartProducts:any []=[];
  constructor(private route:ActivatedRoute,private http:ProductDetailsService ,private toastr:ToastrService){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    
  }

  ngOnInit(): void {
    this.getProductById();
  }
  getProductById(){
    this.loading=true;
    this.http.getProductById(this.id).subscribe((res:any)=>{
      console.log(res);
      this.data=res;
      this.loading=false;
    })
  }

  addToCart(product:any){
    if("cart" in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item=>item.id==product.id);
      console.log(exist);
      console.log(this.cartProducts);
      
      if(exist){
        exist.quantity+=1;
        // console.log("prduct exists");  
        // this.cartProducts.push(product);
        localStorage.setItem("cart",JSON.stringify(this.cartProducts));
        
        
      }
      else{
        product.quantity=1;
        this.cartProducts.push(product);
        localStorage.setItem("cart",JSON.stringify(this.cartProducts));
      }
      
    }
    else{
      product.quantity=1;
      this.cartProducts.push(product);
      localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    }
    this.statusCart=true;
  }

  
  clickEvent(product: any) {
    this.statusWishList = !this.statusWishList;
    
    console.log('dssda');
    
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

  
  }
  
  
  showToastrCart(){
    if(this.statusCart){
      this.toastr.success('Item Added To Cart')
    }
    else{
      this.toastr.warning('Removed Item From Cart')
    }

  }
  showToastrWish(){
    if(this.statusWishList){
      this.toastr.success('Item Added To Wish List')
    }
    else{
      this.toastr.warning('Removed Item From Wish List')
    }
  }


}
