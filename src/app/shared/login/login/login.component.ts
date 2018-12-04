import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SitefinityService} from '../../services/sitefinity.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showErrorMessage: boolean;

  constructor(private sitefinity: SitefinityService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(form.value) {
      const username = form.value.username;
      const password = form.value.password;

      if(username && password) {
        this.sitefinity.createInstance().then(
          (result) => {
            if (result === true) {
              this.router.navigate(['/']);
            } else {
              this.showErrorMessage = true;
            }
          },
          (error) => console.log(error)
        );
      }
    }
  }
}
