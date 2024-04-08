import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryPageRoutingModule } from './entry-routing.module';

import { EntryPage } from './entry.page';
import { AuthModule } from '../../auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryPageRoutingModule,
    AuthModule
  ],
  declarations: [EntryPage]
})
export class EntryPageModule {}
