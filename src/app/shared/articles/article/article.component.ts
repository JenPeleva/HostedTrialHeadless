import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../articles/articles.component';
import {ArticlesService} from '../../services/articles.service';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Observable, Subscription} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent extends RxBaseComponent implements OnInit {
  article: Article;
  articleContent: SafeHtml;
  subscription: Subscription;

  constructor(private articlesService: ArticlesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.getArticle();
    this.registerSubscription(this.subscription);
  }

  getArticle() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.articlesService.getArticle(id).subscribe((data) => {
        this.article = data;
        if (data.Content) {
          this.articleContent = this.sanitizer.bypassSecurityTrustHtml(data.Content);
        }
      });
    }
  }
}
