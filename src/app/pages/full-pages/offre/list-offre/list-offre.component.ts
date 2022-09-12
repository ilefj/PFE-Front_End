import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {UsersService} from "../../../../shared/auth/users.service";
import {Router} from "@angular/router";
import {Domaine} from "../../../../shared/Models/domaine";
import {Offre} from "../../../../shared/Models/Offre";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {FormBuilder} from "@angular/forms";
import {OffreService} from "../../../../shared/services/OffreService";

@Component({
  selector: 'app-list-offre',
  templateUrl: './list-offre.component.html',
  styleUrls: ['./list-offre.component.scss',"/assets/sass/libs/datatables.scss"
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ListOffreComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  public offreList : Offre[] = [];
  public domaineList: Domaine[] = [];
  private tempData = [];
  public rows = [];
  public limitRef = 10;
  public ColumnMode = ColumnMode;
  public columns = [
    { name: "titre", prop: "titre" },
    { name: "description", prop: "description" },
    { name: "Reference", prop: "Reference" },
    { name: "dateCreation", prop: "dateCreation" },
    { name: "Actions", prop: "" },
  ];

  constructor( private usersService:UsersService , private formBuilder:FormBuilder, private offreService:OffreService, private  router:Router,
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

  ngOnInit(): void {
    this.getoffre()
  }
  onUpDate(id : string){
    this.router.navigate([`detail-offre/${id}`]);
  }

  getoffre(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.offreService.GetOffreByIdUser(userInfo.id).subscribe((data:Offre[])=>{
      console.log("data : "+data);
      this.offreList = data;
      this.rows = data ;
      this.tempData = data ;
      console.log("work!!!",this.offreList);
    })
  }
  GetAllOffres(){
    this.offreService.GetAllOffres().subscribe((data:Offre[])=>{
      this.offreList = data;
      this.rows = data ;
      this.tempData = data ;
      console.log("work!!!",this.offreList);

    })
  }
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  onUpdateOffre(id : string) {
    console.log(id);
    this.offreService.GetOffreById(id).subscribe((data) => {
      console.log(data);
      this.router.navigate([`/edit-offre`]);
    }
    )  }

  onDeleteOffre(id : string) {
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
        this.offreService.deleteOffre(id).subscribe( data => {
          console.log(data);
          this.getoffre();
        })
        Swal.fire(
          'Deleted!',
          'Offre has been deleted.',
          'success'
        )
      }
    })

  }
}
