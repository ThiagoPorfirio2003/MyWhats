import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDataFormComponent } from './components/access-data-form/access-data-form.component';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: 
  [
    AccessDataFormComponent,
    PersonalDataFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports:
  [
    AccessDataFormComponent,
    PersonalDataFormComponent
  ]
})
export class AuthModule { }