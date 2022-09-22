import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { RoleService } from 'app/shared/auth/role.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { Role } from 'app/shared/Models/RoleModel';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {CustomValidators} from "ngx-custom-validators";
import {ConfirmPasswordValidator} from "./confirm-password.validator";

@Component({
  selector: 'app-register-responsable',
  templateUrl: './register-responsable.component.html',
  styleUrls: ['./register-responsable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterResponsableComponent implements OnInit, AfterViewInit  {

    registerFormSubmitted = false;
    ErrorMessage : string ;
    public roles : Role[] = [];


        public addform = this.formBuilder.group({
          username: ['', Validators.required],
          prenom: ['', Validators.required],
          adresse:['',Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          nom_Entreprise: ['', Validators.required],
          telephone: ['', Validators.required],
          activite_Entreprise: new FormControl('',[ Validators.required]),
          taille_Entreprise:['',Validators.required],
          role:['Responsable_Entreprise'],
          code_Fiscale: ['', Validators.required],
        },{
          validator: MustMatch('password', 'confirmPassword')
        });

    constructor(private ref: ChangeDetectorRef,private formBuilder: FormBuilder, private router: Router , private authService: AuthService ,
                private roleService:RoleService, private toastr: ToastrService) { }


    ngOnInit(): void {
      this.getListRoles();
    }
    getListRoles(){
      this.roleService.getAllRoles().subscribe((data:Role[])=>{
        this.roles = data;
        console.log("work!!!",this.roles);
      })
    }
    get rf() {
      return this.addform.controls;
    }
    submit() {
       console.log("Ajouter");
      this.registerFormSubmitted = true;
      if (this.addform.invalid) {
        console.log(this.addform.getRawValue());
        console.log("erreur");
        return ;

      }
     console.log("get row");
     console.log(this.addform.getRawValue());




      const res = this.authService.signupUser(this.addform.value) as Observable<any>;
      res.subscribe((data) => {
        if(data.responseCode == 1){
          console.log("result"+data);
          console.log("response code ok");
          this.addform.reset();
          this.toastr.success(' User has been added successfully')
          this.router.navigate(['/login']);
        }else{
          this.ErrorMessage = data.responseMessage ;
          if(data.dateSet == null){
            this.toastr.error(data.responseMessage)
          }
          else  {
            this.toastr.error(data.dateSet.toString())
          }
        }
      });
    }
    ngAfterViewInit() {
      setTimeout(() => {
        this.ref.detectChanges();
      }, 100);
    }
  }
