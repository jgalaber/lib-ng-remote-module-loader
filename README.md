# lib-ng-remote-module-loader

### Overview

The **lib-ng-remote-module-loader** is designed to facilitate the dynamic loading of remote Angular modules and injecting them into the DOM. This allows for the integration of multiple micro frontends, each with its own internal routing, on a single route for the main app.
The library adapts the loading of remote Angular modules based on the @angular-architects/module-federation library and has been tested with Webpack 5.

### Features

- **_Dynamic Module Loading_**: Load Angular modules remotely and inject them into the DOM.
- **_Micro Frontend Integration_**: Combine multiple micro frontends on a single route, each maintaining its own internal routes.
- **_Seamless User Experience_**: Ensure a seamless user experience by integrating different micro frontends smoothly.

### Installation

To install the lib-ng-remote-module-loader library, use npm:

```shell
npm install lib-ng-remote-module-loader
```

### Usage

#### Importing the Module

First, import the _RemoteLoaderComponent_ in your Angular module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RemoteLoaderComponent } from 'lib-ng-remote-module-loader';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RemoteLoaderComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**_Using the remote-loader Component_**

You can use the remote-loader component in your templates to dynamically load and display remote modules:

```html
<remote-loader
  remoteEntry="http://localhost:4200/remoteEntry.js"
  exposedModule="MyRemoteModule"
>
</remote-loader>
```

**_Component Inputs_**

- **remoteEntry**: The URL from where the remote module will be loaded.
- **exposedModule**: The name of the module to be loaded.

### Exposing a Remote

Remote modules intended to be loaded by the remote-loader component can be implemented in two ways:

1. Implementing the LoadableApp Interface:

The LoadableApp interface must be implemented by remote modules. The EntryComponent should be the main component that will be rendered when the module is loaded.

```typescript
import { LoadableApp } from 'lib-ng-remote-module-loader';
```

The EntryComponent should be the main component that will be rendered when the module is loaded.

```typescript
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadableApp } from 'lib-ng-remote-module-loader';
import { MyEntryComponent } from './my-entry/my-entry.component';
import { FooComponent } from './foo/foo.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [MyEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: MyEntryComponent },
      { path: 'foo', component: FooComponent },
      { path: 'bar', component: BarComponent },
    ]),
  ],
})
export class MyRemoteModule implements LoadableApp {
  EntryComponent = MyEntryComponent;
}
```

2. Without Implementing the LoadableApp Interface:

Alternatively, remote modules can be loaded without implementing the LoadableApp interface. In this case, the module should configure the router to load an entry component at the root path ('') or redirect to a specific route (e.g., foo).

```typescript
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooComponent } from './foo/foo.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'foo' },
      { path: 'foo', component: FooComponent },
      { path: 'bar', component: BarComponent },
    ]),
  ],
})
export class MyRemoteModule {}
```

### Example

**_Loading Indicator_**

To display a loading indicator while the remote module is being loaded, you can use an ng-template:

```html
<remote-loader
  remoteEntry="http://localhost:4200/remoteEntry.js"
  exposedModule="MyRemoteModule"
>
  <ng-template #loading>
    <p>Loading...</p>
  </ng-template>
</remote-loader>
```

### License

This project is licensed under the MIT License - see the LICENSE file for details.
