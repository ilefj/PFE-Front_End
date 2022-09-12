import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { RoleService } from 'app/shared/auth/role.service';
import { UsersService } from 'app/shared/auth/users.service';
import { User } from 'app/shared/Models/UserModel';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public userList : User[] = [];
  public userList2 : User[] = [];
  public role : string;

   // row data
   public rows = [];
   public ColumnMode = ColumnMode;
   public limitRef = 10;


   // column header
   public columns = [
     { name: "Nom", prop: "username" },
     { name: "Prenom", prop: "¨Prenom" },
     { name: "Email", prop: "email" },
     { name: "Role", prop: "role" },
     { name: "Actions", prop: "id" },
   ];

   // private
   private tempData = [];

  constructor(private roleService : RoleService , private toastr: ToastrService, private route : ActivatedRoute ,private router:Router, private usersService : UsersService) {
    this.tempData = this.userList;
  }

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('name');
    this.getAllUser(this.role);
    this.getUsers();
  }

  getUsers(){
    this.usersService.getAllUsers().subscribe((data:User[])=>{
      data.map((x : User)=>{
        if(x.role != this.role){
          this.userList2.push(x);
        }
      })

    });
  }

  getAllUser(name : string){
    this.roleService.getUsersByRole(name).subscribe((data:User[])=>{
    this.userList = data;
    console.log("work!!!",this.userList);
    this.rows = data ;
    this.tempData = data;
    })
  }
  onUpdateUser(id :string){
    console.log(id);
    this.usersService.getUserById(id).subscribe((data) =>{
      console.log(data);
      this.router.navigate(['/users-edit']);
    })

  }
  removeUser(id : string , rolename : string){
    this.roleService.removeUserFromRole(id,rolename).subscribe((data) =>{
      console.log("done");
      this.ngOnInit();
    },error =>{
      console.log("error",error);
    });
  }


  /**
   * filterUpdate
   *
   * @param event
   */
   filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.userName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

   /**
   * updateLimit
   *
   * @param limit
   */
    updateLimit(limit) {
      this.limitRef = limit.target.value;
    }

}
