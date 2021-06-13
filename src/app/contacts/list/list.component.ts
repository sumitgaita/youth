import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, ContactsService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {

  contacts = null;
  //@ViewChild('addTag') addTag: NgbModal;
  //modalOptions: NgbModalOptions;
  //closeResult: string;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  private subscription: Subscription[] = [];
  constructor(private accountService: AccountService,
    private modalService: NgbModal, private contactsService: ContactsService, private router: Router)
  {
    this.columnDefs = [
      {
        headerName: 'First Name',
        field: '',
        width: 170,
        tooltipField: 'firstName',
        cellRenderer: function (param: any) {
          if (param.data.id !== '') {
            const eDiv = document.createElement('div');
            let cellDef = '';
            cellDef += `<a class='companynamecell'><span class='editBtn'><i class='fa fa-pencil' aria-hidden='true'></i></span> ${param.data.firstName}</a>`;
            eDiv.innerHTML = cellDef;
            if (eDiv.querySelector('.companynamecell')) {
              eDiv.querySelector('.companynamecell').addEventListener('click', (ev: any) => {
                ContactsService.onEditContactsRow.emit({ data: param.data });
              })
            }
            return eDiv;
          }
        },
        sortable: false
      },

      { headerName: 'Last Name', width: 170, tooltipField: 'lastName', field: 'lastName', sortable: true, filter: true },
      { headerName: 'Company Name', width: 247, field: 'companyName', tooltipField: 'companyName', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Email', width: 250, field: 'email', tooltipField: 'email', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Phone', width: 250, tooltipField: 'phone', field: 'phone', sortable: true, filter: true }
    ];
  }

  ngOnInit() {
    
    this.contacts = [{ id: '1', firstName: 'sumit', lastName: 'maity', companyName: 'ABC Company', email: 'ABC@gmail.com', phone: '0222-87544', isDeleting: false },
      { id: '2', firstName: 'sumit', lastName: 'maity', companyName: 'ABC Company', email: 'ABC@gmail.com', phone: '0222-87544', isDeleting: false },
      { id: '3', firstName: 'sumit', lastName: 'maity', companyName: 'ABC Company', email: 'ABC@gmail.com', phone: '0222-87544', isDeleting: false },
      { id: '4', firstName: 'sumit', lastName: 'maity', companyName: 'ABC Company', email: 'ABC@gmail.com', phone: '0222-87544', isDeleting: false }];
    this.setupSubscription();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.contacts);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscription = [];
  }

  setupSubscription() {
    if (this.subscription.length === 0) {
      this.subscription.push(ContactsService.onEditContactsRow.subscribe((item: any) => {
        if (item) {
          //this.router.navigate(['edit/1']);
          this.router.navigate(['/contacts/edit/' + item.data.id]);

        }
      }));
    }

  }
  deleteUser(id: string) {
    const user = this.contacts.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.contacts = this.contacts.filter(x => x.id !== id));
  }
  //openPopup() {
  //  this.openModel(this.addTag);
  //}
  //private openModel(content) {
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
