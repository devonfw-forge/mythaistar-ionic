import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'own-home-card',
  templateUrl: './home-card.html',
  styles: ['./home-card.scss'],
})
export class HomeCardComponent {
  @Input()
  tile: Tile;
  @Output('buttonClick')
  buttonEmitter: EventEmitter<Event> = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    this.buttonEmitter.emit(event);
  }
}

export interface Tile {
  titleKey: string;
  contentKey: string;
  img: string;
  buttonLabelKey: string;
}
