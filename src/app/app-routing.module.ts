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
    path: 'principal',
    loadChildren: () => import('./principal/page/principal/principal.module').then( m => m.PrincipalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
