import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";
import { Data } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    // check login
    (localStorage.getItem('currentUser')) ? this.router.navigateByUrl('/dashboard') : ""


    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const body = {
      email: this.f.email.value,
      password: this.f.password.value,
    }

    this.authenticationService.authLogin(body).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          localStorage.setItem('currentUser', JSON.stringify(data.data));
          console.log(localStorage.getItem('currentUser'))
          this.getSession()
          this.alertToast('success', 'Login berhasil!');
          this.router.navigate(['/default']);

        } else {
          this.alertToast('error', 'Email atau password salah.')
        }
      },
      error: error => {
        // this.errorMessage = error.message;
        this.alertToast('error', error)
        console.error('There was an error!', error);
      }

    });

  }

  getSession() {
    this.authenticationService.getSession().subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (error) => {

      }
    })
  }
  
  alertToast(icon, title) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }

  alertSuccess(title, content) {
    Swal.fire({
      title,
      text: content,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }
  
}
