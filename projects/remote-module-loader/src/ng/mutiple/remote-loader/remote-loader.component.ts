import { Component, Injector, Input, NgModuleRef, OnInit } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { AppLoaderService } from './services/app-loader.service';
import { AppRegistration, LoadableApp } from '../remote-loader.types';

import { RenderAppDirective } from './directives/render-directive.directive';
import { RemoteEntryType } from '../../types';

@Component({
  standalone: true,
  selector: 'remote-loader',
  templateUrl: './remote-loader.component.html',
  imports: [RenderAppDirective],
})
export class RemoteLoaderComponent implements OnInit {
  @Input() exposedModule!: string;
  @Input() remoteEntry!: RemoteEntryType;

  ngModuleRef!: NgModuleRef<LoadableApp>;

  constructor(
    readonly injector: Injector,
    private readonly appLoader: AppLoaderService,
  ) {}

  async ngOnInit(): Promise<void> {
    const appRegistration: AppRegistration = {
      name: this.exposedModule,
      bundle: () =>
        loadRemoteModule({
          exposedModule: this.exposedModule,
          remoteEntry: this.remoteEntry,
          type: 'module',
        }).then(m => m[this.exposedModule]),
    };

    this.ngModuleRef = await this.appLoader.createNgModuleRef(appRegistration, this.injector);
  }
}
