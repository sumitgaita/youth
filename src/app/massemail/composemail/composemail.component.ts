import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-composemail',
  templateUrl: './composemail.component.html',
  styleUrls: ['./composemail.component.less']
})
export class ComposemailComponent implements OnInit {
  @ViewChild('addRecipientsModal') addRecipientsModal: NgbModal;
  closeResult: string;
  @ViewChild('MessageContent') MessageContent: any;
  content: string;
  name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
  dataset: '';
  // ------------------------------------------------
  recipients: any[] = [{ id: 1, name: 'Accounts(112)' }, { id: 2, name: 'Administrator(100)' }, { id: 3, name: 'Account Manager(25)' }, { id: 4, name: 'HR Manager(200)' }];
  selectedRecipients: any[] = [];
  selectedToAdd: any[] = [];
  selectedToRemove: any[] = [];
  addToRecipients: string;

  constructor(private modalService: NgbModal

  ) { }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: '',
      forcePasteAsPlainText: true
    };
  }
  openPopup() {
    this.openModel(this.addRecipientsModal);
  }
  chosenCars(recipients) {
    this.selectedToAdd = recipients;
  }

  chosenCarsToRemove(recipients) {
    this.selectedToRemove = recipients;
  }

  assigne() {
    this.selectedRecipients = this.selectedRecipients.concat(this.selectedToAdd);
    this.recipients = this.recipients.filter(recipients => {
      return this.selectedRecipients.indexOf(recipients) < 0;
    });

    this.selectedToAdd = [];
  }

  unassigne() {
    this.recipients = this.recipients.concat(this.selectedToRemove);
    this.selectedRecipients = this.selectedRecipients.filter(selectedrecipients => {
      return this.recipients.indexOf(selectedrecipients) < 0;
    });
    this.selectedToRemove = [];
  }

  addRecipients() {
    //  this.addToRecipients = this.selectedRecipients;
    let commaList = '';
    for (let i = 0; i < this.selectedRecipients.length; ++i) {
      if (i == this.selectedRecipients.length - 1)
        commaList += ", " + this.selectedRecipients[i].name;
      else
        commaList += ", " + this.selectedRecipients[i].name;
    }
    this.addToRecipients = commaList.substr(2, commaList.length);
    this.modalService.dismissAll();
  }

  private openModel(content: any) {
    this.modalService.open(content, { centered: true, backdrop: "static", size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
