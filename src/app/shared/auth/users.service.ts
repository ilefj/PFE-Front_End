import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { User } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly url = 'https://localhost:7268/api/User';
  user : User ;

  constructor(public router: Router , private httpClient: HttpClient) { }

  public getAllUsers() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + '/GetAllUsers', { headers: headers })
      .pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: User) => {
                userList.push(
                  new User(x.id,x.username, x.prenom,x.adresse, x.nom_Entreprise, x.email,x.telephone,x.activite_Entreprise,x.taille_Entreprise,x.code_Fiscale,x.role)
                );           });
            }
          }
          return userList;
        })
      );
  }

  public getUserById(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + `/GetUserById/${id}`, { headers: headers })
      .pipe(
        map((res) => {
          if (res.responseCode == ResponseCode.OK) {
            console.log(res);
            if (res.dateSet) {
              this.user = res.dateSet;
            }
          }
          return this.user;
        })
      );
  }

  public getSelectedUser(){
    return this.user;
  }

  public deleteUser(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/DeleteUser/${id}`,{ headers : headers});
  }

  public updateUser(id: string,form:any){
    const body = {
      UserName: form.username,
      Prenom: form.prenom,
      Adresse: form.adresse,
      Nom_Entreprise:form.nom_Entreprise,
      Email: form.email,
      Telephone: form.telephone,
      Activite_Entreprise:form.activite_Entreprise,
      Taille_Entreprise:form.taille_Entreprise,
      Code_Fiscale:form.code_Fiscale,
      Role: form.Role,
      Password: '',
    };
    console.log(body);
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.put<ResponseModel>(this.url+`/UpdateUser/${id}`,body,{headers : headers});
  }
}
