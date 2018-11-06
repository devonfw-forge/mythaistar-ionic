import { Injectable } from '@angular/core';

function getWindow(): Window {
  return window;
}

@Injectable()
export class WindowProvider {
  get nativeWindow(): Window {
    return getWindow();
  }

  responsiveWidth(): string {
    return getWindow().innerWidth > 800 ? '40%' : '80%';
  }
}
