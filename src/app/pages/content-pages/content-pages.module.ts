import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RegisterResponsableComponent } from './register-responsable/register-responsable.component';
import {ArchwizardModule} from "angular-archwizard";
import { AccueilComponent } from './accueil/accueil.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgSelectModule,
    TagInputModule,
    NgxSpinnerModule,
    ArchwizardModule
  ],
  declarations: [
    ComingSoonPageComponent,
    ErrorPageComponent,
    ForgotPasswordPageComponent,
    LockScreenPageComponent,
    LoginPageComponent,
    MaintenancePageComponent,
    RegisterResponsableComponent,
    AccueilComponent
  ]
})
export class ContentPagesModule { }
