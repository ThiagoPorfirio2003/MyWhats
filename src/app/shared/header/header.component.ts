import { IonTitle, IonHeader, IonToolbar, } from "@ionic/angular/standalone";
import { Component, Input } from '@angular/core';
import {magnetSharp} from 'ionicons/icons/index'
import { addIcons } from "ionicons";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ IonToolbar, IonHeader, IonTitle]
})
export class HeaderComponent  {

  @Input() title! : string;

  constructor() 
  { 
    addIcons({magnetSharp})
  }

}
