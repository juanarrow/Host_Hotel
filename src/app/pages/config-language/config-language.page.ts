import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase-service';
import { LocaleService } from 'src/app/core/services/locale.service';

@Component({
  selector: 'app-config-language',
  templateUrl: './config-language.page.html',
  styleUrls: ['./config-language.page.scss'],
})
export class ConfigLanguagePage implements OnInit {
  language = 1; // 0 español, 1 inglés
  currentLanguage

  esMovil: boolean;
  esPc: boolean;
  
  constructor(private firebase:FirebaseService,
    private translate: TranslateService,
    private locale:LocaleService,
    public user:UserService,
    private router:Router,) { }

  ngOnInit() {
    this.onResize();
  }
  

  signOut(){
    this.user.signOut();
    this.router.navigate(['login']);
  }


  private async init(){
    this.translate. setDefaultLang('en');
  }
  ngAfterViewInit(): void {
  
  }

  onLanguage(languageCode: string) {
    this.translate.setDefaultLang(languageCode);
    this.locale.registerCulture(languageCode);
  }
  

   // Modo claro / oscuro
   OnToggleDarkMode() {
    document.body.setAttribute('color-theme', 'dark');
    console.log("Funciona")
  }

  OnToggleLightMode() {
    document.body.setAttribute('color-theme', 'light');
    console.log("Funciona")
  }

  // Esta función se ejecuta cada vez que se redimensiona la pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.esMovil = window.innerWidth < 768; // Si el ancho de la pantalla es mayor a 768, se considera que se está en una pantalla de escritorio
    this.esPc = window.innerWidth > 768; // Si el ancho de la pantalla es mayor a 768, se considera que se está en una pantalla de escritorio
  }

}
