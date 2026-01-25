import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent }, // هنا هتعرض المنتج الوحيد والمنتجات اللي جاية
  { path: 'checkout', component: CheckoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];
