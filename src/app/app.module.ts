import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { CategoryComponent } from './features/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './shared/card/card.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { LoginComponent } from './core/login/login.component';
import { SignupComponent } from './core/signup/signup.component';
import { MatIconModule } from "@angular/material/icon";
import { SpinnerComponent } from './shared/spinner/spinner.component'
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './shared/filter.pipe';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent,
    CategoryComponent,
    CardComponent,
    ProductDetailsComponent,
    CartComponent,
    WishlistComponent,
    LoginComponent,
    SignupComponent,
    SpinnerComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut:1000,
    }),
    // Ng2SearchPipeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
