import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { TestComponent } from "./test.component";
import { ViewportModule } from "./viewport/viewport.module";
import { ViewportConfigToken, IConfig } from "./viewport/viewport.config";

@NgModule({
  imports: [BrowserModule, ViewportModule],
  declarations: [AppComponent, TestComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: ViewportConfigToken,
      useValue: { medium: 200, large: 500 } as IConfig
    }
  ]
})
export class AppModule {}
