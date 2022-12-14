import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import {RegisterResponsableComponent} from "./register-responsable/register-responsable.component";
import {AccueilComponent} from "./accueil/accueil.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },

      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
        }
      },
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Maintenance Page'
        }
      },
   
      {
        path: 'register-responsable',
        component: RegisterResponsableComponent,
        data: {
          title: 'Register-Responsable Page'
        }
      },
      {
        path: 'accueil',
        component: AccueilComponent,
        data: {
          title: 'Accueil Page'
        }
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
