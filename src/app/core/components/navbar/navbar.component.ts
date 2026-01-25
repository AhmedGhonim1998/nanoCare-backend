import { Component, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // 1. تأكد من تعريفها كـ boolean صريح
  public isScrolled: boolean = false;
  public isMenuOpen: boolean = false;

  constructor(private eRef: ElementRef, private cdr: ChangeDetectorRef) {}

  toggleMenu(event: Event) {
    event.stopPropagation(); 
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  // 2. تحديث الـ Scroll Logic بشكل أدق
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // تحديث القيمة
    this.isScrolled = scrollOffset > 20;
    
    // إجبار الأنجولار على تحديث الـ View لو معلق
    this.cdr.detectChanges();
  }
}