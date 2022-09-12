
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { TimelineVerticalCenterPageComponent } from './timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component';
import { TimelineVerticalLeftPageComponent } from './timeline/vertical/timeline-vertical-left-page/timeline-vertical-left-page.component';
import { TimelineVerticalRightPageComponent } from './timeline/vertical/timeline-vertical-right-page/timeline-vertical-right-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { RolesEditComponent } from './roles/roles-edit/roles-edit.component';
import {ListOffreComponent} from "./offre/list-offre/list-offre.component";
import {canActivate} from "@angular/fire/auth-guard";
import {AdminGuard} from "../../shared/auth/Admin.guard";
import {ListDomaineComponent} from "./domaine/list-domaine.component";
import {EditOffreComponent} from "./offre/edit-offre/edit-offre.component";
import {AddOffreComponent} from "./offre/add-offre/add-offre.component";
import {ListEmployeComponent} from "./employe/list-employe/list-employe.component";
import {EditEmployeComponent} from "./employe/edit-employe/edit-employe.component";
import {AddChat} from "../../chat-ngrx/store/chat.actions";
import {AddEmployeComponent} from "./employe/add-employe/add-employe.component";
import {DetailOffreComponent} from "./offre/detail-offre/detail-offre.component";

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'gallery',
        component: GalleryPageComponent,
        data: {
          title: 'Gallery Page'
        }
      },
      {
        path: 'invoice',
        component: InvoicePageComponent,
        data: {
          title: 'Invoice Page'
        }
      },
      {
        path: 'horizontaltimeline',
        component: HorizontalTimelinePageComponent,
        data: {
          title: 'Horizontal Timeline Page'
        }
      },
      {
        path: 'timeline-vertical-center',
        component: TimelineVerticalCenterPageComponent,
        data: {
          title: 'Timeline Vertical Center Page'
        }
      },
      {
        path: 'timeline-vertical-left',
        component: TimelineVerticalLeftPageComponent,
        data: {
          title: 'Timeline Vertical Left Page'
        }
      },
      {
        path: 'timeline-vertical-right',
        component: TimelineVerticalRightPageComponent,
        data: {
          title: 'Timeline Vertical Right Page'
        }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'Account Settings Page'
        }
      },
      {
        path: 'profile',
        component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          title: 'Search'
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        }
      },
      {
        path: 'kb',
        loadChildren: () => import('./knowledge-base/knowledge-base.module').then(m => m.KnowledgeBaseModule)
      },
      {
        path: 'offres',
        component: ListOffreComponent,
        data: {
          title: 'offres'
        }
      },

      {

        path: 'roles-list',
        component: RolesListComponent,
        data: {
          title: 'List'
        }
      },
      {

        path: 'roles-edit/:name',
        component: RolesEditComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'users-add',
        component: UsersAddComponent,
        data: {
          title: 'Add'
        }
      },
      {
        canActivate: [AdminGuard],

        path: 'users-list',
        component: UsersListComponent,
        data: {
          title: 'List'
        }
      },
      {

        path: 'list-domaine',
        component: ListDomaineComponent,
        data: {
          title: 'List des domaines'
        }
      },
      {
        canActivate: [AdminGuard],
        path: 'users-view',
        component: UsersViewComponent,
        data: {
          title: 'View'
        }
      },
      {
        canActivate: [AdminGuard],
        path: 'users-view',
        component: UsersViewComponent,
        data: {
          title: 'View'
        }
      },
      {
        canActivate: [AdminGuard],
        path: 'users-edit',
        component: UsersEditComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'edit-offre',
        component: EditOffreComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'add-offre',
        component: AddOffreComponent,
        data: {
          title: 'Add'
        }
      },
      {
        path: 'Employes',
        component: ListEmployeComponent,
        data: {
          title: 'Gestion des employés'
        }
      },
      {
        path: 'edit-employe',
        component: EditEmployeComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'add-employe',
        component: AddEmployeComponent,
        data: {
          title: 'Add'
        }
      },
      {
        path: 'detail-offre/:id',
        component:DetailOffreComponent,
        data: {
          title: 'detail'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
