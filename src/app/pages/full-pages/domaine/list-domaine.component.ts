import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {Domaine} from "../../../shared/Models/domaine";
import {DomaineService} from "../../../shared/services/DomaineService";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddDomaineComponent} from "./add-domaine/add-domaine.component";


@Component({
  selector: 'app-list-domaine',
  templateUrl: './list-domaine.component.html',
  styleUrls: ['./list-domaine.component.scss',"/assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ListDomaineComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public domaineList: Domaine[] = [];
  domaineform = new FormGroup({
    name: new FormControl()
  });
  // column header
  public columns = [
    {name: "Nom", prop: "nom"},
    {name: "Actions", prop: "id"},
  ];
  // private
  private tempData = [];
  // row data
  public rows = [];
  public limitRef = 10;

  // private userInfo = JSON.parse(localStorage.getItem('userInfo'));

  constructor(private domaineService: DomaineService,private modalService: NgbModal, private router: Router, private toastr: ToastrService) {
    this.tempData = this.domaineList;
  }

  ngOnInit(): void {
    this.getAllDomaine()
    //console.log('UserInfo',this.userInfo)
  }

  getAllDomaine() {
    this.domaineService.getAllDomaine().subscribe((data: Domaine[]) => {
      this.domaineList = data;
      this.rows = data;
      this.tempData = data;
      console.log("work!!!", this.domaineList);
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
      return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
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
  addDomaine() {
    const modalRef = this.modalService.open(AddDomaineComponent);
    modalRef.result.then((result) => {
      console.log(result);
      this.domaineService.addDomaine(result.domaine).subscribe((data) =>{
        this.toastr.success('Domaine has been added successfuly!','', { closeButton: true });
        this.ngOnInit();
      },error => {
        console.log("error",error);
      })
    }).catch((error) => {
      console.log(error);
    });
  }
  onSubmit() {

    // this.domaineService.addDomaine(this.domaineform.controls['name'].value).subscribe((data) => {
    //   this.domaineform.reset();
    //   this.ngOnInit();
    //   this.toastr.success(' Domaine add successfully')
    // }, (error) => {
    //   console.log("error", error);
    // })

  }


  onDeleteDomaine(id: string) {
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
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.domaineService.deletedomaine(id).subscribe(data => {
          console.log(data);
          this.getAllDomaine();
        })
        Swal.fire(
          'Deleted!',
          'Domain has been deleted.',
          'success'
        )
      }
    })

  }

}
