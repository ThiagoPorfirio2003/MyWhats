import { Routes } from '@angular/router';
import { AuthPage } from './auth.page';


export const AUTH_ROUTES: Routes = 
[
  { path: '',component:AuthPage, children:
    [
      { path: 'a', loadComponent: () => import('./user-access-data-form/user-access-data-form.component').then(c => c.UserAccessDataFormComponent) },
    ]
  },  
];