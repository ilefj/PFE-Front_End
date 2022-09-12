import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-domaine',
  templateUrl: './add-domaine.component.html',
  styleUrls: ['./add-domaine.component.scss']
})
export class AddDomaineComponent implements OnInit {

  public domaineform = this.formBuilder.group({
    domaine:["",Validators.required]
  })

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder ,  public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.activeModal.close(this.domaineform.value);
  }
}
