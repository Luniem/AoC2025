import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InputService {
    private readonly http = inject(HttpClient);

    private inputCache = new Map<number, string>();

    getInputForDay(dayNumber: number): Observable<string> {
        const url = `input${dayNumber}.txt`;

        const inputFromCache = this.inputCache.get(dayNumber);
        if (inputFromCache) {
            return new Observable<string>((observer) => {
                observer.next(inputFromCache);
                observer.complete();
            });
        }

        return this.http.get(url, { responseType: 'text' }).pipe(
            tap((input) => {
                this.inputCache.set(dayNumber, input);
            }),
            catchError(() => {
                throw new Error(`Failed to load input for day ${dayNumber}`);
            })
        );
    }
}
