import { InjectionToken } from '@angular/core';
import { DayImplementation } from './base-day';

export const DAY_PROVIDERS = new InjectionToken<DayImplementation[]>(
    'DAY_PROVIDERS'
);
