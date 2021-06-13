import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, AccessControlService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('addTag') addTag: NgbModal;
  modalOptions: NgbModalOptions;
  closeResult: string;
  accesscontrols = null;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  private subscription: Subscription[] = [];
  roleName: string = '';
  constructor(private accountService: AccountService,
    private modalService: NgbModal,
    private router: Router) {
    this.columnDefs = [
      {
        headerName: '',
        field: '',
        width: 50,
        tooltipField: '',
        cellRenderer: function (param: any) {
          if (param.data.id !== '') {
            const eDiv = document.createElement('div');
            let cellDef = '';
            cellDef += `<a class='companynamecell'><span class='editBtn'><i class="fa fa-universal-access" aria-hidden="true"></i></span></a>`;
            eDiv.innerHTML = cellDef;
            if (eDiv.querySelector('.companynamecell')) {
              eDiv.querySelector('.companynamecell').addEventListener('click', (ev: any) => {
                AccessControlService.onEditAccessControlRow.emit({ data: param.data });
              })
            }
            return eDiv;
          }
        },
        sortable: false
      },
      { headerName: 'ROLES', width: 235, tooltipField: 'roles', field: 'roles', sortable: true, filter: true },
      { headerName: 'VIEW', width: 200, tooltipField: 'view', field: 'view', sortable: true, filter: true },
      { headerName: 'EDIT', width: 200, tooltipField: 'edit', field: 'edit', sortable: true, filter: true },
      { headerName: 'ADD', width: 200, tooltipField: 'add', field: 'add', sortable: true, filter: true },
      { headerName: 'DELETE', width: 200, tooltipField: 'delete', field: 'delete', sortable: true, filter: true }
    ];
  }

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.accesscontrols = [{ id: '1', roles: 'admin', edit: 'can not edit records', add: 'add all recordes', view: 'can not view records', delete: 'can not view records', collapsed: true },
      { id: '2', roles: 'Administrator', edit: 'can not edit records', add: 'add all recordes', view: 'can not view records', delete: 'can not view records', collapsed: true },
      { id: '3', roles: 'Account Manager', edit: 'can not edit records', add: 'add all recordes', view: 'can not view records', delete: 'can not view records', collapsed: true },
      { id: '4', roles: 'HR Manager', edit: 'can not edit records', add: 'add all recordes', view: 'can not view records', delete: 'can not view records', collapsed: true }];
    this.setupSubscription();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.accesscontrols);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscription = [];
  }

  setupSubscription() {
    if (this.subscription.length === 0) {
      this.subscription.push(AccessControlService.onEditAccessControlRow.subscribe((item: any) => {
        if (item) {
          this.roleName = '';
          this.openPopup(item.data);

        }
      }));
    }

  }

  deleteUser(id: string) {
    const user = this.accesscontrols.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.accesscontrols = this.accesscontrols.filter(x => x.id !== id));
  }
  openPopup(item: any) {
    this.roleName = item.roles;
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
