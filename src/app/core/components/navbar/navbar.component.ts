import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CartService } from '../../../services/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnDestroy {
  isScrolled = false;
  isMenuOpen = false;
  isSearchFocused = false;
  cartItemCount = 0;
  private routerSub?: Subscription; // لتنظيف الذاكرة
  
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.checkScroll();
    // Subscribe to cart items to update the count
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });
    // Prevent scroll when modal is open
    this.router.events.subscribe(() => {
      this.closeMenu();
    });
  }
  ngOnDestroy() {
    this.routerSub?.unsubscribe(); // مهم جداً لمنع الـ Memory Leak
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  toggleMenu(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.updateBodyScroll();
  }

  updateBodyScroll() {
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    // Close menu if clicked outside the menu container and menu button
    if (this.isMenuOpen) {
      const clickedInMenu = target.closest('.mobile-menu-container') !== null;
      const clickedMenuButton = target.closest('.menu-button') !== null;
      
      if (!clickedInMenu && !clickedMenuButton) {
        this.closeMenu();
      }
    }
  }

  onSearchFocus() {
    this.isSearchFocused = true;
  }

  onSearchBlur() {
    this.isSearchFocused = false;
  }
}