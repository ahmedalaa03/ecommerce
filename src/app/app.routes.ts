import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: AuthLayoutComponent, canActivate: [logedGuard],
        children: [
            
            {
                path: 'login',
                title: 'Login',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                title: 'Register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
            },
            {
                path: 'forgotpassword',
                title: 'Forgot Password',
                loadComponent: () => import('./pages/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent)
            }
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent, canActivate: [authGuard],
        children: [
            
            {
                path: 'home',
                title: 'Home',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'cart',
                title: 'Cart',
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
            },
            {
                path: 'products',
                title: 'Products',
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
            },
            {
                path: 'brands',
                title: 'Brands',
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent)
            },
            {
                path: 'wishlist',
                title: 'Wishlist',
                loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent)
            },
            {
                path: 'categories',
                title: 'Categories',
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
            },
            {
                path: 'allorders',
                title: 'All Orders',
                loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent)
            },
            {
                path: 'checkout/:id',
                title: 'Checkout',
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
            },
            {
                path: 'details/:id',
                title: 'Details',
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
            }
        ]
    },
    {
        path: '**',
        title: 'Not Found',
        loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent)
    }
];
