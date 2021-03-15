import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  roles = null;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    this.auth.idTokenClaims$.subscribe((claims) => {
		console.log("claims="+JSON.stringify(claims, null, 2));
		if (claims) {
			console.log("claims['https://menu-api.example.com/roles']="+JSON.stringify(claims['https://menu-api.example.com/roles'], null, 2))
			this.roles = claims? claims['https://menu-api.example.com/roles'] : null; 
			console.log("roles[0]=" + this.roles[0]);
		}
	});
  }

  hasPingRole() {
	return this.roles && this.roles.indexOf('ping-nodejs-api') > -1;
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
