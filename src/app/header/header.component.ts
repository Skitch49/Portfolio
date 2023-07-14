import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const toggle = document.querySelector("#toggle");
    const body = document.querySelector("body"); // body
    const menuTel = document.querySelector(".nav-list"); // Nav menu tel

    toggle.addEventListener("click", () => {
      toggle.classList.toggle("on");
      menuTel.classList.toggle("menu-tel");
      body.classList.toggle("body-open-menu");
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Réinitialiser les valeurs des classes
        toggle.classList.remove("on");
        menuTel.classList.remove("menu-tel");
        body.classList.remove("body-open-menu");
      }
    });
  }
}
