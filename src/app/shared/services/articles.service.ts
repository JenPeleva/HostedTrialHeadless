import {Injectable} from '@angular/core';
import {SitefinityService} from './sitefinity.service';
import {ReplaySubject, Observable} from 'rxjs';
import {Article} from '../articles/articles/articles.component';
export const articlesDataOptions = {
  urlName: 'newsitems',
  providerName: 'OpenAccessDataProvider',
  cultureName: 'en'
};

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private sitefinity: SitefinityService) { }

  getAllArticles(take?: number, skip?: number): Observable<Article[]> {
    let query;
    const articlesReplaySubject = new ReplaySubject<Article[]>(1);
    if (take !== (null || undefined) && skip !== (null || undefined)) {
      query = this.sitefinity
        .query
        .select('Title', 'Id', 'Content', 'DateCreated', 'PublicationDate', 'Summary', 'UrlName', 'Author', 'Tags', 'Category', 'Featured')
        .expand('Thumbnail')
        .order('PublicationDate desc')
        .skip(skip).take(take);
    } else {
      query = this.sitefinity
        .query
        .select('Title', 'Id', 'Content', 'DateCreated', 'PublicationDate', 'Summary', 'UrlName', 'Author','Tags', 'Category', 'Featured')
        .expand('Thumbnail')
        .order('PublicationDate desc');
    }
      this.sitefinity.instance.data(articlesDataOptions).get({
      query: query,
      successCb: data => articlesReplaySubject.next(data.value as Article[]),
      failureCb: data => console.log(data)
    });
    return articlesReplaySubject.asObservable();
  }

  getArticlesByTaxa(propertyName: string, taxaId: string): Observable<Article[]> {
    const articleSubject = new ReplaySubject<any>(1);
    this.sitefinity.instance.data(articlesDataOptions).get({
      query: this.sitefinity
        .query
        .select('Title', 'Id', 'Content', 'DateCreated', 'Summary', 'UrlName', 'Author','Tags')
        .expand('Thumbnail')
        .order('Title desc')
        .where()
        .any()
        .eq(propertyName, taxaId)
        .done().done(),
      successCb: data => articleSubject.next(data.value as Article[]),
      failureCb: data => console.log(data)
    });
    return articleSubject.asObservable();
  }

  getArticle(id: string): Observable<Article> {
    const articleReplaySubject = new ReplaySubject<any>(1);
      this.sitefinity.instance.data(articlesDataOptions).getSingle({
          key: id,
          query: this.sitefinity
            .query
            .select('Title', 'Id', 'Content', 'DateCreated', 'Summary', 'UrlName', 'Author', 'Tags')
            .expand('Thumbnail')
            .order('Title desc'),
          successCb: (data: Article) => {articleReplaySubject.next(data)},
          failureCb: data => console.log(data)
        });
    return articleReplaySubject.asObservable();
  }

  getAllArticlesCount(): Observable<number> {
    const articleReplaySubject = new ReplaySubject<any>(1);
      this.sitefinity.instance.data(articlesDataOptions).get({
        query: this.sitefinity
          .query
          .count(false),
        successCb: (data: number) => articleReplaySubject.next(data),
        failureCb: data => console.log(data)
      });
    return articleReplaySubject.asObservable();
  }
}
