import {
  Directive,
  OnInit,
  Input,
  Optional,
  Inject,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { ViewportConfigToken, IConfig } from "./viewport.config";
import { ViewportResizeService } from "./viewport-resize.service";
import { filter, map } from "rxjs/operators";

const enum ViewportBoundaries {
  SMALL = "small", MEDIUM = "medium", LARGE = "large"
}

const widthPredicate = (config: IConfig, boundary: ViewportBoundaries) => {
  return ({width}) => {
    switch (boundary) {
      case ViewportBoundaries.SMALL: {
        return width < config.medium;
      }
      case ViewportBoundaries.MEDIUM: {
        return config.medium <= width < config.large;
      }
      case ViewportBoundaries.LARGE: {
        return config.large <= width;
      }
      default: {
        return false; 
      }
    }
  }
}

@Directive({
  selector: "[ifViewportSize]"
})
export class IfViewportSizeDirective implements OnInit {
  @Input("ifViewportSize")
  public ifViewportSize: ViewportBoundaries;

  constructor(
    @Optional() @Inject(ViewportConfigToken) private viewportConfig: IConfig,
    private template: TemplateRef,
    private vcr: ViewContainerRef,
    private viewportService: ViewportResizeService
  ) {
    if (!viewportConfig) {
      throw new Error("Provider for @IConfig doesn't found");
    }
  }

  ngOnInit() {
    const predicate = widthPredicate(this.viewportConfig, this.ifViewportSize);
    this.viewportService.resize$
      .pipe(map(predicate))
      .subscribe(shouldRender => {
        if (shouldRender) {
          this.vcr.createEmbeddedView(this.template);
        } else {
          this.vcr.clear();
        }
      });
  }
}
