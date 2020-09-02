import { NgModule, ModuleWithProviders } from "@angular/core";
import { IfViewportSizeDirective } from "./viewport-size.directive";
import { ViewportResizeService } from "./viewport-resize.service";
import { IConfig, VIEWPORT_CONFIG_TOKEN } from "./viewport.config";

@NgModule({
  exports: [IfViewportSizeDirective],
  declarations: [IfViewportSizeDirective],
})
export class ViewportModule {
  static forRoot(config: IConfig): ModuleWithProviders {
    return {
      ngModule: ViewportModule,
      providers: [
        ViewportResizeService,
        { provide: VIEWPORT_CONFIG_TOKEN, useValue: config }
      ]
    }
  }
}