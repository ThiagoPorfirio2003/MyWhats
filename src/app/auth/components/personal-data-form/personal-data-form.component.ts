import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';
import { MyOutPutData } from 'src/app/core/models/outPutInfo.model';
import { UserPersonalData } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
})
export class PersonalDataFormComponent {

  public userPersonalDataForm : FormGroup;
  @Output() submitDataEvetEmiter : EventEmitter<MyOutPutData<UserPersonalData>>;

  constructor() 
  { 
    addIcons({saveOutline});

    this.submitDataEvetEmiter = new EventEmitter<MyOutPutData<UserPersonalData>>();

    this.userPersonalDataForm = inject(FormBuilder).group({
      realName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern("[a-zA-Z ]*"), this.hayEspacioInicial]],
      surname: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern("[a-zA-Z ]*"), this.hayEspacioInicial]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9_]*$")]]
    })
  }
  
  private hayEspacioInicial(control: AbstractControl) : null | object
  {
    const valor = <string>control.value;

    if(valor[0] === ' ')
    {
      return {hayEspacioInicial : true};
    }
    else
    {
      return null
    }
  }

  public submitData()
  {
    let myUserFormData : MyOutPutData<UserPersonalData> = {} as MyOutPutData<UserPersonalData>;

    myUserFormData.dataIsValid = this.userPersonalDataForm.valid;
    myUserFormData.data = this.userPersonalDataForm.value;
    myUserFormData.data.image = {path:'', url:''};

    if(myUserFormData.dataIsValid)
    {
      myUserFormData.message = {header: 'EXITO', content: 'Los datos ingresados cumplen con las condiciones'};
    }
    else
    {
      myUserFormData.message = {header: 'DATOS INVALIDOS', content: 'Los datos ingresados NO cumplen con las condiciones'};
    }

    this.submitDataEvetEmiter.emit(myUserFormData)
  }
}
