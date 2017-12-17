import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  // 当url是/heroes时，会显示HeroesComponent
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // 参数化路由，detail/12会给id赋值12
  { path: 'detail/:id', component: HeroDetailComponent },
  // 设置默认路由（首页）
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  // 暴露出RouterModule，为了在AppModule里能使用
  exports: [ RouterModule ],

  // 因为此router是在应用的根节点，所以是forRoot
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}