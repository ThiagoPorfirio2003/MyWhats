import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { addIcons } from 'ionicons';
import { magnetSharp } from 'ionicons/icons';
import { MyFormResponse } from 'src/app/core/models/form.model';
import { MyStatus } from 'src/app/core/models/status.model';
import { UserAccessData, UserModel, UserPersonalData } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { DatabaseService } from 'src/app/core/services/database.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage{

  public headerTittle : string;
  public showAccessDataForm : boolean;

  constructor(private utilsServices : UtilsService,
    private authService : AuthService,
    private databaseService : DatabaseService) 
  { 
    addIcons({magnetSharp});
    this.headerTittle = 'Log In'
    this.showAccessDataForm = true;
  }

  public async receiveAccessData(userAccessData : MyFormResponse<UserAccessData>)
  {
    let showAlert : boolean;

    showAlert = true;

    if(userAccessData.status.success)
    {
      const loading = await this.utilsServices.getLoadingCtrl('circular');
      const alertMessage : MyStatus = {};

      await loading.present();

      if(userAccessData.data.isLogin)
      {
        try
        {
          const userCredential = await this.authService.logIn(userAccessData.data);

          const doc = await this.databaseService.getDocRef('users', userCredential.user.uid);

          if(doc.exists())
          {
            if(userCredential.user.emailVerified)
            {
              showAlert = false;
              this.authService.logMyUser(doc.data() as UserModel);
              this.utilsServices.changeRoute('/navigation');
            }
            else
            {
              alertMessage.header = 'Mail no verificado';
              alertMessage.message = 'Revise su mail en busqueda del correo de verificacion';
            }
          }
          else
          {
            alertMessage.header = 'Registro incompleto';
            alertMessage.message = 'Faltan los datos personales del usuario';
            this.showAccessDataForm = false;
          }
        }
        catch(error : any)
        {          
          alertMessage.header = error.code;
        }
        finally
        {
          if(showAlert)
          {
            this.utilsServices.getAlert({header: alertMessage.header, message: alertMessage.message, buttons:['ok']})
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
        this.authService.register(userAccessData.data)
        .then(()=>
        {
          loading.dismiss();
          this.utilsServices.showAlert({header:'Completa el registro', message:'Ahora solo fantan tus datos personales',buttons:['ok']})
          this.showAccessDataForm = false;
        })
        .catch((error)=>this.utilsServices.showAlert({header: error.code}))
      }
    }
    else
    {  
      this.utilsServices.showToast({header: userAccessData.status.header, message: userAccessData.status.message, position: 'bottom',duration: 4000});
    }
  }

  public async receivePersonalData(formResponse : MyFormResponse<UserPersonalData>)
  {
    if(formResponse.status.success)
    {
      const loading = await this.utilsServices.getLoadingCtrl('circular');
      
      await loading.present();

      const authUser : User = this.authService.getAuthUser()!;

      try
      {
        const newUser = await this.saveUserData(formResponse.data, authUser.uid, authUser.email!);

        this.authService.updateUserProfile(authUser, newUser.userName, newUser.image.url);

        await this.authService.sendEmailVerification()

        loading.dismiss();
        this.utilsServices.showAlert({header:'Registro terminado', message:'Ahora solo falta verificar tu cuenta via tu mail'})
        
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
      this.utilsServices.showToast({header: formResponse.status.header, message: formResponse.status.message, position: 'bottom', duration: 4000});
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

    return this.databaseService.saveNewUserData(newUser);
  }
}
