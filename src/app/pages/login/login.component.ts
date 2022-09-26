import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email:string='';
  password:string='';

  constructor(private toastr:ToastrService,private router:Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  SignInClick(){
if(this.email==="shanganegoda96@gmail.com" && this.password==="123"){
  this.router.navigateByUrl('/select-vehicle');

}
else{
  this.toastr.error("Login process encountered an error.Please check your credentials again.");
}
  }
}
