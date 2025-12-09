import { PartCompletionStatus } from '../utils/utils';

export interface DayData {
    title: string;
    dayNumber: number;
    part1Solution: PartSolution;
    part2Solution: PartSolution;
}

export interface PartSolution {
    partCompletionStatus: PartCompletionStatus;
    solution?: string;
    solutionTimeInMs?: number;
}
