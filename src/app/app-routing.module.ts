import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'entry',
    pathMatch: 'full'
  },
  {
    path: 'entry',
    loadChildren: () => import('./auth/page/entry/entry.module').then( m => m.EntryPageModule)
  },
  {
    path: 'navigation',
    loadChildren: () => import('./navigation/page/navigation/navigation.module').then( m => m.NavigationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
