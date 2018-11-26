import { Component } from '@angular/core';
import { WindowProvider } from '../../providers/window/window';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { UserAreaProvider } from '../../providers/user-area/user-area';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { OrderProvider } from '../../providers/order/order';
import { config } from '../../config';
import {
  Events,
  PopoverController,
  MenuController,
  ModalController,
} from 'ionic-angular';
import { LoginPopoverComponent } from './login-popover/login-popover';
import { AccountPopoverComponent } from './account-popover/account-popover';
import { OrderModalComponent } from '../order-modal/order-modal';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  styles: ['header.scss'],
})
export class HeaderComponent {
  selectableLangs: any[];
  flag: string;

  constructor(
    public window: WindowProvider,
    public translate: TranslateService,
    public order: OrderProvider,
    public auth: AuthProvider,
    public userProvider: UserAreaProvider,
    public dateTimeAdapter: DateTimeAdapter<any>,
    public events: Events,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
  ) {
    this.selectableLangs = config.langs;
    this.getFlag(this.translate.currentLang);
    this.dateTimeAdapter.setLocale(this.translate.currentLang);
    events.subscribe('languageChanged', (lang) => this.getFlag(lang));
  }

  getFlag(lang: string): void {
    switch (lang) {
      case 'ca':
        this.flag = 'es';
        break;
      case 'en':
        this.flag = 'gb';
        break;
      case 'hi':
        this.flag = 'in';
        break;

      default:
        this.flag = lang;
        break;
    }
  }

  openLoginPopover(): void {
    let popover = this.popoverCtrl.create(LoginPopoverComponent);
    popover.present();
  }

  openAccountPopover(event): void {
    let popover = this.popoverCtrl.create(AccountPopoverComponent);
    popover.present({ ev: event });
  }

  openOrderModal(): void {
    let modal = this.modalCtrl.create(OrderModalComponent);
    modal.present();
  }
}