import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  users: any[] = [];
  loginForm: FormGroup;
  check :boolean | undefined;
  text:string|undefined;
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }
    )
  }

  // loginForm = new FormGroup({
  //   email: new FormControl(""),
  //   password: new FormControl(""),

  // })

  logIn() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.users = JSON.parse(localStorage.getItem('users')!);
      for (let i = 0; i < this.users?.length; i++) {
        if (this.users[i].email == this.loginForm.value.email && this.users[i].password == this.loginForm.value.password) {
          this.check=true;
          this.text="Login Successfully";
          console.log("accept");
          // this.dialogRef.close();
        }
        else{
          this.check=false;
          this.text = "Check your Email and Password"
        }
      }
    }
    else{
      this.check=false;
      this.text = "In-valid Data"
    }
    
  }

  signUp() {
    // this.dialog.closeAll();
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig;
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.panelClass = 'custom-container';
    this.dialog.open(SignupComponent, dialogConfig);

  }

  closeDialogRef(){
    this.dialogRef.close();
  }

}
