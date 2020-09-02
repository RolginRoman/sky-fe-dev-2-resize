import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { TestComponent } from "./test.component";
import { ViewportModule } from "./viewport/viewport.module";
import { IConfig } from "./viewport/viewport.config";

const config: IConfig = { medium: 700, large: 1500 };

@NgModule({
  imports: [BrowserModule, ViewportModule.forRoot(config)],
  declarations: [AppComponent, TestComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
