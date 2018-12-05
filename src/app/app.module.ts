import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthorsComponent } from './shared/authors/authors.component';
import { ArticlesComponent } from './shared/articles/articles/articles.component';
import { ArticleComponent } from './shared/articles/article/article.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { AuthorComponent } from './shared/authors/author/author.component';
import { SearchComponent } from './shared/search/search.component';
import { SearchResultComponent } from './shared/search/search-result/search-result.component';
import {FormsModule} from '@angular/forms';
import { TaxaComponent } from './shared/taxa/taxa.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    ArticlesComponent,
    ArticleComponent,
    NotFoundComponent,
    AuthorComponent,
    SearchComponent,
    SearchResultComponent,
    TaxaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    {provide: 'Sitefinity', useValue: window['Sitefinity']},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
