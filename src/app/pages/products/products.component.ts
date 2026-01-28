import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories = ['All Products', 'Collagen', 'Vitamins', 'Minerals', 'Proteins'];
  selectedCategory = 'All Products';

  products: any[] = [];
  filteredProducts: any[] = [];
  favoriteProducts: number[] = [];

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.filteredProducts = [...this.products];
    
    // Subscribe to favorites from cart service
    this.cartService.getFavorites().subscribe(favorites => {
      this.favoriteProducts = favorites;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All Products') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase()) ||
        product.name.toLowerCase().includes(category.toLowerCase())
      );
    }
  }

  filterProducts(category: string) {
    this.selectedCategory = category;
    
    if (category === 'All Products') {
      this.filteredProducts = [...this.products];
    } else {
      // Map categories to product types (you can adjust this logic based on your actual data structure)
      this.filteredProducts = this.products.filter(product => {
        const productCategory = product.name.toLowerCase();
        const filterCategory = category.toLowerCase();
        
        if (filterCategory === 'collagen') {
          return productCategory.includes('collagen');
        } else if (filterCategory === 'vitamins') {
          return productCategory.includes('vitamin') || product.name.includes('D3') || product.name.includes('C');
        } else if (filterCategory === 'minerals') {
          return productCategory.includes('magnesium');
        } else if (filterCategory === 'proteins') {
          return productCategory.includes('protein') || productCategory.includes('amino');
        }
        return true;
      });
    }
  }

  addToCart(product: any) {
    // Implement cart functionality
    console.log('Added to cart:', product);
    // You can add your cart service logic here
  }

  addToWishlist(product: any) {
    // Implement wishlist functionality
    console.log('Added to wishlist:', product);
    // You can add your wishlist service logic here
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }

  // Heart button methods
  toggleFavorite(product: any, event: Event) {
    event.stopPropagation();
    const isFav = this.cartService.isFavorite(product.id);
    
    if (isFav) {
      // Remove from favorites and cart
      this.cartService.removeFavorite(product.id);
      this.cartService.removeFromCart(product.id);
    } else {
      // Add to favorites and cart
      this.cartService.addFavorite(product.id);
      this.cartService.addToCart(product, 1);
    }
  }

  isFavorite(productId: number): boolean {
    return this.cartService.isFavorite(productId);
  }

  // Optional: Function to generate random review count
  getRandomReviewCount(): number {
    return Math.floor(Math.random() * (200 - 50 + 1) + 50);
  }
}