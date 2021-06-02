import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  @ViewChild('addTag') addTag: NgbModal;
  modalOptions: NgbModalOptions;
  company = null;
  closeResult: string;
  constructor(private accountService: AccountService,
    private modalService: NgbModal) { }

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.company = [{
      id: '1', companyName: 'Company Name', contactNumber: 'Contact Number', emailID: 'Email ID', addresses: 'Addresses', country: 'Country', state: 'State'
      , website: 'Website', status: 'Status', isDeleting: false
    },
    {
      id: '2', companyName: 'Company Name', contactNumber: 'Contact Number', emailID: 'Email ID', addresses: 'Addresses', country: 'Country', state: 'State'
      , website: 'Website', status: 'Status', isDeleting: false
    },
    {
      id: '3', companyName: 'Company Name', contactNumber: 'Contact Number', emailID: 'Email ID', addresses: 'Addresses', country: 'Country', state: 'State'
      , website: 'Website', status: 'Status', isDeleting: false
    },
    {
      id: '4', companyName: 'Company Name', contactNumber: 'Contact Number', emailID: 'Email ID', addresses: 'Addresses', country: 'Country', state: 'State'
      , website: 'Website', status: 'Status', isDeleting: false
    }];
  }

  deleteCompany(id: string) {
    const company = this.company.find(x => x.id === id);
    company.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.company = this.company.filter(x => x.id !== id));
  }
  openPopup() {
    this.openModel(this.addTag);
  }
  private openModel(content) {
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
