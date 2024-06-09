/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LocationChangeListener, PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class AppPlatformLocation implements PlatformLocation {
  hash = '';
  readonly hostname: string = '';
  readonly href: string = '';
  readonly pathname: string = '';
  readonly port: string = '';
  readonly protocol: string = '';
  readonly search: string = '';

  private hashChangeListeners: LocationChangeListener[] = [];
  private popStateListeners: LocationChangeListener[] = [];

  back(): void {}

  forward(): void {}

  getBaseHrefFromDOM(): string {
    return '';
  }

  getState(): unknown {
    return undefined;
  }

  onHashChange(fn: LocationChangeListener): VoidFunction {
    this.hashChangeListeners.push(fn);
    return () => {
      this.hashChangeListeners = this.hashChangeListeners.filter(listener => listener !== fn);
    };
  }

  onPopState(fn: LocationChangeListener): VoidFunction {
    this.popStateListeners.push(fn);
    return () => {
      this.popStateListeners = this.popStateListeners.filter(listener => listener !== fn);
    };
  }

  pushState(state: unknown, title: string, url: string): void {}

  replaceState(state: unknown, title: string, url: string): void {}
}
