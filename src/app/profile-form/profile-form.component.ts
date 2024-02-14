import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})

export class ProfileFormComponent{
  registerForm!: FormGroup;
  formErrors: any = {
    fname: {
      required: 'First name is required.',
      pattern: 'First name must contain only letters.'
    },
    lname: {
      required: 'Last name is required.',
      pattern: 'Last name must contain only letters.'
    },
    email: {
      required: 'Email is required.',
      email: 'Invalid email format.',
      pattern: 'Invalid email format.'
    },
    password: {
      required: 'Password is required.',
      invalidPassword: 'Invalid password format. Password must contain at least 8 characters, one letter, one number, and one special character.'
    },
    cpassword: {
      required: 'Confirm password is required.',
      passwordMismatch: 'Passwords do not match.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['',[Validators.required,Validators.email,Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]/)]],
      password: ['',[Validators.required, this.passwordValidator()]],
      cpassword: ['',[Validators.required,this.confirmPasswordValidator('password')]]
    });}
  
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;
      const isValid = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      return isValid ? null : { 'invalidPassword': true };
    };
  }

  confirmPasswordValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const confirmPassword = control.value;
      const password = control.root.get(controlName)?.value;
      return confirmPassword === password ? null : { 'passwordMismatch': true };
    };
  }

  onSubmit() {
    
    if (this.registerForm.valid) {
      this.toastr.success('Registration Successful', 'Success', {
        positionClass: 'toast-top-right',
        timeOut: 700,
      });
      if(this.registerForm.value != null){
        localStorage.setItem("data", JSON.stringify(this.registerForm.value));
        this.router.navigate(['profile-view']);
      }
      
    } else {
      let errorDisplayed = false;
      Object.keys(this.registerForm.controls).forEach(controlName => {
        const control = this.registerForm.get(controlName);
        if (control?.invalid && !errorDisplayed) {
          const errors = control.errors;
          if (errors) {
            const errorKey = Object.keys(errors)[0];
            const errorMessage = this.formErrors[controlName][errorKey];
            if (errorMessage) {
              this.toastr.error(errorMessage, 'Validation Error', {
                positionClass: 'toast-top-right',
                timeOut: 1000,
              });
              errorDisplayed = true; 
            }
          }
        }
      });
    }
  }
}
