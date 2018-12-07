import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ArticlesComponent } from './shared/articles/articles/articles.component';
import { ArticleComponent } from './shared/articles/article/article.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { SearchComponent } from './shared/search/search.component';
import { SearchResultComponent } from './shared/search/search-result/search-result.component';
import {FormsModule} from '@angular/forms';
import { TaxaComponent } from './shared/taxa/taxa.component';
import {ShowcasesComponent} from './shared/showcases/showcases.component';
import { ShowcaseComponent } from './shared/showcases/showcase/showcase.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleComponent,
    NotFoundComponent,
    ShowcasesComponent,
    SearchComponent,
    SearchResultComponent,
    TaxaComponent,
    ShowcaseComponent
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
