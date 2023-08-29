import { HomeComponent } from './features/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './features/category/category.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'categories',component:CategoryComponent},
  {path:'details/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'wishlist',component:WishlistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
