import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule } from "ng-chartist";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PipeModule } from "app/shared/pipes/pipe.module";

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { HorizontalTimelineComponent } from "./timeline/horizontal/component/horizontal-timeline.component";
import { TimelineVerticalCenterPageComponent } from "./timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component";
import { TimelineVerticalLeftPageComponent } from "./timeline/vertical/timeline-vertical-left-page/timeline-vertical-left-page.component";
import { TimelineVerticalRightPageComponent } from "./timeline/vertical/timeline-vertical-right-page/timeline-vertical-right-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from "./search/search.component";
import { FaqComponent } from "./faq/faq.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UsersViewComponent } from "./users/users-view/users-view.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { UsersAddComponent } from './users/users-add/users-add.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { RolesEditComponent } from './roles/roles-edit/roles-edit.component';

import { ListOffreComponent } from './offre/list-offre/list-offre.component';
import {AddOffreComponent} from "./offre/add-offre/add-offre.component";
import {EditOffreComponent} from "./offre/edit-offre/edit-offre.component";
import {ArchwizardModule} from "angular-archwizard";
import {ListDomaineComponent} from "./domaine/list-domaine.component";
import { AddDomaineComponent } from './domaine/add-domaine/add-domaine.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { AddEmployeComponent } from './employe/add-employe/add-employe.component';
import { EditEmployeComponent } from './employe/edit-employe/edit-employe.component';
import { ResourcesComponent } from './resources/resources.component';
import { DetailOffreComponent } from './offre/detail-offre/detail-offre.component';


@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ChartistModule,
        AgmCoreModule,
        NgSelectModule,
        NgbModule,
        SwiperModule,
        PipeModule,
        NgxDatatableModule,
        ArchwizardModule,
    ],
  declarations: [
    GalleryPageComponent,
    InvoicePageComponent,
    HorizontalTimelinePageComponent,
    HorizontalTimelineComponent,
    TimelineVerticalCenterPageComponent,
    TimelineVerticalLeftPageComponent,
    TimelineVerticalRightPageComponent,
    UserProfilePageComponent,
    SearchComponent,
    FaqComponent,
    AccountSettingsComponent,
    UsersListComponent,
    UsersViewComponent,
    UsersEditComponent,
    UsersAddComponent,
    RolesListComponent,
    RolesEditComponent,
    AddOffreComponent,
    EditOffreComponent,
    ListOffreComponent,
    ListDomaineComponent,
    AddDomaineComponent,
    ListEmployeComponent,
    AddEmployeComponent,
    EditEmployeComponent,
    ResourcesComponent,
    DetailOffreComponent,

  ],
})
export class FullPagesModule {}
