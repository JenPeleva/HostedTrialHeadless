import {Component, OnInit} from '@angular/core';
import {ArticlesService} from './shared/services/articles.service';
import {Image} from './shared/articles/articles/articles.component';
import {ImagesService} from './shared/services/images.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  bannerImage: Observable<Image>;
  logoImage: Observable<Image>;

  constructor(private imageService: ImagesService) {}

  ngOnInit() {
    this.bannerImage = this.imageService.getImageByTitle('News Head Banner');
    this.logoImage = this.imageService.getImageByTitle('Logo_Quantum');
  }
}
