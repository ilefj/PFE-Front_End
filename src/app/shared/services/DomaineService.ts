import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ResponseModel} from "../Models/ResponseModel";
import {Domaine} from "../Models/domaine";
import {ResponseCode} from "../Enums/ResponseCode";



@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  readonly url = 'https://localhost:7268/api/Domaine';
  constructor(private httpClient: HttpClient) { }

  public addDomaine(nom: string) {
    const body = {
      Nom: nom,
    };
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddDomaine',body , { headers: headers }).pipe(
      map((res)=> {
        console.log(res.responseMessage);
        console.log(body);

      })
    );
  }

  getAllDomaine(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient

      .get<ResponseModel>(this.url + '/GetAllDomaine', { headers: headers })
      .pipe(
        map((res) => {
          let domaineList = new Array<Domaine>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x:Domaine) => {
                domaineList.push(new Domaine(x.id,x.nom,x.offre));
              });
            }
          }
          return domaineList;
        })
      );
  }
  public deletedomaine(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/DeleteDomaine/${id}`,{ headers : headers});
  }
}
