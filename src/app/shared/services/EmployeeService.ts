import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ResponseModel} from "../Models/ResponseModel";
import {Employe} from "../Models/Employe";
import {ResponseCode} from "../Enums/ResponseCode";
import {Router} from "@angular/router";
import {Domaine} from "../Models/domaine";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly url = 'https://localhost:7268/api/Employee';
  employe : Employe;
  constructor(public router: Router , private httpClient: HttpClient) { }
  public getSelectedEmploye(){
    return this.employe;
  }
  GetEmployeeByIdUser(id : string) {
    return this.httpClient
      .get<ResponseModel>(this.url + `/GetEmployeeByIdUser/${id}`).pipe(
        map((res) => {
          let employeList = new Array<Employe>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              // console.table(res.dateSet);
              res.dateSet.map((x: Employe) => {
                employeList.push(
                  new Employe(x.id,x.nCin,x.nom,x.prenom,x.poste,x.matricule,x.email,x.adresse,x.tel,x.salaire,x.userId)
                );
              });
            }
          }
          console.table(res.dateSet);

          return employeList;
        })
      );

  }
  public GetEmployeById(id : string) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + `/GetEmployeById/${id}`, {headers: headers})
      .pipe(
        map((res) => {
          if (res.responseCode == ResponseCode.OK) {
            console.log(res);
            if (res.dateSet) {
              this.employe = new Employe(res.dateSet.id, res.dateSet.nCin, res.dateSet.nom, res.dateSet.prenom,res.dateSet.poste, res.dateSet.matricule, res.dateSet.email, res.dateSet.adresse, res.dateSet.tel, res.dateSet.salaire,res.dateSet.User);
            }
            console.log(this.employe);


          }
          return this.employe;
        })
      );
  }
  addEmploye(form : any) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const body = {
      nCin: form.nCin,
      nom: form.nom,
      prenom: form.prenom,
      poste:form.poste,
      matricule:form.matricule,
      email:form.email,
      adresse:form.adresse,
      tel:form.tel,
      salaire:form.salaire,
      UserId:userInfo.id,
    };
    console.log("Body Services",body);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>( 'https://localhost:7268/api/Employee/AddEmployee',body).pipe(
      map((res)=> {
          return res ;
        }
      )
    );
  }
  public updateEmploye(id: string,form:any){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const body = {
      nCin: form.nCin,
      nom: form.nom,
      prenom: form.prenom,
      poste:form.poste,
      matricule:form.matricule,
      email:form.email,
      adresse:form.adresse,
      tel:form.tel,
      salaire:form.salaire,
      UserId:userInfo.id,
    };
    console.log(form.adresse);
    console.log(form.tel);

    console.log(body);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.put<ResponseModel>(this.url+`/UpdateEmployee/${id}`,body,{headers : headers});
  }
  public deleteEmploye(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/DeleteEmployee/${id}`,{ headers : headers});
  }
  getAllEmploye(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient

      .get<ResponseModel>(this.url + '/GetAllEmployee', { headers: headers })
      .pipe(
        map((res) => {
          let employeList = new Array<Employe>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x:Employe) => {
                employeList.push(new Employe(x.id,x.nCin,x.nom,x.prenom,x.poste,x.matricule,x.email,x.adresse,x.tel,x.salaire,x.userId));
              });
            }
          }
          return employeList;
        })
      );
  }

}
