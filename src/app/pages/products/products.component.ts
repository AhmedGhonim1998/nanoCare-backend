import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [CommonModule],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  categories = ['All Products', 'Collagen', 'Vitamins', 'Minerals', 'Proteins'];
  selectedCategory = 'All Products';

  products = [
    {
      id: 1,
      name: 'NanoCare Collagen',
      category: 'Marine & Bovine Blend',
      price: 1200,
      image: 'assets/coverImages/2.png',
      tag: 'Best Seller',
      tagColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      description: 'Advanced marine and bovine collagen blend for skin elasticity and joint health.',
      rating: 4.8,
      reviewCount: 120,
      isNew: false,
      isLimited: false
    },
    {
      id: 2,
      name: 'Liposomal Vitamin C',
      category: 'High Absorption Formula',
      price: 850,
      image: 'assets/coverImages/nanocareBottel.jpeg',
      tag: 'New Arrival',
      tagColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      description: 'Liposomal encapsulation technology for maximum bioavailability and immune support.',
      rating: 4.9,
      reviewCount: 95,
      isNew: true,
      isLimited: false
    },
    {
      id: 3,
      name: 'Pure Liposomal D3',
      category: 'Bone & Immune Support',
      price: 600,
      image: 'assets/coverImages/Post 5.jpg',
      tag: 'Limited Stock',
      tagColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
      description: 'High-potency Vitamin D3 with enhanced absorption for optimal bone and immune health.',
      rating: 4.7,
      reviewCount: 85,
      isNew: false,
      isLimited: true
    },
    {
      id: 4,
      name: 'Magnesium Complex',
      category: 'Muscle & Nerve Support',
      price: 750,
      image: 'assets/coverImages/supplement-bottle.png', // Make sure to add this image
      tag: 'Top Rated',
      tagColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Triple magnesium formula for muscle relaxation, nerve function, and sleep support.',
      rating: 4.8,
      reviewCount: 150,
      isNew: false,
      isLimited: false
    },
    {
      id: 5,
      name: 'Omega-3 Ultra',
      category: 'Cardiovascular Health',
      price: 1100,
      image: 'assets/coverImages/omega-3.png', // Make sure to add this image
      tag: 'Doctor Recommended',
      tagColor: 'bg-gradient-to-r from-red-500 to-orange-500',
      description: 'Pharmaceutical-grade fish oil with high EPA/DHA concentration for heart and brain health.',
      rating: 4.9,
      reviewCount: 200,
      isNew: false,
      isLimited: false
    },
    {
      id: 6,
      name: 'Probiotic 50B',
      category: 'Gut Health Formula',
      price: 950,
      image: 'assets/coverImages/probiotic.png', // Make sure to add this image
      tag: 'Best Seller',
      tagColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      description: '50 billion CFU with 12 probiotic strains for optimal digestive and immune health.',
      rating: 4.7,
      reviewCount: 110,
      isNew: true,
      isLimited: false
    }
  ];

  filteredProducts = [...this.products];

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

  // Optional: Function to generate random rating for demo purposes
  // You can remove this if you have actual ratings in your data
  getRandomRating(): number {
    return Math.floor(Math.random() * (50 - 10 + 1) + 10) / 10;
  }

  // Optional: Function to generate random review count
  getRandomReviewCount(): number {
    return Math.floor(Math.random() * (200 - 50 + 1) + 50);
  }
}