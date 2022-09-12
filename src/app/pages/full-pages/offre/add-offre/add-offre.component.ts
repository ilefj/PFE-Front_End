import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Domaine} from "../../../../shared/Models/domaine";
import {DomaineService} from "../../../../shared/services/DomaineService";
import {OffreService} from "../../../../shared/services/OffreService";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Employe} from "../../../../shared/Models/Employe";
import {EmployeeService} from "../../../../shared/services/EmployeeService";

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.scss']
})
export class AddOffreComponent implements OnInit {
  registerFormSubmitted = false;
  ErrorMessage : string ;
  SalaireEmployer : string = "" ;
  public domaines: Domaine[] = [];
  public employes: Employe[] = [];
  private tempData = [];
  public rows = [];
  orderForm: FormGroup;
  items: FormArray;
  public registerForm = this.formBuilder.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    reference: ['', Validators.required],
    dateCreation: ['', Validators.required],
    domaineId:['', Validators.required],
    Employe:['', Validators.required],

  });

  constructor(private formBuilder: FormBuilder,private ref: ChangeDetectorRef,private domaineService : DomaineService,private employeService : EmployeeService,
              private offreService: OffreService,private  toastr:ToastrService,private router:Router) { }
  ngOnInit(): void {
    this.getListDomaine();
    this.getListEmploye();

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
    this.offreService.addOffre(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastr.success(' offre has been added successfully')
        this.router.navigate(['/offres']);
      }, error: (err)=>{
        console.log("erreur", err)

      }

    })

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);
  }

  getListDomaine(){
    console.log("aaa");
    this.domaineService.getAllDomaine().subscribe((data:Domaine[])=>{
      this.domaines = data;
      console.log("work!!!",this.domaines);
    })
  }
  getListEmploye(){
    console.log("aaa");
    this.employeService.getAllEmploye().subscribe((data:Employe[])=>{
      this.employes = data;
      console.log("work!!!",this.employes);
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

  // Au clic de l'utilisateur sur le bouton "X" pour supprimer une ligne
  deleteItemLine(e, i): void {
    e.preventDefault();
    this.items = this.orderForm.get('items') as FormArray;
    console.log(this.items);
    this.items.removeAt(i);
  }

  // A la soumission du formulaire
  submitForm(formdata) {
    //event.preventDefault();
    console.log(formdata);
    alert(
      "MESSAGE : Ouvrez la console du navigateur pour voir l'objet orderForm"
    );
  }

  /************************************************/
  // Fonction utilitaire pour afficher le prix total
  getTotalPrice() {
    this.items = this.orderForm.get('items') as FormArray;
    let items = this.items.value;
    let total = 0;
    for (let item of items) {
      total += parseFloat(item.price);
    }
    if (!isNaN(total)) {
      return total.toFixed(2);
    }
  }



  sendEmployerId() {
   let employeId =  this.registerForm.controls['Employe'].value;
    console.log("Bonjours", employeId)
this.employeService.GetEmployeById(employeId).subscribe({
  next: (res)=>{
    this.SalaireEmployer = res.salaire;
    console.log('Salaire of this Employee ',res.salaire)

  }
})
  }
}
