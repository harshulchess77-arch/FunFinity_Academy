/**
 * Monitoring Service for FunFinity Academy
 * Provides application performance monitoring, error tracking, and analytics
 */

export interface Metric {
  name: string;
  value: number;
  timestamp: string;
  tags?: Record<string, string>;
}

export interface ErrorLog {
  id: string;
  message: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp: string;
  userId?: string;
  url?: string;
  userAgent?: string;
}

export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: string;
  userId?: string;
}

class MonitoringService {
  private static instance: MonitoringService;
  private metrics: Metric[] = [];
  private errors: ErrorLog[] = [];
  private performanceMetrics: PerformanceMetric[] = [];
  private isEnabled: boolean = true;

  private constructor() {
    this.initializeMonitoring();
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private initializeMonitoring(): void {
    // Initialize error tracking
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleGlobalError.bind(this));
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
      
      // Initialize performance monitoring
      this.observePerformance();
    }
  }

  private handleGlobalError(event: ErrorEvent): void {
    this.logError({
      id: `error-${Date.now()}`,
      message: event.message,
      stack: event.error?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    this.logError({
      id: `error-${Date.now()}`,
      message: 'Unhandled Promise Rejection',
      stack: String(event.reason),
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
  }

  private observePerformance(): void {
    if ('PerformanceObserver' in window) {
      // Observe navigation timing
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordPerformance('page_load', navEntry.loadEventEnd - navEntry.fetchStart);
            this.recordPerformance('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.fetchStart);
            this.recordPerformance('first_paint', navEntry.responseStart - navEntry.fetchStart);
          }
        }
      });
      navObserver.observe({ entryTypes: ['navigation'] });

      // Observe resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            this.recordPerformance('resource_load', resourceEntry.duration);
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
    }
  }

  logError(error: ErrorLog): void {
    if (!this.isEnabled) return;
    
    this.errors.push(error);
    
    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }

    // Send to external monitoring service in production
    if (import.meta.env.PROD) {
      this.sendErrorToMonitoring(error);
    }

    console.error('[Monitoring]', error.message, error);
  }

  recordMetric(name: string, value: number, tags?: Record<string, string>): void {
    if (!this.isEnabled) return;

    const metric: Metric = {
      name,
      value,
      timestamp: new Date().toISOString(),
      tags,
    };

    this.metrics.push(metric);
    
    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Send to external monitoring service in production
    if (import.meta.env.PROD) {
      this.sendMetricToMonitoring(metric);
    }
  }

  recordPerformance(name: string, duration: number): void {
    if (!this.isEnabled) return;

    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: new Date().toISOString(),
    };

    this.performanceMetrics.push(metric);
    
    // Keep only last 500 performance metrics
    if (this.performanceMetrics.length > 500) {
      this.performanceMetrics = this.performanceMetrics.slice(-500);
    }
  }

  trackPageView(page: string): void {
    this.recordMetric('page_view', 1, { page });
  }

  trackUserAction(action: string, context?: Record<string, any>): void {
    this.recordMetric('user_action', 1, { action, ...context });
  }

  trackApiCall(endpoint: string, duration: number, success: boolean): void {
    this.recordMetric('api_call', duration, {
      endpoint,
      success: success.toString(),
    });
  }

  trackError(error: Error, context?: Record<string, any>): void {
    this.logError({
      id: `error-${Date.now()}`,
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
  }

  private async sendErrorToMonitoring(error: ErrorLog): Promise<void> {
    // In production, send to external monitoring service (e.g., Sentry, LogRocket)
    // This is a placeholder for actual integration
    try {
      console.log('[Monitoring] Sending error to external service:', error);
      // Example: await Sentry.captureException(error);
    } catch (err) {
      console.error('[Monitoring] Failed to send error:', err);
    }
  }

  private async sendMetricToMonitoring(metric: Metric): Promise<void> {
    // In production, send to external monitoring service (e.g., Vercel Analytics, Mixpanel)
    // This is a placeholder for actual integration
    try {
      console.log('[Monitoring] Sending metric to external service:', metric);
      // Example: await analytics.track(metric.name, metric);
    } catch (err) {
      console.error('[Monitoring] Failed to send metric:', err);
    }
  }

  getMetrics(): Metric[] {
    return this.metrics;
  }

  getErrors(): ErrorLog[] {
    return this.errors;
  }

  getPerformanceMetrics(): PerformanceMetric[] {
    return this.performanceMetrics;
  }

  getErrorStats() {
    const totalErrors = this.errors.length;
    const errorsByType: Record<string, number> = {};
    
    this.errors.forEach(error => {
      const errorType = error.message.split(':')[0] || 'unknown';
      errorsByType[errorType] = (errorsByType[errorType] || 0) + 1;
    });

    return {
      totalErrors,
      errorsByType,
      recentErrors: this.errors.slice(-10),
    };
  }

  getPerformanceStats() {
    if (this.performanceMetrics.length === 0) {
      return {
        averagePageLoad: 0,
        averageResourceLoad: 0,
        totalMetrics: 0,
      };
    }

    const pageLoads = this.performanceMetrics.filter(m => m.name === 'page_load');
    const resourceLoads = this.performanceMetrics.filter(m => m.name === 'resource_load');

    const averagePageLoad = pageLoads.length > 0
      ? pageLoads.reduce((sum, m) => sum + m.duration, 0) / pageLoads.length
      : 0;

    const averageResourceLoad = resourceLoads.length > 0
      ? resourceLoads.reduce((sum, m) => sum + m.duration, 0) / resourceLoads.length
      : 0;

    return {
      averagePageLoad,
      averageResourceLoad,
      totalMetrics: this.performanceMetrics.length,
    };
  }

  clearMetrics(): void {
    this.metrics = [];
    this.errors = [];
    this.performanceMetrics = [];
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  isEnabledStatus(): boolean {
    return this.isEnabled;
  }
}

export const monitoringService = MonitoringService.getInstance();

// Convenience functions for easy access
export const trackError = (error: Error, context?: Record<string, any>) => {
  monitoringService.trackError(error, context);
};

export const trackPageView = (page: string) => {
  monitoringService.trackPageView(page);
};

export const trackUserAction = (action: string, context?: Record<string, any>) => {
  monitoringService.trackUserAction(action, context);
};

export const trackApiCall = (endpoint: string, duration: number, success: boolean) => {
  monitoringService.trackApiCall(endpoint, duration, success);
};

export const getMonitoringStats = () => ({
  errors: monitoringService.getErrorStats(),
  performance: monitoringService.getPerformanceStats(),
  metrics: monitoringService.getMetrics(),
});

