import { Inject, inject, Injectable, signal } from '@angular/core';
import { DAY_PROVIDERS } from '../day-implementations/day.token';
import { DayImplementation } from '../day-implementations/base-day';
import { DayData, PartSolution } from '../models/day.model';
import { InputService } from './input.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { PartCompletionStatus } from '../utils/utils';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SolverService {
    private readonly inputService = inject(InputService);
    private implementationMap = new Map<number, DayImplementation>();

    allDayData = signal<DayData[]>([]);

    constructor(@Inject(DAY_PROVIDERS) implementations: DayImplementation[]) {
        const dayDataArray: DayData[] = [];

        for (const impl of implementations) {
            this.implementationMap.set(impl.dayNumber, impl);
            dayDataArray.push({
                dayNumber: impl.dayNumber,
                title: `Day ${impl.dayNumber}`,
                part1Solution: {
                    partCompletionStatus: PartCompletionStatus.NotStarted,
                },
                part2Solution: {
                    partCompletionStatus: PartCompletionStatus.NotStarted,
                },
            });
        }
        console.log(dayDataArray);
        this.allDayData.set(dayDataArray);
    }

    async solveDay(dayNumber: number): Promise<void> {
        this.getImplementation(dayNumber); // just to check it exists

        const part1Solution = await this.solvePart(dayNumber, 1);
        const part2Solution = await this.solvePart(dayNumber, 2);

        this.allDayData.update((daysData) => {
            const otherDays = daysData.filter((d) => d.dayNumber !== dayNumber);
            return [
                ...otherDays,
                {
                    dayNumber,
                    title: `Day ${dayNumber}`,
                    part1Solution: part1Solution,
                    part2Solution: part2Solution,
                },
            ];
        });
    }

    async solvePart(dayNumber: number, part: 1 | 2): Promise<PartSolution> {
        const dayImpl = this.getImplementation(dayNumber);
        const partImpl = part === 1 ? dayImpl.part1 : dayImpl.part2;

        const input = await firstValueFrom(
            this.inputService.getInputForDay(dayNumber)
        );

        const startTime = performance.now();
        const solution = partImpl(input);
        const endTime = performance.now();

        return {
            partCompletionStatus: PartCompletionStatus.Completed,
            solutionTimeInMs: endTime - startTime,
            solution,
        };
    }

    private getImplementation(dayNumber: number): DayImplementation {
        const impl = this.implementationMap.get(dayNumber);
        if (!impl) {
            throw new Error(`No implementation found for day ${dayNumber}`);
        }
        return impl;
    }
}
