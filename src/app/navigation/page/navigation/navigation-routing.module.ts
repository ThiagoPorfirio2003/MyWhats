import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationPage } from './navigation.page';

const routes: Routes = [
  {
    path: '',
    component: NavigationPage,
    children:
    [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'store',
      },
      {
        path: 'profile',
        loadChildren: () => import('../../../profile/page/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'store',
        loadChildren: () => import('../../../store/page/store/store.module').then( m => m.StorePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationPageRoutingModule {}
