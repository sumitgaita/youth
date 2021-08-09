import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.less']
})
export class AddEditComponent implements OnInit {
  @ViewChild('addTag') addTag: NgbModal;
  @ViewChild('addNotes') addNotes: NgbModal;
  modalOptions: NgbModalOptions;
  closeResult: string;
  form: FormGroup;
  id: string;
  dataset = '';
  isAddMode: boolean;
  loading = false;
  submitted = false;
  titleList: string[] = ['Mr.', 'Mrs'];
  preferredtimeList: string[] = ['Morning', 'Afternoon', 'Evening'];
  connectionsList: string[] = ['Related to', 'Referred by', 'Reports To'];
  preferredModePhoneList: string[] = ['Offical', 'Home', 'Mobile'];
  preferredModeList: string[] = ['Phone', 'Email'];
  preferredModeEmailList: string[] = ['Personal', 'Offical'];
  countryList: string[] = ['USA', 'Mexico', 'Canada', 'India'];
  @ViewChild('ContractContent') ContractContent: any;
  content: string;
  name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
  taglist: Array<any> = [];
  tagName: string;
  isRelatedto: boolean = true;
  userList = [];
  selectedReportList = [];
  instagram: string = '';
  facebook: string = '';
  linkedin: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.instagram = 'https://www.instagram.com/';
    this.facebook = 'https://www.facebook.com/';
    this.linkedin = 'https://in.linkedin.com/';
    this.isAddMode = !this.id;
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: '',
      forcePasteAsPlainText: true
    };
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      //firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      //username: ['', Validators.required],
      //password: ['', passwordValidators]
      title: ['', Validators.required],
      preferredtime: [''],
      connections: ['Related to'],
      preferredMode: [''],
      preferredEmailMode: [''],
      preferredPhoneMode: [''],
      country: ['']
    });

    if (!this.isAddMode) {
      //this.accountService.getById(this.id)
      //  .pipe(first())
      //  .subscribe(x => this.form.patchValue(x));
    }
    this.userList = [
      { item_id: 1, item_text: 'amit saha' },
      { item_id: 2, item_text: 'anada sarma' },
      { item_id: 3, item_text: 'anup gupta' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'avik roy' }
    ];
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  addTagList() {
    this.taglist.push(this.tagName);
    this.modalService.dismissAll();
  }
  tagRemove(index: number) {
    this.taglist.splice(index, 1);
    return true;

  }
  backContractsList() {
    const isFromCompany = JSON.parse(localStorage.getItem('fromCompany'));
    if (isFromCompany && isFromCompany.id.length > 0) {
      this.router.navigate(['/company/edit/' + isFromCompany.id]);
    }
    else {
      this.router.navigate(['/contacts']);
    }
  }
  SocialFootprint(social: string) {
    if (social === 'linkedin' && this.linkedin && this.linkedin !== '') {
      window.open(this.linkedin, '_blank');
    }
    else if (social === 'facebook' && this.facebook && this.facebook !== '') {
      window.open(this.facebook, '_blank');
    }
    else if (social === 'instagram' && this.instagram && this.instagram !== '') {
      window.open(this.instagram, '_blank');
    }

  }

  onConnectionsSelected(value: string) {
    if (value === 'Related to') {
      this.isRelatedto = true;
    }
    else {
      this.isRelatedto = false;
    }
  }

  private createUser() {
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateUser() {
    this.accountService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  openPopup() {
    this.tagName = '';
    this.openModel(this.addTag);
  }
  openNotesPopup() {
    this.openModel(this.addNotes);
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
