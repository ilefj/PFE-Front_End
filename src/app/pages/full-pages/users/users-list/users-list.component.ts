import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { UsersService } from "app/shared/auth/users.service";
import { User } from "app/shared/Models/UserModel";
import Swal from "sweetalert2";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: [
    "./users-list.component.scss",
    "/assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public usersList : User[] = [];
  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;


  // column header
  public columns = [
    { name: "Nom", prop: "Nom" },
    { name: "Prenom", prop: "prenom" },
    { name: "email", prop: "email" },
    { name: "Role", prop: "role" },
    { name: "Actions", prop: "id" },
  ];

  // private
  private tempData = [];

  constructor(private usersService:UsersService , private router:Router) {
    this.tempData = this.usersList;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  getAllUser(){
    console.log(this.usersList);
    this.usersService.getAllUsers().subscribe((data:User[])=>{
    this.usersList = data;
    this.rows = data ;
    this.tempData = data ;
      console.log("work!!!",this.usersList);
    })
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
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onDeleteUser(id: string){
    Swal.fire({
      title: '<strong> Êtes-vous sûr de vouloir supprimer </strong>',
      icon: 'info',
      html: 'Appuyez sur oui pour le supprimer !!',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-o-up"></i> Oui!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-o-down"> Non</i>',
      cancelButtonAriaLabel: 'Thumbs down',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }}).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe( data => {
          console.log(data);
          this.getAllUser();
        })
        Swal.fire(
          'Supprimé!',
          'responsable a été supprimé.',
          'success'
        )
      }
    })
  }
  onUpdateUser(id :string){
    console.log(id);
    this.usersService.getUserById(id).subscribe((data) =>{
      console.log(data);
      this.router.navigate(['/users-edit']);
    })

  }

  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  ngOnInit(): void {
    this.getAllUser();
  }


  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

}
