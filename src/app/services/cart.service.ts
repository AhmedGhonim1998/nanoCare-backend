import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);
  private favorites$ = new BehaviorSubject<number[]>([]);
  private orderSummary: any = null;
  
  private readonly CART_STORAGE_KEY = 'nanocare_cart';
  private readonly FAVORITES_STORAGE_KEY = 'nanocare_favorites';

  constructor() {
    this.loadFromLocalStorage();
  }

  // Cart Methods
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  getCartItemCount(): number {
    return this.cartItems$.value.length;
  }

  getTotalPrice(): number {
    return this.cartItems$.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  addToCart(product: any, quantity: number = 1) {
    const cartItems = this.cartItems$.value;
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        category: product.category
      });
    }

    this.cartItems$.next([...cartItems]);
    this.saveToLocalStorage();
  }

  removeFromCart(productId: number) {
    const cartItems = this.cartItems$.value.filter(item => item.id !== productId);
    this.cartItems$.next(cartItems);
    this.saveToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const cartItems = this.cartItems$.value;
    const item = cartItems.find(i => i.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.cartItems$.next([...cartItems]);
      this.saveToLocalStorage();
    }
  }

  clearCart() {
    this.cartItems$.next([]);
    this.saveToLocalStorage();
  }

  // Favorites/Wishlist Methods
  getFavorites(): Observable<number[]> {
    return this.favorites$.asObservable();
  }

  toggleFavorite(productId: number) {
    const favorites = this.favorites$.value;
    const index = favorites.indexOf(productId);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(productId);
    }

    this.favorites$.next([...favorites]);
    this.saveToLocalStorage();
  }

  isFavorite(productId: number): boolean {
    return this.favorites$.value.includes(productId);
  }

  addFavorite(productId: number) {
    const favorites = this.favorites$.value;
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      this.favorites$.next([...favorites]);
      this.saveToLocalStorage();
    }
  }

  removeFavorite(productId: number) {
    const favorites = this.favorites$.value.filter(id => id !== productId);
    this.favorites$.next(favorites);
    this.saveToLocalStorage();
  }

  // Order Summary Methods
  setOrderSummary(orderSummary: any) {
    this.orderSummary = orderSummary;
  }

  getOrderSummary() {
    return this.orderSummary;
  }

  // LocalStorage Methods
  private saveToLocalStorage() {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems$.value));
      localStorage.setItem(this.FAVORITES_STORAGE_KEY, JSON.stringify(this.favorites$.value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private loadFromLocalStorage() {
    try {
      const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
      const favoritesData = localStorage.getItem(this.FAVORITES_STORAGE_KEY);

      if (cartData) {
        this.cartItems$.next(JSON.parse(cartData));
      }

      if (favoritesData) {
        this.favorites$.next(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }
}
