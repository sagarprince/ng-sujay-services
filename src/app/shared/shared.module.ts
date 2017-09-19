// Core Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// Custom Modules
import { 
  SweetAlertModule, 
  DataTablesModule, 
  AlertModule, 
  ToastrModule 
} from './modules';

// Custom Directives
import { RippleEffectDirective, DatePickerDirective } from './directives';

// Services
import { 
  ComponentFactoryService, 
  EmitterService, 
  SessionService, 
  RestApiProvider, 
  CacheService,
  UtilitiesService
} from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    SweetAlertModule,
    DataTablesModule,
    AlertModule,
    ToastrModule
  ],
  declarations: [
    RippleEffectDirective,
    DatePickerDirective
  ],
  exports: [
    SweetAlertModule,
    DataTablesModule,
    RippleEffectDirective,
    DatePickerDirective,
    AlertModule,
    ToastrModule
  ],
  providers: [
    ComponentFactoryService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [
              EmitterService,
              SessionService,
              RestApiProvider,
              CacheService,
              UtilitiesService
          ]
      };
  }
}
