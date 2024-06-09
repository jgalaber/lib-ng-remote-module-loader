import { Compiler, Injectable, Injector, NgModuleRef } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { AppPlatformLocation } from './app-platform-location.service';
import { Router } from '@angular/router';
import { AppRegistration, LoadableApp } from '../../remote-loader.types';

@Injectable({
  providedIn: 'root',
})
export class AppLoaderService {
  constructor(private compiler: Compiler) {}

  createParentInjector(injector: Injector): Injector {
    return Injector.create({
      providers: [
        {
          provide: Router,
          useValue: null,
        },
        {
          provide: PlatformLocation,
          useClass: AppPlatformLocation,
          deps: [],
        },
      ],
      parent: injector,
    });
  }

  createNgModuleRef(
    registration: AppRegistration,
    injector: Injector,
  ): Promise<NgModuleRef<LoadableApp>> {
    return registration
      .bundle()
      .then(loadableApp => this.compiler.compileModuleAsync(loadableApp))
      .then(ngModuleFactory => ngModuleFactory.create(this.createParentInjector(injector)));
  }
}
