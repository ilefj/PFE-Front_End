import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  readonly url = 'https://localhost:7268/api/Offre';
  constructor(private httpClient: HttpClient) { }


  getAllOffre() {

  }
}
