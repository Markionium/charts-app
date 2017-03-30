import { Subject } from 'rxjs';

export const player$ = new Subject();

export function playTune(song) {
    player$.next(song);
}