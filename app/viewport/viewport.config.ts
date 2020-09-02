import { InjectionToken } from "@angular/core";

export interface IConfig {
  readonly medium: number;
  readonly large: number;
}

export const ViewportConfigToken = new InjectionToken<IConfig>('Viewport Config Token');