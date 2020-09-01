import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TestComponent } from "./test.component";
import { ViewportModule } from "./viewport.module";
import { ViewportConfigToken, IConfig } from "./viewport.config";

@NgModule({
  imports: [BrowserModule, FormsModule, ViewportModule],
  declarations: [AppComponent, HelloComponent, TestComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: ViewportConfigToken,
      useValue: { medium: 1, large: 2 } as IConfig
    }
  ]
})
export class AppModule {}
