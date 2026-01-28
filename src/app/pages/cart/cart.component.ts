// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

interface CartItemExtended extends CartItem {
  tag?: string;
  description?: string;
  isBestSeller?: boolean;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class CartComponent implements OnInit {
  cartItems: CartItemExtended[] = [];
  totalPrice: number = 0;
  discountAmount: number = 0;
  discountCode: string = '';
  selectedPayment: 'cash' | 'visa' | null = null;
  isLoading: boolean = false;
  
  // Card payment fields
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVC: string = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items.map(item => ({
        ...item,
        tag: this.getRandomTag(),
        description: this.getDescription(item.name),
        isBestSeller: Math.random() > 0.5
      }));
      this.calculateTotal();
    });
  }

  getRandomTag(): string {
    const tags = ['Best Seller', 'Most Popular', 'New Formula', 'Limited Stock'];
    return tags[Math.floor(Math.random() * tags.length)];
  }

  getDescription(productName: string): string {
    const descriptions = [
      'Premium liposomal formula for optimal cellular absorption',
      'Advanced nano-encapsulation technology for maximum efficacy',
      'Clinically-proven formula with 98% absorption rate',
      'Pure, high-quality ingredients for superior results'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  calculateTotal() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  calculateFinalTotal(): number {
    const subtotal = this.totalPrice;
    const tax = subtotal * 0.14;
    return subtotal + tax - this.discountAmount;
  }

  updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1) {
      this.removeItem(productId);
    } else if (newQuantity > 10) {
      alert('Maximum quantity is 10 per item');
    } else {
      this.cartService.updateQuantity(productId, newQuantity);
      this.calculateTotal();
    }
  }

  removeItem(productId: number) {
    if (confirm('Remove this item from your cart?')) {
      this.cartService.removeFromCart(productId);
      this.calculateTotal();
    }
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
      this.cartItems = [];
      this.calculateTotal();
    }
  }

  selectPaymentMethod(method: 'cash' | 'visa') {
    this.selectedPayment = method;
  }

  formatCardNumber() {
    // Remove all non-digit characters
    let value = this.cardNumber.replace(/\D/g, '');
    
    // Add spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    if (value.length > 19) {
      value = value.substring(0, 19);
    }
    
    this.cardNumber = value;
  }

  applyDiscount() {
    const code = this.discountCode.trim().toUpperCase();
    
    if (!code) {
      alert('Please enter a discount code');
      return;
    }

    const discounts: { [key: string]: number } = {
      'WELCOME10': 0.10, // 10% off
      'SAVE20': 0.20,    // 20% off
      'HEALTH15': 0.15,  // 15% off
      'FIRSTORDER': 0.25 // 25% off
    };

    if (discounts[code]) {
      const discountRate = discounts[code];
      const subtotal = this.totalPrice;
      this.discountAmount = subtotal * discountRate;
      alert(`🎉 Discount applied! You saved ${discountRate * 100}% (EGP ${this.discountAmount.toFixed(2)})`);
    } else {
      alert('❌ Invalid discount code. Please try another code.');
      this.discountAmount = 0;
    }
  }

  validateCardPayment(): boolean {
    if (!this.cardNumber || this.cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }

    if (!this.cardExpiry || !/^\d{2}\/\d{2}$/.test(this.cardExpiry)) {
      alert('Please enter a valid expiry date (MM/YY)');
      return false;
    }

    if (!this.cardCVC || this.cardCVC.length !== 3) {
      alert('Please enter a valid 3-digit CVC');
      return false;
    }

    return true;
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!this.selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    if (this.selectedPayment === 'visa' && !this.validateCardPayment()) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      
      // Create order summary
      const orderSummary = {
        items: this.cartItems,
        subtotal: this.totalPrice,
        discount: this.discountAmount,
        tax: this.totalPrice * 0.14,
        total: this.calculateFinalTotal(),
        paymentMethod: this.selectedPayment === 'cash' ? 'Cash on Delivery' : 'Credit Card',
        orderNumber: 'NC-' + Math.floor(100000 + Math.random() * 900000),
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
      };

      // Store order in service for confirmation page
      this.cartService.setOrderSummary(orderSummary);

      // Clear cart
      this.cartService.clearCart();
      this.cartItems = [];
      this.calculateTotal();

      // Navigate to confirmation page
      this.router.navigate(['/order-confirmation']);
    }, 2000);
  }
}
