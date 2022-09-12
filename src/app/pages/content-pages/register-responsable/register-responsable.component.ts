import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { RoleService } from 'app/shared/auth/role.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { Role } from 'app/shared/Models/RoleModel';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

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

      addform = new FormGroup({
        username: new FormControl('',[ Validators.required]),
        prenom: new FormControl('',[ Validators.required]),
        adresse: new FormControl('',[ Validators.required]),
        email: new FormControl('',[ Validators.required, Validators.email]),
        password: new FormControl('',[ Validators.required]),
        nom_Entreprise: new FormControl('',[ Validators.required]),
        telephone: new FormControl('',[ Validators.required]),
        activite_Entreprise: new FormControl('',[ Validators.required]),
        taille_Entreprise: new FormControl('',[ Validators.required]),
        role: new FormControl('',[ Validators.required]),
        code_Fiscale: new FormControl('',[ Validators.required]),

      })


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
          this.router.navigate(['/dashboard']);
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
