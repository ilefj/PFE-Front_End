import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class User implements CanActivate {


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let userInfo= JSON.parse(localStorage.getItem('userInfo'));
    var Role=userInfo.role;

    if(Role == "User"){
      console.log("ISUser");
      return true;
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Vous n'avez pas le droit d'accès!",
    })
    console.log("is not user ");


    return false;


  }

}


