import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import { RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {Taxa, TaxaOptions} from '../../taxa/taxa.component';
import {tagsOptions, categoriesOptions, TaxaService, tagsProperty, categoryProperty} from '../../services/taxa.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent extends RxBaseComponent implements OnInit {
  articles: Article[] = [];
  tags: Observable<Taxa[]>;
  categories: Observable<Taxa[]>;
  tagsName: string = tagsProperty;
  categoryName: string = categoryProperty;
  private allItemsCount: number;
  private showMoreItemsLink: boolean = true;
  private subscription: Subscription;
  private articlesCountSubscription: Subscription;
  private articlesForTagSubscription: Subscription;
  private allArticlesSubscription: Subscription;
  private taxaServiceSubscription: Subscription;

  get shouldShowLoadMore(): boolean {
    return (this.allItemsCount > this.articles.length) && this.showMoreItemsLink;
  }

  constructor(private articlesService: ArticlesService, private taxaService: TaxaService) {
    super();
  }

  ngOnInit() {
    this.getArticles();
    this.getTagsAndCategories();
    this.getAllArticlesCount();
    this.registerSubscription(this.subscription);
    this.registerSubscription(this.articlesCountSubscription);
    this.registerSubscription(this.articlesForTagSubscription);
    this.registerSubscription(this.taxaServiceSubscription);
  }

  LoadMore() {
    this.getArticles();
  }

  getTagsAndCategories() {
    this.allArticlesSubscription = this.articlesService.getAllArticles().subscribe((data: Article[]) => {
      this.tags = this.getTaxa(tagsOptions, tagsProperty);
      this.categories = this.getTaxa(categoriesOptions, categoryProperty);
    });
  }

  getTaxa(taxaOptions: TaxaOptions, propertyName: string): Observable<Taxa[]> {
    let taxaReplaySubject = new ReplaySubject<Taxa[]>(1);
    this.allArticlesSubscription = this.articlesService.getAllArticles().subscribe((data: Article[]) => {
      let articleTaxas: Array<string> = [];
      if (data) {
        data.forEach((article) => {
          if(article[propertyName]) {
            articleTaxas.push(...article[propertyName]);
          }
        });
        this.taxaServiceSubscription = this.taxaService.getTaxaForIds(taxaOptions, articleTaxas).subscribe(data =>taxaReplaySubject.next(data));
      }
    });
    return taxaReplaySubject.asObservable();
  }


  getArticles(): void {
    this.subscription = this.articlesService.getAllArticles(6, this.articles.length).subscribe((data: Article[]) => {
      if (data) {
        this.articles.push(...data);
      }
    });
  }

  getArticlesByTaxa(taxaName: string, taxaId: string) {
    this.articlesForTagSubscription = this.articlesService.getArticlesByTaxa(taxaName, taxaId).subscribe((articles) => {
      if (articles) {
        this.articles = articles;
      }
    });
    this.showMoreItemsLink = false;
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
  Featured: boolean;
  Author?: string;
  Thumbnail?: Image;
  Tags?: Array<string>;
  Category?: Array<string>;
}

export class Image {
  AlternativeText: string;
  Width: string;
  Height: string;
  ThumbnailUrl: string;
  Url?: string;
}
