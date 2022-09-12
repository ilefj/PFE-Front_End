import { Component, OnInit } from '@angular/core';
import {User} from "../../../../shared/Models/UserModel";
import {Offre} from "../../../../shared/Models/Offre";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {OffreService} from "../../../../shared/services/OffreService";
import {Domaine} from "../../../../shared/Models/domaine";
import {DomaineService} from "../../../../shared/services/DomaineService";
import {json} from "ngx-custom-validators/src/app/json/validator";

@Component({
  selector: 'app-edit-offre',
  templateUrl: './edit-offre.component.html',
  styleUrls: ['./edit-offre.component.scss']
})
export class EditOffreComponent implements OnInit {
  public offre : any ;
  public users :User[] = [];
  public domaines : Domaine[] = [];
  nrSelect = '';
  public columns = [
    { name: "titre", prop: "titre" },
    { name: "description", prop: "description" },
    { name: "Reference", prop: "Reference" },
    { name: "dateCreation", prop: "dateCreation" },
    { name: "domaine", prop: "domaine" },
    { name: "Actions", prop: "id" },
  ];
  updateFormSubmitted  : boolean;
  public updateForm = this.formBuilder.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    reference: ['', Validators.required],
    dateCreation: ['', Validators.required],
    domaineId:['', Validators.required],
      });
  idOffre : string;

  constructor(private formBuilder: FormBuilder, private router: Router , private offreService : OffreService,
              private toastr: ToastrService,private domaineService:DomaineService) { }

  selectedTeam = '';
  onSelected():void {
    this.selectedTeam = this.offre.domaine.nom.value;

  }
  ngOnInit(): void {
    this.getOffre();
    this.getListDomaine();
  }
  UpdateOffre(){
    this.updateFormSubmitted = true;
    if(this.updateForm.invalid){
      return;
      console.log("aaa")
    }
    console.log(this.updateForm.getRawValue())
    this.offreService.updateOffre(this.idOffre, this.updateForm.value).subscribe((data) =>{
      console.log("offre up to date");
      this.toastr.success(' offre has been update successfully')
      this.router.navigate(['/offres']);
    })
  }
  getOffre(){
    this.offre = this.offreService.getSelectedOffre();
    this.idOffre = this.offre.id;
    console.log("This id ",this.offre.id)
    this.updateForm.controls['titre'].setValue(this.offre.titre);
    this.updateForm.controls['description'].setValue(this.offre.description);
    this.updateForm.controls['reference'].setValue(this.offre.reference);
    this.updateForm.controls['dateCreation'].setValue(this.offre.dateCreation);
    //this.updateForm.controls['user'].setValue(this.offre.user);
    this.updateForm.controls['domaineId'].setValue(this.offre.domaineId);
  }
  get rf() {
    return this.updateForm.controls;
  }
  getListDomaine(){
    this.domaineService.getAllDomaine().subscribe((data:Domaine[])=>{
      this.domaines = data;
      console.log("work!!!",this.domaines);
    })
  }

}
