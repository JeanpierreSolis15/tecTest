import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email: any;
  public password: any;
  public name: any;
  constructor(
    private fireService: PeticionesService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  signup() {
    this.fireService.signup({ email: this.email, password: this.password }).then(res => {
      if (res.user.uid) {
        let data = {
          email: this.email,
          password: this.password,
          name: this.name,
          uid: res.user.uid
        }
        this.fireService.saveDetails(data).then(res => {
        }, err => {
          console.log(err);
        })
      }
    }, err => {
      console.log(err);
    })
  }
}
