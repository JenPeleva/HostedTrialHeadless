import { Injectable } from '@angular/core';
import {SitefinityService} from './sitefinity.service';
import {Observable, ReplaySubject} from 'rxjs';
import {Tag} from '../tags/tags/tags.component';

export const tagsDataOptions = {
  urlName: 'flat-taxa'
};


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private sitefinity: SitefinityService) { }

  getAllTags(): Observable<Tag[]>{
    const tagsReplaySubject = new ReplaySubject<Tag[]>(1);
    this.sitefinity.instance.data(tagsDataOptions).get({
      query: this.sitefinity
        .query
        .select('Title', 'Id')
        .order('Title desc'),
      successCb: data => tagsReplaySubject.next(data.value as Tag[]),
      failureCb: data => console.log(data)
    });
    return tagsReplaySubject.asObservable();
  }

  getTagsForIds(ids: string[]): ReplaySubject<Tag[]> {
    const tagsByIdReplaySubject = new ReplaySubject<Tag[]>(1);
    this.getAllTags().subscribe((data) => {
      let tags: Tag[] = [];
      if (data) {
        data.forEach((tag) => {
          const occurencesInArray = this.getCountInArray(ids, tag.Id);
          if (occurencesInArray > 0) {
            tags.push({ Title: tag.Title, Id: tag.Id, Count: occurencesInArray });
          }
        });
        tagsByIdReplaySubject.next(tags);
      }
    });
    return tagsByIdReplaySubject;
  }

  private getCountInArray(arr: any, item: any): number {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        count++;
      }
    }
    return count;
  }
}
