import { Subject } from 'rxjs/Subject';

export const player$ = new Subject();

export function playTune(song) {
    player$.next(song);
}