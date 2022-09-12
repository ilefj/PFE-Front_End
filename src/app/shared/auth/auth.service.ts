import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseModel } from '../Models/ResponseModel';
import { User } from '../Models/UserModel';
import {ToastrService} from "ngx-toastr";
import { Console } from 'console';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class AuthService {

   readonly url = 'https://localhost:7268/api/User';

   user : User ;
   logedUser : User;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(public router: Router , private httpClient: HttpClient, private  toastr: ToastrService) {

  }

  /* fonction signupUser pour ajouter un nouveau */
  signupUser(form : any) {

console.log(form.nom_Entreprise);

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddNewUser',form).pipe(
      map((res)=> {
        console.log("res"+res);

       // this.toastr.error(res.dateSet.toString())
        return res ;
      }
      )
    );

  }
  getRole(){
    let roleUser = JSON.parse(localStorage.getItem('userInfo.role'));
    return roleUser;
  }

  signinUser(email: string, password: string) {
    const body = {
      Email:email ,
      Password: password,
    };
    return this.httpClient.post<ResponseModel>(this.url + '/Login', body).pipe(
      map((res) => {
        if (res.responseCode == 1) {
         // console.log(res);
         // this.toastr.error(res[0]);
          if (res.dateSet) {
            this.logedUser = res.dateSet;
          }
        }
        return res;
      })
    );

    //uncomment above firebase auth code and remove this temp code
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(true);
      }, 1000);
    });

  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  logout() {
    this.router.navigate(['YOUR_LOGOUT_URL']);
  }

  isAuthenticated() {
    return true;
  }
}
