import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Open Sentencing';
  isCurrentPage = true;
  hasHamburger = false;

  @Input() isLoggedIn;
  @Input() user;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigateByUrl('/logout');
    return;
  }

  expanded(value) {
    // TODO: porcess hamburger event here
  }
}
