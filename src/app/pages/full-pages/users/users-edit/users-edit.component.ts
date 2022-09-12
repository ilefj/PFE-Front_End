import { UsersService } from './../../../../shared/auth/users.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'app/shared/Models/UserModel';
import {Role} from "../../../../shared/Models/RoleModel";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RoleService} from "../../../../shared/auth/role.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users-edit.component.scss', '/assets/sass/pages/page-users.scss', '/assets/sass/libs/select.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class UsersEditComponent implements OnInit {
  public user : User ;
  public roles : Role[] = [];
  updateFormSubmitted  : boolean;


  public updateForm = this.formBuilder.group({
    username: ['', Validators.required],
    prenom: ['', Validators.required],
    adresse: ['', Validators.required],
    nom_Entreprise: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    activite_Entreprise: ['', Validators.required],
    taille_Entreprise: ['', Validators.required],
    code_Fiscale: ['', Validators.required],
    role:['', Validators.required],
    password:['']
  });
  idUser : string;

  constructor(private formBuilder: FormBuilder, private router: Router ,
              private userService : UsersService ,private roleService:RoleService,
              private toastr: ToastrService) { }


  getUser(){
    this.user = this.userService.getSelectedUser();
    this.idUser = this.user.id;
    this.updateForm.controls['username'].setValue(this.user.username);
    this.updateForm.controls['prenom'].setValue(this.user.prenom);
    this.updateForm.controls['adresse'].setValue(this.user.adresse);
    this.updateForm.controls['nom_Entreprise'].setValue(this.user.nom_Entreprise);
    this.updateForm.controls['email'].setValue(this.user.email);
    this.updateForm.controls['telephone'].setValue(this.user.telephone);
    this.updateForm.controls['activite_Entreprise'].setValue(this.user.activite_Entreprise);
    this.updateForm.controls['taille_Entreprise'].setValue(this.user.taille_Entreprise);
    this.updateForm.controls['code_Fiscale'].setValue(this.user.code_Fiscale);
    this.updateForm.controls['role'].setValue(this.user.role);
    // this.updateForm.controls['password'].setValue(this.user.password);
  }
  updateUser(){
    this.updateFormSubmitted = true;
    if(this.updateForm.invalid){
      return;
    }
    this.userService.updateUser(this.idUser, this.updateForm.value).subscribe((data) =>{
      console.log("user up to date");
      this.toastr.success(' User has been update successfully')
      this.router.navigate(['/users-list']);
    })
  }
  ngOnInit(): void {
    this.getUser();
    this.getListRoles();
  }
  get rf() {
    return this.updateForm.controls;
  }

  getListRoles(){
    this.roleService.getAllRoles().subscribe((data:Role[])=>{
      this.roles = data;
      console.log("work!!!",this.roles);
    })
  }

}
