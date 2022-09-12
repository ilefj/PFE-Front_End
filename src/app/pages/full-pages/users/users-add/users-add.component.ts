import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { RoleService } from 'app/shared/auth/role.service';
import { Role } from 'app/shared/Models/RoleModel';
import { Observable } from 'rxjs';
import {MustMatch} from "../../../../shared/directives/must-match.validator";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss' , '/assets/sass/pages/page-users.scss', '/assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersAddComponent implements OnInit {

  registerFormSubmitted = false;
  ErrorMessage : string ;
  public roles : Role[] = [];

  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    adresse: ['', Validators.required],
    role:['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  },{
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(private formBuilder: FormBuilder, private router: Router , private authService: AuthService ,
              private roleService:RoleService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListRoles();
  }

  get rf() {
    return this.registerForm.controls;
  }

  //  On submit click, reset field value
  onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return ;
    }

    console.log(this.registerForm.controls["fullName"].value);

    let fullName = this.registerForm.controls["fullName"].value;
    let userName = this.registerForm.controls["userName"].value;
    let email = this.registerForm.controls["email"].value;
    let adresse = this.registerForm.controls["adresse"].value;
    let phoneNumber = this.registerForm.controls["phoneNumber"].value;
    let role = this.registerForm.controls["role"].value;
    let password = this.registerForm.controls["password"].value;

    console.log("work!!!!");
    const res = this.authService.signupUser(this.registerForm.value) as Observable<any>;
    res.subscribe((data) => {
      if(data.responseCode == 1){
       // console.log("result"+data);
       // console.log("response code ok");
        this.registerForm.reset();
        this.toastr.success(' User has been added successfully')
        this.router.navigate(['/users-list']);
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
  getListRoles(){
    this.roleService.getAllRoles().subscribe((data:Role[])=>{
      this.roles = data;
        console.log("work!!!",this.roles);
      })
  }

}
