import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, RoleService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {

  roles = null;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private router: Router) {
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
            cellDef += `<a class='companynamecell'><span class='editBtn'><i class='fa fa-pencil' aria-hidden='true'></i></span></a>`;
            eDiv.innerHTML = cellDef;
            if (eDiv.querySelector('.companynamecell')) {
              eDiv.querySelector('.companynamecell').addEventListener('click', (ev: any) => {
                RoleService.onEditRoleRow.emit({ data: param.data });
              })
            }
            return eDiv;
          }
        },
        sortable: false
      },
      { headerName: 'Roles', width: 300, tooltipField: 'roles', field: 'roles', sortable: true, filter: true },
      { headerName: 'Number Of Users', width: 200, tooltipField: 'numberofusers', field: 'numberofusers', sortable: true, filter: true },
      { headerName: 'Privilages', width: 538, tooltipField: 'privilages', field: 'privilages', sortable: true, filter: true }
    ];
  }

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.roles = [{ id: '1', roles: 'admin', numberofusers: 1, privilages: 'admin users have all permission', isDeleting: false },
      { id: '1', roles: 'admin', numberofusers: 1, privilages: 'admin users have all permission', isDeleting: false },
      { id: '1', roles: 'admin', numberofusers: 1, privilages: 'admin users have all permission', isDeleting: false },
      { id: '1', roles: 'admin', numberofusers: 1, privilages: 'admin users have all permission', isDeleting: false }];
    this.setupSubscription();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.roles);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscription = [];
  }

  setupSubscription() {
    if (this.subscription.length === 0) {
      this.subscription.push(RoleService.onEditRoleRow.subscribe((item: any) => {
        if (item) {
          //this.router.navigate(['edit/1']);
          this.router.navigate(['/roles/edit/' + item.data.id]);

        }
      }));
    }

  }
  deleteUser(id: string) {
    const user = this.roles.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.roles = this.roles.filter(x => x.id !== id));
  }
  
}
