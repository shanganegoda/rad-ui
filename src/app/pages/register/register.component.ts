import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  constructor(private toastr: ToastrService) { }

  ngOnInit() {

  }
  signuUpClick() {
    if (this.name === "" || this.email === "" || this.password === "") {
      this.toastr.error("Registration failed.Please check the fields again.");

    }
    else {
      this.toastr.success("You have succesfully registered to the system.");

    }

  }

}
