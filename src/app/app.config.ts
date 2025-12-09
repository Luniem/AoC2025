import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DAY_PROVIDERS } from './day-implementations/day.token';
import { Day01 } from './day-implementations/day01';
import { Day05 } from './day-implementations/day05';
import { Day06 } from './day-implementations/day06';
import { Day07 } from './day-implementations/day07';
import { Day08 } from './day-implementations/day08';
import { Day09 } from './day-implementations/day09';
import { Day10 } from './day-implementations/day10';
import { Day11 } from './day-implementations/day11';
import { Day12 } from './day-implementations/day12';
import { Day02 } from './day-implementations/day02';
import { Day03 } from './day-implementations/day03';
import { Day04 } from './day-implementations/day04';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        { provide: DAY_PROVIDERS, useClass: Day01, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day02, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day03, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day04, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day05, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day06, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day07, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day08, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day09, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day10, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day11, multi: true },
        { provide: DAY_PROVIDERS, useClass: Day12, multi: true },
    ],
};
