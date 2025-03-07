import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,AfterViewInit {
  @ViewChild('smartBar', { static: false })
  smartBar!: ElementRef<HTMLDivElement>;
  toggleDarkMode: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const hours = new Date().getHours();
    if (hours > 7 && hours < 19) {
      this.toggleDarkMode = true;
    } else {
      this.toggleDarkMode = false;
    }
    this.changeVariablePropertises();
  }

  ngAfterViewInit(): void {

    const toggle = document.querySelector('#toggle');
    const body = document.querySelector('body');
    const menuTel = document.querySelector('.nav-list');

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('on');
      menuTel.classList.toggle('menu-tel');
      body.classList.toggle('body-open-menu');
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        toggle.classList.remove('on');
        menuTel.classList.remove('menu-tel');
        body.classList.remove('body-open-menu');
        setTimeout(() => this.updateSmartBar(), 100); 
      }
    });

    // Met à jour la barre après un court délai lors du chargement
    setTimeout(() => this.updateSmartBar(), 100);
  }

  updateSmartBar() {
    const activeTab = document.querySelector(
      '.linkMenu.active'
    ) as HTMLElement | null;

    if (activeTab && this.smartBar) {
      this.smartBar.nativeElement.style.width = `${activeTab.scrollWidth}px`;
      this.smartBar.nativeElement.style.transform = `translateX(${activeTab.offsetLeft}px)`;
    }
  }
  toggleDarkLightMode() {
    this.toggleDarkMode = !this.toggleDarkMode;
    this.changeVariablePropertises();
  }

  changeVariablePropertises() {
    // soleil
    if (this.toggleDarkMode) {
      document.documentElement.style.setProperty('--text-color', '#090a0f');
      document.documentElement.style.setProperty('--black', '#f1f1f1');
      document.documentElement.style.setProperty('--background-gradient-1', '#f5f5f5');
      document.documentElement.style.setProperty('--background-gradient-2', '#c3c2cc');
      document.documentElement.style.setProperty('--text-color-green-flash', '#046737ef');
      document.documentElement.style.setProperty('--scroll-bar', '#046737ef');
    } else {
      document.documentElement.style.setProperty('--text-color', '#f1f1f1');
      document.documentElement.style.setProperty('--black', '#090a0f');
      document.documentElement.style.setProperty('--background-gradient-1', '#080808');
      document.documentElement.style.setProperty('--background-gradient-2', '#1f1e28');
      document.documentElement.style.setProperty('--text-color-green-flash', '#1aff91');
      document.documentElement.style.setProperty('--scroll-bar', '#00c566ef');


    }

  }
}
