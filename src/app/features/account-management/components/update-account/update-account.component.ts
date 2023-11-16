import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AccountManagementService } from '../../services/account-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent {

  registerForm: FormGroup;
  accountId : number;

  constructor(
    private _fb : FormBuilder,
    private _accountManagementService: AccountManagementService,
    private _router: Router
    ) {
    this.registerForm = this._fb.group({
      lastName: [null, [Validators.required, Validators.pattern(/^[\D]*$/)]],
      firstName: [null, [Validators.required, Validators.pattern(/^[\D]*$/)]],
      username: [null, [Validators.required, Validators.pattern(/^[\D]*$/)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmpassword: [null, [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
    this.accountId = +this
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmpassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null; 
    }
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
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
      this._router.navigate(['/']);
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
