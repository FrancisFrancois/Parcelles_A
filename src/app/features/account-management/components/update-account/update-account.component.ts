import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AccountManagementService } from '../../../../shared/services/account-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateAccount } from '../../models/registerAccount';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent {

  registerForm: FormGroup;
  accountId : number;

constructor(
  private _activeRoute : ActivatedRoute,
  private _fb: FormBuilder,
  private _accountManagementService: AccountManagementService,
  private _router: Router
) {
  this.accountId = +this._activeRoute.snapshot.params['id'];

  this.registerForm = this._fb.group({
    lastName: [null, [Validators.required, Validators.maxLength(45), Validators.pattern(/^[\D]*$/)]],
    firstName: [null, [Validators.required, Validators.maxLength(45), Validators.pattern(/^[\D]*$/)]],
    roles: [null, [Validators.required, Validators.maxLength(45)]],
    email: [null, [Validators.required, Validators.maxLength(250), Validators.email]],
    phoneNumber: [null, [Validators.required, Validators.maxLength(45)]],
    blocked: [null, [Validators.required]]
  });
}

  ngOnInit(): void {
    this._accountManagementService.getById(this.accountId).subscribe({
      next : (account) => {
        this.registerForm.patchValue(account);
      }
    })
  }

updateUser(): void {
  this._accountManagementService.update(this.accountId, this.registerForm.value).subscribe({
    next: () => {
      console.log('L\'utilisateur a été mis à jour');
      this._router.navigate(['/list-account']);
    },
    error: (error) => {
      console.error('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur:', error);
    },
    complete: () => {
      console.log('La mise à jour de l\'utilisateur est terminée');
    }
  });
}
}
