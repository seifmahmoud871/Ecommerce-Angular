import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './product-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  data: any;
  id: any;
  loading: boolean = false;
  wishList: any[] = [];
  statusCart: boolean = false;
  statusWishList: boolean = false;
  cartProducts: any[] = [];
  constructor(private route: ActivatedRoute, private http: ProductDetailsService, private toastr: ToastrService) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.getProductById();
  }
  getProductById() {
    this.wishList = JSON.parse(localStorage.getItem('wish')!) || [];
    this.loading = true;
    this.http.getProductById(this.id).subscribe((res: any) => {
      console.log({ res });
      this.data = res;
      this.loading = false;

      for (let i = 0; i < this.wishList.length; i++) {
        if (this.wishList[i].id == this.data.id) {
          this.data.wishList = 1;
        }
        console.log(this.wishList[i].id == this.data.id);
      }
      console.log(this.data);

    })
  }

  addToCart(product: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.id == product.id);
      console.log(exist);
      console.log(this.cartProducts);

      if (exist) {
        exist.quantity += 1;
        // console.log("prduct exists");  
        // this.cartProducts.push(product);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));


      }
      else {
        product.quantity = 1;
        this.cartProducts.push(product);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }

    }
    else {
      product.quantity = 1;
      this.cartProducts.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
    this.statusCart = true;
    this.http.count.next(this.cartProducts.length);
  }


  clickEvent(product: any) {
    this.statusWishList = !this.statusWishList;

    console.log('dssda');

    this.wishList = JSON.parse(localStorage.getItem('wish')!) || [];


    if (this.wishList.length == 0) {
      this.wishList.push(product);
      console.log(this.wishList);
      product.wishList = 1;
      this.http.wishCount.next(this.wishList.length);
      this.toastr.success('Item Added To Wish List')
      localStorage.setItem("wish", JSON.stringify(this.wishList));
      return;
    }
    let check = false;
    this.wishList.forEach((item, index) => {
      if (item.id == product.id) {
        this.wishList.splice(index, 1);
        product.wishList = 0;
        this.http.wishCount.next(this.wishList.length);
        check = true
        this.toastr.warning('Removed Item From Wish List')
        localStorage.setItem("wish", JSON.stringify(this.wishList));
      }

    })
    if (!check) {
      product.wishList = 1;
      this.wishList.push(product);
      this.http.wishCount.next(this.wishList.length);
      this.toastr.success('Item Added To Wish List')
      localStorage.setItem("wish", JSON.stringify(this.wishList));
    }


  }


  showToastrCart() {
    if (this.statusCart) {
      this.toastr.success('Item Added To Cart')
    }
    else {
      this.toastr.warning('Removed Item From Cart')
    }

  }
  showToastrWish() {
    if (this.statusWishList) {
      this.toastr.success('Item Added To Wish List')
    }
    else {
      this.toastr.warning('Removed Item From Wish List')
    }
  }


}
