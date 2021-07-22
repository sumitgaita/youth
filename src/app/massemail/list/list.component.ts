import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, RoleService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  //@ViewChild('composeModal') composeModal: NgbModal;
  //closeResult: string;
  //@ViewChild('MessageContent') MessageContent: any;
  //content: string;
  //name = 'ng4-ckeditor';
  //ckeConfig: any;
  //mycontent: string;
  //dataset: '';
  constructor(private accountService: AccountService, private router: Router, private modalService: NgbModal) {
   
  }

  ngOnInit() {
    //this.ckeConfig = {
    //  allowedContent: true,
    //  extraPlugins: '',
    //  forcePasteAsPlainText: true
    //};    
  }

  
  ngOnDestroy() {
  }

  //openPopup() {
  //  this.openModel(this.composeModal);
  //}

  //private openModel(content: any) {
  //  this.modalService.open(content, { centered: true, backdrop: "static", size: "lg" }).result.then((result) => {
  //    this.closeResult = `Closed with: ${result}`;
  //  }, (reason) => {
  //    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //  });
  //}

  //private getDismissReason(reason: any): string {
  //  if (reason === ModalDismissReasons.ESC) {
  //    return 'by pressing ESC';
  //  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //    return 'by clicking on a backdrop';
  //  } else {
  //    return `with: ${reason}`;
  //  }
  //}
}
