import { Component, inject, input } from '@angular/core';
import { DayData } from '../models/day.model';
import { PartCompletionStatus } from '../utils/utils';
import { SolverService } from '../service/solver.service';

@Component({
    selector: 'app-day-card',
    imports: [],
    templateUrl: './day-card.html',
    styleUrl: './day-card.scss',
})
export class DayCardComponent {
    private readonly solverService = inject(SolverService);

    readonly PartCompletionStatus = PartCompletionStatus;

    dayData = input.required<DayData>();

    getPartCompletionStatusText(status: PartCompletionStatus): string {
        switch (status) {
            case PartCompletionStatus.NotStarted:
                return 'Idle';
            case PartCompletionStatus.InProgress:
                return 'In Progress';
            case PartCompletionStatus.Completed:
                return '✅ Solved';
            default:
                return '';
        }
    }

    runDay(dayNumber: number): void {
        this.solverService.solveDay(dayNumber);
    }

    runPart1(dayNumber: number): void {
        this.solverService.solvePart(dayNumber, 1);
    }

    runPart2(dayNumber: number): void {
        this.solverService.solvePart(dayNumber, 2);
    }
}
