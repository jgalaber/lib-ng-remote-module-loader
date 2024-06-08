import { Directive, Input, NgModuleRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { LoadableApp } from '../../remote-loader.types';
import { Router } from '@angular/router';
import { RouterInitializerComponent } from '../components/router-initializer/router-initializer.component';

@Directive({
  selector: '[renderApp]',
  standalone: true,
})
export class RenderAppDirective implements OnDestroy {
  currentNgModuleRef?: NgModuleRef<unknown>;

  @Input() set renderApp(ngModuleRef: NgModuleRef<LoadableApp> | null) {
    if (!ngModuleRef || this.currentNgModuleRef) {
      return;
    }
    this.currentNgModuleRef = ngModuleRef;
    const injector = ngModuleRef.injector;
    const router = ngModuleRef.injector.get(Router, null);

    const componentRef = this.viewContainerRef.createComponent(
      ngModuleRef.instance.EntryComponent ?? RouterInitializerComponent,
      { injector },
    );
    componentRef.changeDetectorRef.detectChanges();
    router?.initialNavigation();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private readonly viewContainerRef: ViewContainerRef) {}

  ngOnDestroy() {
    if (this.currentNgModuleRef) {
      this.currentNgModuleRef.destroy();
      this.currentNgModuleRef = undefined;
    }
  }
}
