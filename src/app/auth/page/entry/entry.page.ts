import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { addIcons } from 'ionicons';
import { magnetSharp } from 'ionicons/icons';
import { MyMessage } from 'src/app/core/models/message.model';
import { MyOutPutData } from 'src/app/core/models/outPutInfo.model';
import { UserAccessData, UserModel, UserPersonalData } from 'src/app/core/models/user.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage{

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

        await this.firebaseService.sendEmailVerification()

        loading.dismiss();
        this.utilsServices.showAlert({header:'Registro terminado', content:'Ahora solo falta verificar tu cuenta via tu mail'})
        
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
      this.utilsServices.showToast(personalDataPackage.message, 4000, 'bottom', 'toast-custom-class');
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
}
