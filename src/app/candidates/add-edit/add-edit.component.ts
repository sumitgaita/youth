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
  @ViewChild('addNotes') addNotes: NgbModal;
  modalOptions: NgbModalOptions;
  closeResult: string;
  form: FormGroup;
  @ViewChild('ContractContent') ContractContent: any;
  content: string;
  name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  workAuthorizationList: string[] = [];
  workAuthorizationUsList: string[] = ['US Citizen', 'GC', 'GC EAD', 'H1B', 'H4 EAD', 'L1A', 'L1B', 'L2 EAD', 'TN Visa', 'E3 Visa', 'OPT', 'OPT TSEM', 'CPT', 'TPS', 'Ashylum & Others'];
  workAuthorizationCanadaList: string[] = ['Canadian Citizen', 'Permanent Resident', 'Work Permit - Closed', 'Work Permit - Open', 'Others'];
  workAuthorizationIndiaList: string[] = ['Indian Citizen', 'Permanet Resident', 'Others'];
  countryList: string[] = ['USA', 'Mexico', 'Canada', 'India'];
  documentTypeList: string[] = ['Resume', 'Work Authoazation', 'DL'];
  relationshiplist: string[] = ['colleagues', 'reporting manager'];
  instagram: string = '';
  facebook: string = '';
  linkedin: string = '';
  skillsList = [];
  selectedPrimarySkills = [];
  selectedSecondarySkills = [];
  addPrimarySkills = '';
  addSecondarySkills = '';
  highestQualificationList = [];
  selectedHighestQualification = [];
  addhighestqualification = '';

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
    this.isAddMode = !this.id;
    this.instagram = 'https://www.instagram.com/';
    this.facebook = 'https://www.facebook.com/';
    this.linkedin = 'https://in.linkedin.com/';
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: '',
      forcePasteAsPlainText: true
    };
    this.form = this.formBuilder.group({
      //firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      //username: ['', Validators.required],
      //password: ['', passwordValidators]
      workAuthorization: ['', Validators.required],
      country: [''],
      documentType: [''],
      relationShip: [''],
      dOB: ['']
    });

    if (!this.isAddMode) {
      //this.accountService.getById(this.id)
      //  .pipe(first())
      //  .subscribe(x => this.form.patchValue(x));
    }
    setTimeout(() => {
      this.skillsList = [
        { item_id: 1, item_text: '.NET' },
        { item_id: 2, item_text: 'ASP .NET' },
        { item_id: 3, item_text: 'C#' },
        { item_id: 4, item_text: 'Angular 2+' },
        { item_id: 5, item_text: 'React Js' },
        { item_id: 5, item_text: 'DevOps' },
        { item_id: 5, item_text: 'Azure' },
        { item_id: 5, item_text: 'Sql Server' }
      ];
      this.highestQualificationList = [
        { item_id: 1, item_text: 'MCA' },
        { item_id: 2, item_text: 'PG' },
        { item_id: 3, item_text: 'Computer Application' },
        { item_id: 4, item_text: 'Master' },
        { item_id: 5, item_text: 'Bachelor of Arts' },
        { item_id: 5, item_text: 'Bachelor of Science' },
        { item_id: 5, item_text: 'Bachelor of Commerce' },
        { item_id: 5, item_text: 'Bachelor of Engg./Tech' }
      ];
    }, 500);
    //this.newAddressRow = { address: '', city: '', state: '', country: '' };
    //this.addAddressRow.push(this.newAddressRow);
    //this.newEmailRow = { primaryEmail: '', secondaryEmail: '' };
    //this.addEmailRow.push(this.newAddressRow);
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  getWorkAuthorization() {
    this.workAuthorizationList = [];
    if (this.f.country.value === 'USA') {
      this.workAuthorizationList = this.workAuthorizationUsList;
    }
    else if (this.f.country.value === 'Canada') {
      this.workAuthorizationList = this.workAuthorizationCanadaList;
    }
    else if (this.f.country.value === 'India') {
      this.workAuthorizationList = this.workAuthorizationIndiaList;
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

  openNotesPopup() {
    this.openModel(this.addNotes);
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
