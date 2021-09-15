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

  openings = null;
  allOpenings = null;
  //@ViewChild('addTag') addTag: NgbModal;
  //modalOptions: NgbModalOptions;
  //closeResult: string;
  status: string;
  statusList: string[] = ['All', 'Active', 'Inactive'];
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  private subscription: Subscription[] = [];
  constructor(private accountService: AccountService,
    private modalService: NgbModal, private contactsService: ContactsService, private router: Router) {
    this.columnDefs = [
      {
        headerName: 'Job Id',
        field: 'jobId',
        width: 170,
        tooltipField: 'jobId',
        sortable: true,
        filter: true
      },

      { headerName: 'Job Title', width: 150, tooltipField: 'jobTitle', field: 'jobTitle', sortable: true, filter: true },
      { headerName: 'City', width: 250, field: 'city', tooltipField: 'city', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'State', width: 150, field: 'state', tooltipField: 'state', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Counntry', width: 250, tooltipField: 'counntry', field: 'counntry', sortable: true, filter: true },
      {
        headerName: 'Status', width: 100, field: '', tooltipField: 'status', cellRenderer: function (param: any) {
          if (param.data.id !== '') {
            const eDiv = document.createElement('div');
            let cellDef = '';
            if (param.data.status === 'Active') {
              cellDef += `<div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
            </div>`;
            }
            else {
              cellDef += `<div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            </div>`;
            }
            eDiv.innerHTML = cellDef;
            if (eDiv.querySelector('.companynamecell')) {
              eDiv.querySelector('.companynamecell').addEventListener('click', (ev: any) => {
                // AccountService.onEditUsersRow.emit({ data: param.data });
              })
            }
            return eDiv;
          }
        },
        sortable: false
      }
    ];
  }

  ngOnInit() {
    this.status = 'All';
    this.openings = [{ id: '1', jobId: '10001', jobTitle: 'Software Developer', city: 'Torento', state: 'TO', counntry: 'Canada', status: 'Active', isDeleting: false },
    { id: '2', jobId: '10002', jobTitle: 'System Eng', city: 'Montreal', state: 'MO', mexico: 'Yes', counntry: 'Canada', status: 'Inactive', isDeleting: false },
    { id: '3', jobId: '10003', jobTitle: 'Hr', city: 'Calgory', state: 'CG', mexico: 'Yes', counntry: 'Canada', status: 'Active', isDeleting: false },
    { id: '4', jobId: '10004', jobTitle: 'Account', city: 'Vancober', state: 'VAN', mexico: 'Yes', counntry: 'Canada', status: 'Inactive', isDeleting: false }];
    //this.setupSubscription();
    this.allOpenings = this.openings;
  }

  search(value: string): void {
    this.openings = this.allOpenings;
    if (value === "") {
      this.openings = this.openings;
    }
    else {
      this.openings = this.openings.filter((val) => val.jobId.toLowerCase().includes(value.toLowerCase()));
    }
  }

  changeStatus() {
    this.openings = this.allOpenings;
    if (this.status === "All") {
      this.openings = this.openings;
    }
    else {
      this.openings = this.openings.filter((val) => val.status.includes(this.status));
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.openings);
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  onCellClicked(event: any) {
    if (event.colDef.headerName === 'Status') {

    }
    else {
      this.router.navigate(['/openings/edit/' + event.data.id]);
    }
  }
  ngOnDestroy() {
    //this.subscription.forEach(sub => {
    //  sub.unsubscribe();
    //});
    //this.subscription = [];
  }

  //setupSubscription() {
  //  if (this.subscription.length === 0) {
  //    this.subscription.push(ContactsService.onEditContactsRow.subscribe((item: any) => {
  //      if (item) {
  //        //this.router.navigate(['edit/1']);
  //        this.router.navigate(['/contacts/edit/' + item.data.id]);

  //      }
  //    }));
  //  }

  //}
  deleteUser(id: string) {
    const user = this.openings.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.openings = this.openings.filter(x => x.id !== id));
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
