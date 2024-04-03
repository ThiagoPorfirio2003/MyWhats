import { Injectable, inject } from '@angular/core';
import { setDoc, doc, Firestore, getDoc, collection, runTransaction, query, getDocs, limit, where } 
from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, updateProfile, User, UserCredential, 
signInWithEmailAndPassword, 
sendEmailVerification,
signOut} from '@angular/fire/auth';
import { UserAccessData, UserModel } from '../models/user.model';
import { CollectionName } from '../myTypes/collectionsNames';
import { MyMessage } from '../models/message.model';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  
  private auth : Auth;
  public firestore : Firestore;

  private readonly DEFAULT_USER_IMAGE_URL : string = `https://firebasestorage.googleapis.com/v0/b/mymag-dac6f.appspot.com/o/images%2Fusers%2Fdefault.png?alt=media&token=45927b60-3dd3-4be4-80f2-e6cafe8573a9`
  private readonly DEFAULT_USER_IMAGE_PATH : string = '/images/users/default.png';

  public readonly USERS_COLLECTION_NAME : string = 'users';
  public readonly UNIQUE_USER_NAMES_COLLETION_NAME : string = 'uniqueUserNames';

  constructor() 
  { 
    this.auth = inject(Auth); 
    this.firestore = inject(Firestore);
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

  public getDocRef(collectionName : CollectionName, idDoc : string)
  {
    return getDoc(doc(this.firestore, collectionName, idDoc));
  }

    /*
  public saveData(collectionName : CollectionName, data : any, id? : string)
  {
    
    let docRef;

    if(id)
    {
      //docRef = doc(this.firestore, `${collectionName}/${id}`);
      docRef = doc(this.firestore, collectionName, id);
    }
    else
    {
      docRef = doc(this.firestore, collectionName)
      data.id = docRef.id
    }

    return setDoc(docRef, data);
  }
  */
  
  public async saveNewUserData(newUser : UserModel) : Promise<UserModel>
  {
    let error : unknown;
    if(newUser.image.path == '' || newUser.image.url == '')
    {
      newUser.image.path = this.DEFAULT_USER_IMAGE_PATH;
      newUser.image.url = this.DEFAULT_USER_IMAGE_URL;
    }

    try
    {
      await this.saveNewUser(newUser);
    }
    catch(e)
    {
      error = e;  
    }

    return new Promise((resolve, reject)=>
    {
      if(error)
      {
        reject(error as MyMessage)
      }
      else
      {
        resolve(newUser);
      }
    });
  }
  

  private async saveNewUser(newUser : UserModel)
  {
    try 
    {
      await runTransaction(this.firestore, async (transaction) => 
      {
        const docUserNameRef = doc(this.firestore, this.UNIQUE_USER_NAMES_COLLETION_NAME + `/${newUser.userName}`);
        const docUserNameSnap =  await transaction.get(docUserNameRef)
        
        if(docUserNameSnap.exists()) 
        {
          const messageError : MyMessage = {header: 'Nombre ya usado', content: 'Eliga otro nombre de usuario'}
          throw messageError;
        } 
        else 
        {
          transaction.set(docUserNameRef, {used : true});
          transaction.set(doc(this.firestore,this.USERS_COLLECTION_NAME, newUser.uid), newUser);
        }
      });      
    } 
    catch (e) 
    {
      throw e;
    }
  }
}