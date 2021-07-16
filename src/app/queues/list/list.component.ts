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

  queues = null;
  allQueues = null;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  //private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private router: Router) {
    this.columnDefs = [
      { headerName: 'Queues Name', width: 300, tooltipField: 'queuesName', field: 'queuesName', sortable: true, filter: true },
      { headerName: 'Assignee', width: 200, tooltipField: 'assignee', field: 'assignee', sortable: true, filter: true },
      { headerName: 'Assignor', width: 200, tooltipField: 'assignor', field: 'assignor', sortable: true, filter: true }
    ];
  }

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.queues = [{ id: '1', queuesName: 'ABC ABC', assignee: 'HTRED LKGFDER', assignor: 'Individual', isDeleting: false },
      { id: '1', queuesName: 'BCD HGFD', assignee: 'RTEWSW RRWWR', assignor: 'Source', isDeleting: false },
      { id: '1', queuesName: 'ERSW JHRR', assignee: 'UJHTEW UITE', assignor: 'VMS', isDeleting: false },
      { id: '1', queuesName: 'EWSAQ HTEW', assignee: 'NHGFDE HTREW', assignor: 'Source', isDeleting: false }];
    //this.setupSubscription();
    this.allQueues = this.queues;
  }

  search(value: string): void {
    this.queues = this.allQueues;
    if (value === "") {
      this.queues = this.queues;
    }
    else {
      this.queues = this.queues.filter((val) => val.queuesName.toLowerCase().includes(value));
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.queues);
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  onCellClicked(event: any) {
    this.router.navigate(['/queues/edit/' + event.data.id]);
  }
  ngOnDestroy() {
    //this.subscription.forEach(sub => {
    //  sub.unsubscribe();
    //});
    //this.subscription = [];
  }

  //setupSubscription() {
  //  if (this.subscription.length === 0) {
  //    this.subscription.push(RoleService.onEditRoleRow.subscribe((item: any) => {
  //      if (item) {
  //        //this.router.navigate(['edit/1']);
  //        this.router.navigate(['/roles/edit/' + item.data.id]);

  //      }
  //    }));
  //  }

  //}
  deleteUser(id: string) {
    const user = this.queues.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.queues = this.queues.filter(x => x.id !== id));
  }

}
