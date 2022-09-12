import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomaineService} from "../../../../shared/services/DomaineService";
import {OffreService} from "../../../../shared/services/OffreService";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {EmployeeService} from "../../../../shared/services/EmployeeService";

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit {
  registerFormSubmitted = false;
  ErrorMessage : string ;
  private tempData = [];
  public rows = [];
  orderForm: FormGroup;
  items: FormArray;
  public registerForm = this.formBuilder.group({
    nCin: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    poste: ['', Validators.required],
    matricule:['', Validators.required],
    email:['', Validators.required,Validators.email],
    adresse:['', Validators.required],
    tel:['', Validators.required],
    salaire:['', Validators.required],

  });
  constructor(private formBuilder: FormBuilder,private ref: ChangeDetectorRef,
              private employeeService : EmployeeService,private  toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({

      items: this.formBuilder.array([this.createItem()]) });
    console.log(this.orderForm);
  }
  get rf() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return ;
    }
    this.employeeService.addEmploye(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastr.success(' employe has been added successfully')
        this.router.navigate(['/Employes']);
      }, error: (err)=>{
        console.log("erreur", err)

      }

    })

  }
  // Permet de récupérer formData dans la vue qui est une instance de FormArray
  get formData() {
    return <FormArray>this.orderForm.get('items');
  }

  // Permet de créer un reactiveForm à la volée
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',

    });
  }

  // Au clic de l'utilisateur sur le bouton "Ajouter une ligne"
  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

}
