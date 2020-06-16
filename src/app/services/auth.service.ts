import { Injectable } from "@angular/core";
import { User } from "../shared/user.interface";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (err) {
      console.log("Error ", err);
    }
  }
  //---
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (err) {
      console.log("Error ", err);
    }
  }
  //---
  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (err) {
      console.log("Error Ususario NO Registrado ", err);
      alert("USUARIO NO REGISTRADO  \nVerifique los datos ingresados");
    }
  }
  //---
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log("LOGOUT");
    } catch (err) {
      console.log("Error ", err);
    }
  }
  //---
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (err) {
      console.log("Error ", err);
    }
  }
  //---
  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (err) {
      console.log("Error ", err);
    }
  }
  //---
  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }
  //---
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };
    return userRef.set(data, { merge: true });
  }
  //---
}
