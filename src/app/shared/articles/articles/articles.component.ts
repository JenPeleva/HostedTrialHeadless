import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Observable, Subscription} from 'rxjs';
import {Tag} from '../../tags/tags/tags.component';
import {TagsService} from '../../services/tags.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent extends RxBaseComponent implements OnInit {
  articles: Article[] = [];
  tags: Observable<Tag[]>;
  private allItemsCount: number;
  private subscription: Subscription;
  private articlesCountSubscription: Subscription;
  private articlesForTagSubscription: Subscription;
  private allArticlesSubscription: Subscription;

  get shouldShowLoadMore(): boolean {
    return this.allItemsCount > this.articles.length;
  }

  constructor(private articlesService: ArticlesService, private tagsService: TagsService) {
    super();
  }

  ngOnInit() {
    this.getArticles();
    this.getTags();
    this.getAllArticlesCount();
    this.registerSubscription(this.subscription);
    this.registerSubscription(this.articlesCountSubscription);
    this.registerSubscription(this.articlesForTagSubscription);
  }

  LoadMore() {
    this.getArticles();
  }

  getTags(): void {
    this.allArticlesSubscription = this.articlesService.getAllArticles().subscribe((data: Article[]) => {
      let articleTags: Array<string> = [];
      if (data) {
        data.forEach((article) => {
          if(article.Tags) {
            articleTags.push(...article.Tags);
          }
        });
        this.tags = this.tagsService.getTagsForIds(articleTags);
      }
    });
  }

  getArticles(): void {
    this.subscription = this.articlesService.getAllArticles(6, this.articles.length).subscribe((data: Article[]) => {
      if (data) {
        this.articles.push(...data);
      }
    });
  }

  getArticlesByTag(tag: Tag) {
    this.articlesForTagSubscription = this.articlesService.getArticlesByTag('6c41f4a4-1d60-6822-81ac-ff0000da1875').subscribe((articles) => {
      debugger;
      if (articles) {
        this.articles = articles;
      }
    });
  }

  getAllArticlesCount() {
    this.articlesCountSubscription = this.articlesService.getAllArticlesCount().subscribe((data) => {
      this.allItemsCount = data;
    });
  }
}

export class Article {
  Id: string;
  Content: string;
  DateCreated: string;
  Summary: string;
  Title: string;
  UrlName: string;
  Author?: string;
  Thumbnail?: RelatedImage;
  Tags?: Array<string>;
}

export class RelatedImage {
  Url?: string;
  AlternativeText: string;
  Width: string;
  Height: string;
  ThumbnailUrl;
}
