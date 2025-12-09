import { Component, inject, signal } from '@angular/core';
import { SolverService } from './service/solver.service';
import { DayCardComponent } from './day-card/day-card';

@Component({
    selector: 'app-root',
    imports: [DayCardComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    private solverService = inject(SolverService);

    allDaysData = this.solverService.allDayData;
}
