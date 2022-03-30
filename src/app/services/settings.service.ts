import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector("#theme");

  constructor() {
    if (!localStorage.getItem("theme")) {
      const url = "./assets/css/colors/purple.css";
      this.linkTheme?.setAttribute("href", url);
      localStorage.setItem("theme", url);
    }

    const urlTheme = localStorage.getItem("theme");
    this.linkTheme?.setAttribute("href", urlTheme!);
  }

  changeTheme(theme: string) {


    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute("href", url);
    localStorage.setItem("theme", url);

    this.checkCurrentTheme();


  }

  checkCurrentTheme() {

    const links = document.querySelectorAll(".selector");

    links.forEach(element => {
      element.classList.remove("working")
      const btnTheme = element.getAttribute("data-theme");
      const btnThmeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute("href");

      if (btnThmeUrl === currentTheme) {
        element.classList.add("working")
      }
    })

  }
}
