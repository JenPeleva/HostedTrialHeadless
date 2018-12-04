import {EventEmitter, Injectable, Output} from '@angular/core';
import {SitefinityService} from './sitefinity.service';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {SearchResultItem} from '../search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Output() searchTriggered = new EventEmitter<any>();
  private _searchResults:ReplaySubject<SearchResultItem[]> = new ReplaySubject<SearchResultItem[]>(1);
  get searchResults(): Observable<SearchResultItem[]> {
      return this._searchResults.asObservable();
  }

  constructor(private router: Router, private sitefinity: SitefinityService) { }

  search(searchWord: string) {
    this.getItemsBySearchWord(searchWord);
    this.router.navigate(['/search-results']);
  }

  getItemsBySearchWord(searchWord: string): void {
    const batch = this.sitefinity.instance.batch(data => this._searchResults.next(this.mapSearchResults(data)));
    batch.get({ entitySet: 'authors', query: this.sitefinity
        .query
        .select('Bio', 'JobTitle', 'Name', 'Id')
        .order('Name asc')
        .where()
        .contains('Bio', searchWord)
        .or()
        .contains('JobTitle', searchWord)
        .or()
        .contains('Name', searchWord)
        .done().done().done()});
    batch.get({ entitySet: 'newsitems', query: this.sitefinity
        .query
        .select('Title', 'Content', 'Summary', 'Id')
        .order('Title asc')
        .where()
        .contains('Title', searchWord)
        .or()
        .contains('Content', searchWord)
        .or()
        .contains('Summary', searchWord)
        .done().done().done()});
    batch.execute();
  }

  mapSearchResults(result: any): SearchResultItem[] {
    const searchResults = [];
    const data = result.data;
    if (data.length > 0) {
      data.forEach((item) => {
        const context = item.response.data['@odata.context'];
        let contentType;
        const valuesArray = item.response.data.value;
        if (context) {
          contentType = context.substring(context.indexOf('#') + 1, context.indexOf('('));
        }

        if (valuesArray && valuesArray.length > 0) {
          switch (contentType) {
            case 'newsitems':
              valuesArray.forEach(contentItm => {
                searchResults.push({ Title: contentItm.Title, DetailLink: '/articles/' + contentItm.Id, Content: contentItm.Summary });
              });
              break;
            case 'authors':
              valuesArray.forEach(contentItm => {
                searchResults.push({ Title: contentItm.Name, DetailLink: '/authors/' + contentItm.Id, Content: contentItm.JobTitle });
              });
              break;
            default:
              break;
          }
        }
      });
    }

    return searchResults;
  }
}
