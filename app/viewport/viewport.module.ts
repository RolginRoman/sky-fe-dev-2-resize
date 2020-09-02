import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IfViewportSizeDirective } from "./viewport-size.directive";
import { ViewportResizeService } from "./viewport-resize.service";

@NgModule({
  imports: [CommonModule],
  exports: [IfViewportSizeDirective],
  declarations: [IfViewportSizeDirective],
  providers: [ViewportResizeService]
})
export class ViewportModule {}