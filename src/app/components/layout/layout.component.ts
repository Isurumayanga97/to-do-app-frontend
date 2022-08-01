import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  name = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('firstName') || '';
  }

  logout() {
    localStorage.clear();
    if (confirm('Are you sure to logout?'))
      this.router.navigate(['/sign-in'])
  }
}
