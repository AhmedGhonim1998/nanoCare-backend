import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './productdetails.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  product: any = null;
  quantity: number = 1;
  selectedImageIndex: number = 0;
  selectedImage: string = '';
  favoriteProducts: number[] = [];
  
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
      originalPrice: 750,
      discount: 20,
      image: 'assets/coverImages/Post 5.jpg',
      tag: 'Limited Stock',
      tagColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
      description: 'High-potency Vitamin D3 with liposomal technology for maximum absorption. Essential for bone health, immune function, and overall wellbeing.',
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
      originalPrice: 900,
      discount: 17,
      image: 'assets/coverImages/nanocare4.jpg',
      tag: 'Top Rated',
      tagColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Triple magnesium formula for muscle relaxation, nerve function, and sleep support. Enhanced absorption with liposomal delivery system.',
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
      originalPrice: 1300,
      discount: 15,
      image: 'assets/coverImages/nanocare5.jpg',
      tag: 'Doctor Recommended',
      tagColor: 'bg-gradient-to-r from-red-500 to-orange-500',
      description: 'Pharmaceutical-grade fish oil with high EPA/DHA concentration for heart and brain health. Supports cardiovascular function and cognitive performance.',
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
      originalPrice: 1100,
      discount: 14,
      image: 'assets/coverImages/nanocare2.jpg',
      tag: 'Best Seller',
      tagColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      description: '50 billion CFU with 12 probiotic strains for optimal digestive and immune health. Clinically-proven formula for gut wellness.',
      rating: 4.7,
      reviewCount: 110,
      isNew: true,
      isLimited: false
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Subscribe to route params changes
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });
    
    // Load favorites from cart service
    this.cartService.getFavorites().subscribe(favorites => {
      this.favoriteProducts = favorites;
    });
  }

  loadProduct(id: number) {
    this.product = this.allProducts.find(p => p.id === id);
    if (this.product) {
      this.quantity = 1;
      this.selectedImageIndex = 0;
      this.selectedImage = this.product.image;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Toggle favorite status
  toggleFavorite(product: any) {
    const isFav = this.cartService.isFavorite(product.id);
    
    if (isFav) {
      // Remove from favorites and cart
      this.cartService.removeFavorite(product.id);
      this.cartService.removeFromCart(product.id);
    } else {
      // Add to favorites and cart with current quantity
      this.cartService.addFavorite(product.id);
      this.cartService.addToCart(product, this.quantity);
    }
  }

  isFavorite(productId: number): boolean {
    return this.cartService.isFavorite(productId);
  }

  // Get all images including main and additional ones
  getAllImages(productId: number): string[] {
    const allImages = [this.product?.image, ...this.getAdditionalImages(productId)];
    // Remove duplicates
    return [...new Set(allImages)];
  }

  // Select image by index
  selectImage(index: number) {
    this.selectedImageIndex = index;
    this.selectedImage = this.getAllImages(this.product.id)[index];
  }

  getAdditionalImages(productId: number): string[] {
    const imageMap: { [key: number]: string[] } = {
      1: [
        'assets/coverImages/2.png',
        'assets/coverImages/nanocare2.jpg',
        'assets/coverImages/nanocare3.jpg'
      ],
      2: [
        'assets/coverImages/nanocareBottel.jpeg',
        'assets/coverImages/nanocare3.jpg',
        'assets/coverImages/nanocare4.jpg'
      ],
      3: [
        'assets/coverImages/Post 5.jpg',
        'assets/coverImages/nanocare5.jpg',
        'assets/coverImages/nanocare2.jpg'
      ],
      4: [
        'assets/coverImages/nanocare4.jpg',
        'assets/coverImages/nanocare5.jpg',
        'assets/coverImages/nanocare2.jpg'
      ],
      5: [
        'assets/coverImages/nanocare5.jpg',
        'assets/coverImages/nanocare2.jpg',
        'assets/coverImages/nanocare3.jpg'
      ],
      6: [
        'assets/coverImages/nanocare2.jpg',
        'assets/coverImages/nanocare3.jpg',
        'assets/coverImages/nanocare4.jpg'
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
      ],
      4: [
        'Supports muscle relaxation and recovery',
        'Improves sleep quality naturally',
        'Supports nerve function and brain health',
        'Aids in stress relief and relaxation',
        'Highly bioavailable formula'
      ],
      5: [
        'Rich in EPA and DHA omega-3s',
        'Supports cardiovascular health',
        'Promotes brain function and memory',
        'Anti-inflammatory benefits',
        'Molecularly distilled for purity'
      ],
      6: [
        '50 billion CFU per serving',
        'Contains 12 beneficial probiotic strains',
        'Supports digestive health and regularity',
        'Enhances immune system function',
        'Helps maintain gut microbiome balance'
      ]
    };
    return benefitsMap[productId] || [];
  }

  getIngredients(productId: number): string[] {
    const ingredientsMap: { [key: number]: string[] } = {
      1: ['Marine Collagen', 'Bovine Collagen', 'Vitamin C', 'Hyaluronic Acid'],
      2: ['Liposomal Vitamin C', 'Phospholipids', 'Stevia'],
      3: ['Vitamin D3', 'MCT Oil', 'Sunflower Lecithin'],
      4: ['Magnesium Glycinate', 'Magnesium Taurate', 'Magnesium L-Threonate', 'Vitamin B6'],
      5: ['Wild-Caught Fish Oil', 'EPA', 'DHA', 'Natural Lemon Flavor', 'Vitamin E'],
      6: ['Lactobacillus acidophilus', 'Bifidobacterium longum', 'Lactobacillus rhamnosus', 'Saccharomyces boulardii', 'Prebiotic Fiber']
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
    
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? 1 : 0);
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
    this.showNotification(`${product.name} added to cart!`);
  }

  // Quick add to cart for related products (default quantity 1)
  quickAddToCart(product: any) {
    const cartItem = {
      ...product,
      quantity: 1,
      total: product.price
    };
    console.log('Quick added to cart:', cartItem);
    this.showNotification(`${product.name} added to cart!`);
  }

  buyNow(product: any) {
    this.addToCart(product);
    // Navigate to checkout
    this.router.navigate(['/checkout']);
  }

  showNotification(message: string) {
    // Implement toast notification
    // For now, using alert
    alert(message);
  }
}