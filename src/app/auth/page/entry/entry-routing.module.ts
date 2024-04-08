import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryPage } from './entry.page';
import { AccessDataFormComponent } from '../../components/access-data-form/access-data-form.component';
import { PersonalDataFormComponent } from '../../components/personal-data-form/personal-data-form.component';

const routes: Routes = [
  {
    path: '', component: EntryPage,
    /*
    children:
    [
      { path: 'login', component: AccessDataFormComponent},
      { path: 'register', component: PersonalDataFormComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full'},
    ]
    */
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryPageRoutingModule {}
