import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // جرب المسارات دي، من غير سلاش في الأول خالص لو الصور جوه public/coverImages
  public heroImages: any[] = [
    'assets/coverImages/2.png',
    'assets/coverImages/nanocareBottel.jpeg',
    'assets/coverImages/Post 5.jpg'
  ];
  
  public currentIndex: number = 0;
  private intervalId: any;
  public isAutoPlaying: boolean = true;

  ngOnInit() {
    this.startAutoPlay();
  }

  startAutoPlay() {
    if (this.isAutoPlaying) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.heroImages.length;
  }

  prevSlide() {
    this.currentIndex = this.currentIndex === 0 ? this.heroImages.length - 1 : this.currentIndex - 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }
}