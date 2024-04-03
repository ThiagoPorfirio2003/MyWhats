import { Routes } from '@angular/router';

export const routes: Routes = 
[
  //{ path:'', loadChildren: ()=> import('./auth/auth.routes').then(c=>c.AUTH_ROUTES)},
  { path: '', loadComponent: ()=> import('./auth/auth.page').then(p => p.AuthPage)}
];
