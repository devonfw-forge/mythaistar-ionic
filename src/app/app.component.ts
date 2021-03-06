import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { BookTablePage } from '../pages/book-table/book-table';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { find } from 'lodash';
import { config } from '../config';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { OrdersPage } from '../pages/orders/orders';
import { ReservationsPage } from '../pages/reservations/reservations';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  selector: 'public-main',
  templateUrl: 'app.html',
})
// tslint:disable-next-line:component-class-suffix
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;

  rootPage: any = HomePage;

  customerPages: Array<{ title: string; icon: string; component: any }>;
  waiterPages: Array<{ title: string; icon: string; component: any }>;
  selectableLangs: any[];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public dateTimeAdapter: DateTimeAdapter<any>,
    public events: Events,
    public auth: AuthProvider,
  ) {
    this.initializeApp();
    this.events.subscribe('navTo', (page: any) => {
      this.nav.setRoot(page);
    });

    this.selectableLangs = config.langs;

    this.waiterPages = [
      { title: 'ORDERS', icon: 'home', component: OrdersPage },
      {
        title: 'RESERVATIONS',
        icon: 'restaurant',
        component: ReservationsPage,
      },
    ];

    this.customerPages = [
      { title: 'HOME', icon: 'home', component: HomePage },
      { title: 'MENU', icon: 'restaurant', component: MenuPage },
      { title: 'BOOK TABLE', icon: 'bookmark', component: BookTablePage },
    ];

    translate.addLangs(config.langs.map((value: any) => value.value));
    translate.setDefaultLang('en');
    if (
      find(
        translate.getLangs(),
        (lang: string) => lang === translate.getBrowserLang(),
      )
    ) {
      translate.use(translate.getBrowserLang());
    }
    moment.locale(this.translate.currentLang);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.dateTimeAdapter.setLocale(lang);
    this.events.publish('languageChanged', lang);
  }
}
