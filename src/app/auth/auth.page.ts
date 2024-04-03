import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { UserAccessDataFormComponent } from './user-access-data-form/user-access-data-form.component';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { magnetSharp, mail, time } from 'ionicons/icons';
import { UserAccessData, UserModel, UserPersonalData } from '../core/models/user.model';
import { MyOutPutData } from '../core/models/outPutInfo.model';
import { FirebaseService } from '../core/services/firebase.service';
import { UserPersonalDataFormComponent } from './user-personal-data-form/user-personal-data-form.component';
import { User } from '@angular/fire/auth';
import { MyMessage } from '../core/models/message.model';
import { UtilsService } from '../core/services/utils.service';
import { IonContent, IonIcon, IonAlert, IonToast, IonLoading } from "@ionic/angular/standalone";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, UserAccessDataFormComponent, 
    RouterLink, UserAccessDataFormComponent, UserPersonalDataFormComponent, IonContent, IonIcon, IonAlert, IonToast, IonLoading]
})
export class AuthPage   
{
  public headerTittle : string;
  public showAccessDataForm : boolean;

  constructor(private utilsServices : UtilsService,
    private firebaseService : FirebaseService) 
  { 
    addIcons({magnetSharp});
    this.headerTittle = 'Log In'
    this.showAccessDataForm = true;
  }

  public async receiveAccessData(userAccessData : MyOutPutData<UserAccessData>)
  {
    let showAlert : boolean;

    showAlert = false;

    if(userAccessData.dataIsValid)
    {
      const loading = await this.utilsServices.getLoadingCtrl('circular');
      const alertMessage : MyMessage = {} as MyMessage;

      await loading.present();

      if(userAccessData.data.isLogin)
      {
        try
        {
          const userCredential = await this.firebaseService.logIn(userAccessData.data);

          const doc = await this.firebaseService.getDocRef('users', userCredential.user.uid);

          if(doc.exists())
          {
            if(userCredential.user.emailVerified)
            {
              alertMessage.header = 'Felicidades';
              alertMessage.content = 'Haz iniciado sesion correctamente';
              showAlert = true;

              const usuario : UserModel = doc.data() as UserModel;
              console.log(usuario);
            }
            else
            {
              alertMessage.header = 'Mail no verificado';
              alertMessage.content = 'Revise su mail en busqueda del correo de verificacion';
              showAlert = true;
            }
          }
          else
          {
            alertMessage.header = 'Registro incompleto';
            alertMessage.content = 'Faltan los datos personales del usuario';

            showAlert = true;
            this.showAccessDataForm = false;
          }
        }
        catch(error : any)
        {          
          showAlert = true;
          alertMessage.header = error.code;
        }
        finally
        {
          if(showAlert)
          {
            this.utilsServices.getAlert(alertMessage)
            .then((myAlert)=>
            {
              loading.dismiss();
              myAlert.present();
            })
          }
          else
          {
            loading.dismiss();
          }
        }
      }
      else
      {
        this.firebaseService.register(userAccessData.data)
        .then(()=>
        {
          loading.dismiss();
          this.utilsServices.showAlert({header:'Completa el registro', content:'Ahora solo fantan tus datos personales'})
          this.showAccessDataForm = false;
        })
        .catch((error)=>this.utilsServices.showAlert({header: error.code}))
      }
    }
    else
    {
      this.utilsServices.showToast(userAccessData.message, 4000, 'bottom');
    }
  }

  public async receivePersonalData(personalDataPackage : MyOutPutData<UserPersonalData>)
  {
    if(personalDataPackage.dataIsValid)
    {
      const loading = await this.utilsServices.getLoadingCtrl('circular');
      
      await loading.present();

      const authUser : User = this.firebaseService.getCurrentUser()!;

      try
      {
        const newUser = await this.saveUserData(personalDataPackage.data, authUser.uid, authUser.email!);

        this.firebaseService.updateUserProfile(authUser, newUser.userName, newUser.image.url);


        this.firebaseService.sendEmailVerification()
        .then(()=>
        {
          loading.dismiss();
          this.utilsServices.showAlert({header:'Registro terminado', content:'Ahora solo falta verificar tu cuenta via tu mail'})
        })

        this.showAccessDataForm = true;
      }
      catch(e : any)
      {
        loading.dismiss();
        this.utilsServices.showAlert(e.code);
      }
    }
    else
    {
      this.utilsServices.showToast(personalDataPackage.message, 4000, 'bottom');
    }
  }


  private saveUserData(userPersonalData : UserPersonalData, uid : string, email : string) : Promise<UserModel>
  {
    const newUser : UserModel = {} as UserModel;

    newUser.image = userPersonalData.image;
    newUser.realName = userPersonalData.realName;
    newUser.surname = userPersonalData.surname;
    newUser.userName = userPersonalData.userName;
    newUser.uid = uid;
    newUser.email = email;

    return this.firebaseService.saveNewUserData(newUser);
  }

    /*
  public async receiveAccessData(userAccessData : MyOutPutData<UserAccessData>)
  {
    if(userAccessData.dataIsValid)
    {
      if(userAccessData.data.isLogin)
      {
        const loading = await this.utilsServices.getLoadingCtrl('circular');
      
        await loading.present();

        this.firebaseService.logIn(userAccessData.data)
        .then((userCredential)=>
        {
          if(userCredential.user.emailVerified)
          {
            this.firebaseService.getDocRef('users', userCredential.user.uid)
            .then((doc)=>
            {
              if(doc.exists())
              {
                this.utilsServices.showAlert({header:'Felicidades', content: 'Haz iniciado sesion correctamente'});
              }
              else
              {
                this.showAccessDataForm = false;
                this.utilsServices.showAlert({header:'Registro incompleto', content: 'Faltan los datos personales del usuario'});
              }
            })
            //Aca deberia poner un error de conexion o algo asi
          }
          else
          {
            this.utilsServices.showAlert({header:'Mail no verificado', content: 'Revise su mail en busqueda del correo de verificacion'});
          }
        })
        .catch((error)=>this.utilsServices.showAlert({header: error.code}))
      }
      else
      {
        this.firebaseService.register(userAccessData.data)
        .then(()=>
        {
          this.showAccessDataForm = false;
        })
        .catch((error)=>this.utilsServices.showAlert({header: error.code}))
      }
    }
    else
    {
      this.utilsServices.showToast(userAccessData.message, 4000, 'bottom');
    }
  }
  */
}
