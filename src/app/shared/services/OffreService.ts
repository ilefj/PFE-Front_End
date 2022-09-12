import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ResponseModel} from "../Models/ResponseModel";
import {ResponseCode} from "../Enums/ResponseCode";
import {Offre} from "../Models/Offre";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class OffreService {

  readonly url = 'https://localhost:7268/api/Offre';
  offre : Offre;

  constructor(public router: Router , private httpClient: HttpClient) { }
  public getSelectedOffre(){
    return this.offre;
  }
  addOffre(form : any) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const body = {
      titre: form.titre,
      description: form.description,
      reference: form.reference,
      dateCreation:form.dateCreation,
      UserId:userInfo.id,
      domaineId:form.domaineId,
      Employe:form.Employe,

    };
    console.log("Body Services",body);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>( 'https://localhost:7268/api/Offre/AddOffre',body).pipe(
      map((res)=> {
          return res ;
        }
      )
    );
  }
   GetAllOffres(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url+`/GetAllOffres` , { headers: headers })
      .pipe(
        map((res) => {
          let offreList = new Array<Offre>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: Offre) => {
                offreList.push(
                  new Offre( x.id , x.titre , x.description , x.reference , x.dateCreation ,x.domaineId,x.Employe,x.UserId)
                );
              });
            }
          }
          return offreList;
        })
      );
  }
  public updateOffre(id: string,form:any){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const body = {
      titre: form.titre,
      description: form.description,
      reference: form.reference,
      dateCreation:form.dateCreation,
      UserId:userInfo.id,
      domaineId:form.domaineId,
      Employe:form.Employe
    };
    console.log(form.domaineId);
    console.log(body);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.put<ResponseModel>(this.url+`/UpdateOffre/${id}`,body,{headers : headers});
  }
  public deleteOffre(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/Deleteoffre/${id}`,{ headers : headers});
  }
  public GetOffreById(id : string) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + `/GetOffreById/${id}`, {headers: headers})
      .pipe(
        map((res) => {
          if (res.responseCode == ResponseCode.OK) {
            console.log(res);
            if (res.dateSet) {
              this.offre = new Offre(res.dateSet.id, res.dateSet.titre, res.dateSet.description, res.dateSet.reference,res.dateSet.dateCreation, res.dateSet.domaine.id,res.dateSet.Employe.id,res.dateSet.User);
            }
            console.log(this.offre);
          }
          return this.offre;
        })
      );
  }
  GetOffreId (id: string)  {
    return this.httpClient.get(this.url + `/GetById/${id}`);
  }
  GetOffreByIdUser(id : string) {
    return this.httpClient
      .get<ResponseModel>(this.url + `/GetOffreByIdUser/${id}`).pipe(
        map((res) => {
          let offreList = new Array<Offre>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: Offre) => {
                offreList.push(
                  new Offre(x.id,x.titre,x.description,x.reference,x.dateCreation,x.domaineId,x.Employe,x.UserId)
                );
              });
            }
          }
          return offreList;
        })
      );

  }
}
