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

  contacts = null;
  @ViewChild('addTag') addTag: NgbModal;
  modalOptions: NgbModalOptions;
  closeResult: string;
  constructor(private accountService: AccountService,
    private modalService: NgbModal) { }

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.contacts = [{ id: '1', title: 'sumit', name: 'maity', mobileNumber: 'sumit@gmail.com', isDeleting: false },
    { id: '2', title: 'sumit', name: 'maity', mobileNumber: 'sumit@gmail.com', isDeleting: false },
    { id: '3', title: 'sumit', name: 'maity', mobileNumber: 'sumit@gmail.com', isDeleting: false },
    { id: '4', title: 'sumit', name: 'maity', mobileNumber: 'sumit@gmail.com', isDeleting: false }];
  }

  deleteUser(id: string) {
    const user = this.contacts.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.contacts = this.contacts.filter(x => x.id !== id));
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
