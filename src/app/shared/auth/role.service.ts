import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { Role } from '../Models/RoleModel';
import { User } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  readonly url = 'https://localhost:7268/api/Role';
  constructor(private httpClient: HttpClient) { }

  public addRole(role: string) {
    const body = {
      Role: role,
    };
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddRole',body , { headers: headers }).pipe(
      map((res)=> {
        console.log(res.responseMessage);
      })
    );
  }

  public getAllRoles() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + '/GetAllRoles', { headers: headers })
      .pipe(
        map((res) => {
          let roleList = new Array<Role>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x:string) => {
                roleList.push(new Role(x));
              });
            }
          }
          return roleList;
        })
      );
  }

  public getUsersByRole(name : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + `/GetUsersByRole/${name}`, { headers: headers }).pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: User) => {
                userList.push(
                  new User(x.id,x.username, x.prenom,x.adresse, x.nom_Entreprise, x.email,x.telephone,x.activite_Entreprise,x.taille_Entreprise,x.code_Fiscale,x.role )
                );
              });
            }
          }
          return userList;
        })
      );
  }

  public removeUserFromRole(id : string , nameRole : string){
    const body = {
      iduser : id,
      roleName: nameRole,
    };
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/RemoveRoleFromRole`,{headers:headers});
  }

  public addUserToRole(id : string , nameRole : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .post<ResponseModel>(this.url + `/AddUserToRole/${id}+${nameRole}`, { headers: headers }).pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: User) => {
                userList.push(
                  new User(x.id,x.username, x.prenom,x.adresse, x.nom_Entreprise, x.email,x.telephone,x.activite_Entreprise,x.taille_Entreprise,x.code_Fiscale,x.role )
                );
              });
            }
          }
          return userList;
        })
      );
  }

  public deleteRole(name : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/DeleteRole/${name}`,{ headers : headers});
  }

}
