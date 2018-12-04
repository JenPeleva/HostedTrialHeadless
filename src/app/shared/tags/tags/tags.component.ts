import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent{
  @Input() tags:Tag[];
  @Output() tagClicked: EventEmitter<any> = new EventEmitter();

  handleClick(tag: Tag) {
    this.tagClicked.emit(tag);
  }
}
 export class Tag {
  Title: string;
  Id: string;
  Count?: number;
 }
