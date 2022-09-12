import { Component, OnInit } from '@angular/core';
import {User} from "../../../../shared/Models/UserModel";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../../../../shared/services/EmployeeService";

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.scss']
})
export class EditEmployeComponent implements OnInit {
  public employe : any ;
  public users :User[] = [];
  nrSelect = '';
  public columns = [
    { name: "nCin", prop: "NCin" },
    { name: "nom", prop: "Nom" },
    { name: "prenom", prop: "Prenom" },
    { name: "poste", prop: "Poste" },
    { name: "matricule", prop: "Matricule" },
    { name: "email", prop: "email" },
    { name: "adresse", prop: "Adresse" },
    { name: "tel", prop: "Tel" },
    { name: "salaire", prop: "salaire" },
    { name: "Actions", prop: "id" },
  ];
  updateFormSubmitted  : boolean;
  public updateForm = this.formBuilder.group({
    nCin: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    poste: ['', Validators.required],
    matricule:['', Validators.required],
    email:['', Validators.required],
    adresse:['', Validators.required],
    tel:['', Validators.required],
    salaire:['', Validators.required], });
    id : string;
  constructor(private formBuilder: FormBuilder, private router: Router , private employeService : EmployeeService,
              private toastr: ToastrService) { }
  selectedTeam = '';
  onSelected():void {
  //  this.selectedTeam = this.offre.domaine.nom.value;

  }
  ngOnInit(): void {
    this.getEmploye();

  }
  updateEmploye(){
    this.updateFormSubmitted = true;
    if(this.updateForm.invalid){
      return;
      console.log("aaa")
    }
    console.log(this.updateForm.getRawValue())
    this.employeService.updateEmploye(this.id, this.updateForm.value).subscribe((data) =>{
      console.log("employee up to date");
      this.toastr.success(' employe has been update successfully')
      this.router.navigate(['/Employes']);
    })
  }
  getEmploye(){
    this.employe = this.employeService.getSelectedEmploye();
    this.id = this.employe.id;

    console.log("This id ",this.employe.id)
    this.updateForm.controls['nCin'].setValue(this.employe.nCin);
    this.updateForm.controls['nom'].setValue(this.employe.nom);
    this.updateForm.controls['prenom'].setValue(this.employe.prenom);
    this.updateForm.controls['poste'].setValue(this.employe.poste);
    this.updateForm.controls['matricule'].setValue(this.employe.matricule);
    this.updateForm.controls['email'].setValue(this.employe.email);
    this.updateForm.controls['adresse'].setValue(this.employe.adresse);
    this.updateForm.controls['tel'].setValue(this.employe.tel);
    this.updateForm.controls['salaire'].setValue(this.employe.salaire);
    console.log(this.employe.email)
    console.log(this.employe.adresse)
    console.log(this.employe.tel)


    //this.updateForm.controls['user'].setValue(this.offre.user);
  }
  get rf() {
    return this.updateForm.controls;
  }
}
