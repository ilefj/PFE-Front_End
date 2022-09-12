import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {Employe} from "../../../../shared/Models/Employe";
import {UsersService} from "../../../../shared/auth/users.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../../../../shared/services/EmployeeService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss',"/assets/sass/libs/datatables.scss"
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ListEmployeComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  public employeList : Employe[] = [];
  private tempData = [];
  public rows = [];
  public limitRef = 10;
  public ColumnMode = ColumnMode;
  public columns = [
    { name: "nCin", prop: "NCin" },
    { name: "nom", prop: "Nom" },
    { name: "prenom", prop: "Prenom" },
    { name: "poste", prop: "Poste" },
    { name: "matricule", prop: "Matricule" },
    { name: "email", prop: "Email" },
    { name: "adresse", prop: "Adresse" },
    { name: "tel", prop: "Tel" },
    { name: "salaire", prop: "salaire" },
    { name: "Actions", prop: "" },
  ];
  constructor( private usersService:UsersService , private formBuilder:FormBuilder, private employeeService:EmployeeService, private  router:Router,
               private toastrService: ToastrService ) { }
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.titre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }
  ngOnInit(): void {
  this.getEmploye()
  }
  getEmploye(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.employeeService.GetEmployeeByIdUser(userInfo.id).subscribe((data:Employe[])=>{
      console.log("data : "+data);
      this.employeList = data;
      this.rows = data ;
      this.tempData = data ;
      console.log("Work!",this.employeList);
    })
  }
  onUpdateEmploye(id : string) {
    console.log(id);
    this.employeeService.GetEmployeById(id).subscribe((data) => {
        console.log(data);
        this.router.navigate([`/edit-employe`]);
      }
    )  }
  onDeleteEmploye(id : string) {
    Swal.fire({
      title: '<strong> Are you sure to delete </strong>',
      icon: 'info',
      html: 'Press yes to delete it !!',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-o-up"></i> Yes!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-o-down"> No</i>',
      cancelButtonAriaLabel: 'Thumbs down',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }}).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmploye(id).subscribe( data => {
          console.log(data);
          this.getEmploye();
        })
        Swal.fire(
          'Deleted!',
          'Employe has been deleted.',
          'success'
        )
      }
    })

  }

}
