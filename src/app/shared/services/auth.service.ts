import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import {NgxUiLoaderService} from 'ngx-ui-loader';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  fruitObject;
  fruitList;
  GetListOfCars;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth,
    public database: AngularFireDatabase, // Inject Firebase auth service
    public router: Router,
    private toastr: ToastrService,
    private ngxLoader: NgxUiLoaderService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
    this.fruitObject = this.database.list('fruit/');


  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    // return this.afAuth.auth.currentUser.sendEmailVerification()
    // .then(() => {
    //   this.router.navigate(['verify-email-address']);
    // })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.toastr.success('Successfully SignOut !!!', 'Success')
      this.router.navigate(['sign-in']);
    })
  }

  AddCarSet(make, speed, size) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    var todays = dd + '/' + mm + '/' + yyyy;

    let ref = this.fruitObject.push({

      Make: make,
      Max_speed: speed,
      Engine_size: size,
      Created_date: todays

    })
    this.toastr.success('Car Added Successfully !!!', 'Success')
    this.router.navigate(['dashboard/car/listing']);
    console.log(ref)


  }
  updateMyCarSet(make, speed, size, key) {
    this.ngxLoader.start();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    var todays = dd + '/' + mm + '/' + yyyy;

    let ref = this.fruitObject.update(key,{
      Make: make,
      Max_speed: speed,
      Engine_size: size,
      Created_date: todays
    })
    this.toastr.success('Car Updated Successfully !!!', 'Success')
    this.ngxLoader.stop();
    this.router.navigate(['dashboard/car/listing']);
    console.log(ref)


  }

  getCarListFromAPI() {
    // this.ListOfCars();
    return this.GetListOfCars
  }


  ListOfCars() {
    this.fruitObject.valueChanges().subscribe((data) => {
      return data
      // console.log(data)
    });
  }

  deleteSth(key) {
    //  this.fruitObject.child('/BFunctions/'+key+'/').remove();
  }

  redirectToDashboard(){
    this.router.navigate(['dashboard']);
  }
  addMyList(){
    this.router.navigate(['dashboard/car/add']);
  }

}
