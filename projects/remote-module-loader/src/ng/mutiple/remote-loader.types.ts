import { Type } from '@angular/core';

export interface LoadableApp {
  EntryComponent: Type<unknown>;
}

export interface AppRegistration {
  name: string;
  bundle: () => Promise<Type<LoadableApp>>;
}
