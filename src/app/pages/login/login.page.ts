import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: any;
  public password: any;
  constructor(
    private fireService: PeticionesService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this.fireService.loginWithEmail({ email: this.email, password: this.password }).then(res => {
      console.log(res);
      if (res.user.uid) {
        this.fireService.getDetails({ uid: res.user.uid }).subscribe(res => {
          console.log(res);
          this.router.navigate(['home'])
        }, err => {
          console.log(err);
        });
      }
    }, err => {
      console.log(err);
    })
  }


  signup() {
    this.router.navigateByUrl('register');
  }

}
