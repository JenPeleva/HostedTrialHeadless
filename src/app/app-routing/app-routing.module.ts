import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from '../shared/articles/articles/articles.component';
import {NotFoundComponent} from '../shared/not-found/not-found.component';
import {ArticleComponent} from '../shared/articles/article/article.component';
import {SearchResultComponent} from '../shared/search/search-result/search-result.component';
import {ShowcasesComponent} from '../shared/showcases/showcases.component';
import {ShowcaseComponent} from '../shared/showcases/showcase/showcase.component';


const routes: Routes = [
  { path: 'articles',  component: ArticlesComponent, data: { title: 'Quantum News',  image: 'News Head Banner' }},
  { path: 'articles/:id', component: ArticleComponent},
  { path: 'development',  component: ShowcasesComponent, data: { title: 'Development', image: 'Development Head Banner' }},
  { path: 'showcase/:id',  component: ShowcaseComponent},
  { path: 'search-results',  component: SearchResultComponent},
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
