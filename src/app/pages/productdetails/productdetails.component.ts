import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './productdetails.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  product: any = null;
  quantity: number = 1;
  

  
  // Mock product data - In real app, fetch from service
  allProducts = [
    {
      id: 1,
      name: 'NanoCare Collagen',
      category: 'Marine & Bovine Blend',
      price: 1200,
      originalPrice: 1500,
      discount: 20,
      image: 'assets/coverImages/2.png',
      tag: 'Best Seller',
      tagColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      description: 'Advanced dual-source collagen formula combining marine and bovine collagen for comprehensive joint, skin, and bone support. Our liposomal delivery ensures up to 98% absorption rate.',
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
      originalPrice: 950,
      discount: 10,
      image: 'assets/coverImages/nanocareBottel.jpeg',
      tag: 'New Arrival',
      tagColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      description: 'Liposomal Vitamin C with superior bioavailability for enhanced immune support and antioxidant protection. Protects cells from oxidative stress.',
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
      description: 'High-potency Vitamin D3 with liposomal technology for maximum absorption. Essential for bone health, immune function, and overall wellbeing.',
      rating: 4.7,
      reviewCount: 85,
      isNew: false,
      isLimited: true
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  // بنراقب الـ params عشان لو اتغيرت والصفحة مفتوحة يحس بالتغيير
  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (id) {
      this.loadProduct(id);
    }
  });
}

loadProduct(id: number) {
  this.product = this.allProducts.find(p => p.id === id);
  this.quantity = 1; // بنصفر الكمية مع كل منتج جديد
  window.scrollTo({ top: 0, behavior: 'smooth' }); // بنطلع لفوق بنعومة لما يفتح منتج جديد
}

  getAdditionalImages(productId: number): string[] {
    // Return additional images for the product
    const imageMap: { [key: number]: string[] } = {
      1: [
        'assets/coverImages/2.png',
        'assets/coverImages/2.png',
        'assets/coverImages/2.png'
      ],
      2: [
        'assets/coverImages/nanocareBottel.jpeg',
        'assets/coverImages/nanocareBottel.jpeg',
        'assets/coverImages/nanocareBottel.jpeg'
      ],
      3: [
        'assets/coverImages/Post 5.jpg',
        'assets/coverImages/Post 5.jpg',
        'assets/coverImages/Post 5.jpg'
      ]
    };
    return imageMap[productId] || [];
  }

  getProductBenefits(productId: number): string[] {
    const benefitsMap: { [key: number]: string[] } = {
      1: [
        '34x higher absorption than traditional collagen',
        'Supports skin elasticity and hydration',
        'Promotes joint health and mobility',
        'Strengthens hair and nails',
        'Zero sugar, keto-friendly formula'
      ],
      2: [
        'Liposomal technology for 98% absorption',
        'Potent antioxidant protection',
        'Supports immune system function',
        'Promotes collagen synthesis',
        'Gentle on sensitive stomachs'
      ],
      3: [
        'Essential for calcium absorption',
        'Supports immune defense',
        'Maintains healthy bone density',
        'Regulates mood and sleep cycles',
        'Pure, pharmaceutical-grade formula'
      ]
    };
    return benefitsMap[productId] || [];
  }

  getIngredients(productId: number): string[] {
    const ingredientsMap: { [key: number]: string[] } = {
      1: ['Marine Collagen', 'Bovine Collagen', 'Vitamin C', 'Hyaluronic Acid'],
      2: ['Liposomal Vitamin C', 'Phospholipids', 'Stevia'],
      3: ['Vitamin D3', 'MCT Oil', 'Sunflower Lecithin']
    };
    return ingredientsMap[productId] || [];
  }

  getRelatedProducts(currentProductId: number): any[] {
    return this.allProducts
      .filter(p => p.id !== currentProductId)
      .slice(0, 3);
  }

  getStarArray(rating: number): number[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(1); // Full star
      } else if (i === fullStars && hasHalfStar) {
        stars.push(0.5); // Half star
      } else {
        stars.push(0); // Empty star
      }
    }
    return stars;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: any) {
    const cartItem = {
      ...product,
      quantity: this.quantity,
      total: product.price * this.quantity
    };
    // In real app, add to cart service
    console.log('Added to cart:', cartItem);
    
    // Show success message
    this.showNotification('Product added to cart!');
  }

  buyNow(product: any) {
    this.addToCart(product);
    // Navigate to checkout
    this.router.navigate(['/checkout']);
  }

  showNotification(message: string) {
    // Implement notification service
    alert(message); // Replace with toast notification
  }
}