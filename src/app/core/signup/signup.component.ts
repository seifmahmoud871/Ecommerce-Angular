import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: any[] = [];
  signUpForm: FormGroup;
  check: boolean | undefined;
  text: String | undefined;

  ngOnInit(){
    // this.users = JSON.parse(localStorage.getItem('users')!);
  }

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
    );
  }

  signUp() {
    console.log(this.signUpForm);
    
    if (this.signUpForm.status=="VALID") {

      if ("users" in localStorage) {
        this.users = JSON.parse(localStorage.getItem('users')!);
        for (let i = 0; i < this.users?.length; i++) {
          if (this.users[i].email == this.signUpForm.value.email) {
            console.log("accept");
            this.check = false;
            this.text = "This Email Already Exits";
            return;
          }
        }
      }
      this.users.push(this.signUpForm.value);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.check = true;
      this.text = "Added Successfully";
      return;

    }
    this.check = false;
    this.text = "In-valid data";

  }


  closeDialogRef(){
    this.dialogRef.close();
  }

  login() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig;
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.panelClass = 'custom-container';
    this.dialog.open(LoginComponent, dialogConfig);
    
  }
}
