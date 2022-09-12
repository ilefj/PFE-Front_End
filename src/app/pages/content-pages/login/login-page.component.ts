import { ResponseCode } from './../../../shared/Enums/ResponseCode';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, Pipe, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { ResponseModel } from 'app/shared/Models/ResponseModel';
import { User } from 'app/shared/Models/UserModel';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import {duration} from "moment";
import {error} from "protractor";
import {summaryFileName} from "@angular/compiler/src/aot/util";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;
  response : any ;
  readonly url = 'https://localhost:7268/api/User';
  ErrorMessage : string ;
  user : User ;
  logedUser : User;

  public loginForm = this.formBuilder.group({
    email:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute , private formBuilder:FormBuilder , private httpClient: HttpClient , private toastr: ToastrService) {
  }


  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
  /* this.spinner.show(undefined,
    {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    }); */
    //console.log("on submit");
   // console.log("http")
    const res = this.authService.signinUser(this.loginForm.controls["email"].value,this.loginForm.controls["password"].value) as Observable<any>;
    res.subscribe((data) => {
      if(data.responseCode == 1){
        console.log("result"+data);
        console.log("responce code ok");
        localStorage.setItem("userInfo",JSON.stringify(data.dateSet));
        this.spinner.hide();
        this.toastr.success(' login successfully')
        this.router.navigate(['/dashboard']);
      }else{
        this.isLoginFailed = true;
        this.ErrorMessage = data.responseMessage ;
        this.spinner.hide();
       // this.toastr.error('error');
      }
      });
  }

}
