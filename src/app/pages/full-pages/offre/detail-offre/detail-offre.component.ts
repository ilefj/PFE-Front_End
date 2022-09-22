import { Component, OnInit } from '@angular/core';
import {OffreService} from "../../../../shared/services/OffreService";
import {ActivatedRoute, Router} from "@angular/router";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class Offre {
  id: string;
  titre: string;
  reference: string;
  description: string;
  dateCreation: string;
  domaine : Domaine;
  employe : Employe[]

}
class  Domaine {
  id : string;
  nom :string
}
class Employe {
  id: string;
  nom: string
}
@Component({
  selector: 'app-detail-offre',
  templateUrl: './detail-offre.component.html',
  styleUrls: ['./detail-offre.component.scss']
})
export class DetailOffreComponent implements OnInit {
  offreid: any;
  offre: any;
  listEmployees : any ;

  constructor(private offreService: OffreService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.offreid = this.route.snapshot.paramMap.get('id');
    console.log(this.offreid)
    this.getOffre();
    this.listOffreEmplyees();
  }

  getOffre(){
    this.offreService.GetOffreId(this.offreid).subscribe(
      {
        next: (res) => {
          this.offre = res.dateSet;
          console.log("Offre : "+this.offre)
           
        }

      });
  }

  listOffreEmplyees(){
    this.offreService.getOffreEmploesBIdOffre(this.offreid).subscribe({
      next:(res)=>{
        this.listEmployees = res ;
        console.log("Liste Employees : "+this.listEmployees);
      }
    })
  }
  public ClickPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 190;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.offre.titre+'.pdf');
    });
  }
}
