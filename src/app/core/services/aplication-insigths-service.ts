// src/app/services/app-insights.service.ts
import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  public appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: '',
        enableAutoRouteTracking: true,
        enableCorsCorrelation: true
      }
    });

    // Agregar un initializer global para incluir el "roleName"
    this.appInsights.addTelemetryInitializer((envelope) => {
      envelope.tags = envelope.tags || {};
      const roleNameKey = 'ai.cloud.role'; // Using string literal instead of accessing keys property
      envelope.tags[roleNameKey] = 'Coordinacion-FrontEnd-Catering'; // RoleName personalizado
    });

    this.appInsights.loadAppInsights();
  }

  // Métodos de utilidad (opcional)
  public logEvent(name: string, properties?: Record<string, unknown>) {
    this.appInsights.trackEvent({ name }, properties);
  }

  public logException(error: Error, severityLevel?: number) {
    this.appInsights.trackException({ exception: error, severityLevel });
  }

  public logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
  }
}
