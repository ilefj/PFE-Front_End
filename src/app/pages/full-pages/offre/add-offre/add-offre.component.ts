import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  ErrorMessage: string;
  SalaireEmployer: string = "";
  public domaines: Domaine[] = [];
  public employes: Employe[] = [];

  private tempData = [];
  public rows = [];
  orderForm: FormGroup;
  items: FormArray;
  registerForm = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    reference: new FormControl('', [Validators.required]),
    dateCreation: new FormControl('', [Validators.required]),
    domaineId: new FormControl('', [Validators.required]),
    employe: new FormArray([new FormGroup({
      emp: new FormControl(''),
      Nbre_H_Siege: new FormControl('', [Validators.required]),
      Nbre_H_Site: new FormControl('', [Validators.required]),
    })]),
    produit: new FormArray([new FormGroup({
      nom_Prod: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      prix_Unitaire: new FormControl('', [Validators.required]),
      Quantite: new FormControl('', [Validators.required]),
      marge: new FormControl('', [Validators.required]),
      remise: new FormControl('', [Validators.required]),
    })]),
  });


  constructor(private formBuilder: FormBuilder, private ref: ChangeDetectorRef, private domaineService: DomaineService, private employeService: EmployeeService,
              private offreService: OffreService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getListDomaine();
    this.getListEmploye();

    this.orderForm = this.formBuilder.group({

      items: this.formBuilder.array([this.createItem()])
    });
    console.log(this.orderForm);
  }

  get rf() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
    }
    this.offreService.addOffre(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        console.log(this.registerForm.get('employe').value);
        this.offreService.addOffreEmp( this.registerForm.get('employe').value , res.dateSet).subscribe({
          next:(res2) =>{
            console.log(res2);
            console.log(this.registerForm.get('produit').value)
            this.offreService.addProduit(this.registerForm.get("produit").value ,res.dateSet).subscribe({
              next:(res4)=>{
                console.log(res4);


            this.offreService.addUpdateOffre2(res.dateSet).subscribe({
              next:(res3)=>{
                console.log(res3);

                this.toastr.success(' offre has been added successfully')
                this.router.navigate(['/offres']);
              }
            })
              }}
            )
          }
        })
      }, error: (err) => {
        console.log("erreur", err)

      }

    })

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);
  }

  getListDomaine() {
    console.log("aaa");
    this.domaineService.getAllDomaine().subscribe((data: Domaine[]) => {
      this.domaines = data;
      console.log("work!!!", this.domaines);
    })
  }

  getListEmploye() {
    console.log("aaa");
    this.employeService.getAllEmploye().subscribe((data: Employe[]) => {
      this.employes = data;
      console.log("work!!!", this.employes);
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

  get employe(): FormArray {
    return this.registerForm.get('employe') as FormArray;
  }
  get produit(): FormArray {
    return this.registerForm.get('produit') as FormArray;
  }
  addCretaire(): void {
    this.employe.push(new FormGroup({
      emp: new FormControl(),
      Nbre_H_Siege: new FormControl(),
      Nbre_H_Site: new FormControl(),
    }));
  }
  addProd(): void {
    this.produit.push(new FormGroup({
      nom_Prod: new FormControl(),
      description: new FormControl(),
      Quantite: new FormControl(),
      prix_Unitaire: new FormControl(),
      marge: new FormControl(),
      remise: new FormControl(),
    }));

  }
  DeleteSelectedProd(i: number) {
    this.produit.removeAt(i)

  }
  DeleteSelected(i: number) {
    this.employe.removeAt(i)

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
    console.log(this.employe);

    let employeId =  this.registerForm.controls['employe'].value;
    console.log("Bonjours", employeId)
    this.employeService.GetEmployeById(employeId).subscribe({
      next: (res)=>{
        this.SalaireEmployer = res.salaire;
        console.log('Salaire of this Employee ',res.salaire)

      }
    })
  }

  // sendEmployerId(i : number) {
  //   console.log(this.employe[i].controls.value);
  //   console.log("Bonjours");
  // }
}
