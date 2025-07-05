// src/app/interceptors/telemetry.interceptor.ts
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppInsightsService } from '../services/aplication-insigths-service';

@Injectable()
export class TelemetryInterceptor implements HttpInterceptor {
  private _appInsightsService = inject(AppInsightsService);

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const traceId = this._appInsightsService.appInsights.context?.telemetryTrace?.traceID;
    const spanId = this.generateSpanId();
    const traceparent = `00-${traceId}-${spanId}-01`; // formato W3C

    const tracedReq = req.clone({
      setHeaders: {
        traceparent
      }
    });

    return next.handle(tracedReq);
  }

  private generateSpanId(): string {
    // Genera un span ID válido (16 caracteres hex)
    return 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16));
  }
}
