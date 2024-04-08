import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, User, updateProfile } from '@angular/fire/auth';
import { UserAccessData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : Auth) 
  { 
    
  }

  public logIn(userAccessData : UserAccessData)
  {
    return signInWithEmailAndPassword(this.auth, userAccessData.email, userAccessData.password);
  }     

  public register(userAccessData : UserAccessData)
  {
    return createUserWithEmailAndPassword(this.auth, userAccessData.email, userAccessData.password)
  }
  
  public getCurrentUser()
  {
    return this.auth.currentUser;
  }

  public sendEmailVerification()
  {
    return sendEmailVerification(this.auth.currentUser!);
  }

  public signOut()
  {
    return signOut(this.auth);
  }

  public updateUserProfile(user : User, displayName : string, photoURL : string)
  {
    return updateProfile(user,{displayName, photoURL});
  }
}
