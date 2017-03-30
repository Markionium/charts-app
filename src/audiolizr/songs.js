import { BehaviorSubject } from 'rxjs';

const songs$ = new BehaviorSubject([]);
songs$.next([
    { name: 'Bohemian Rhapsody by Queen', id: 'Ys304bfdo2g' },
    { name: 'Day-O by Harry Belafonte', id: 'Fx-EfjsRcBk' },
    { name: 'I Feel Good by James Brown', id: 'RhU9MZ98jxo' },
    { name: `It's all about the Pentiums by Weird Al`, id: 'papuvlVeZg8' },
    { name: 'Glory by John Legend and Common', id: 'txOtZfq04-4' },
    { name: 'Mr. Roboto by Styx', id: 'FG9M0aEpJGE' },
    { name: 'Particle Man by They Might be Giants', id: 'RhU9MZ98jxo' },
    { name: 'She Blinded Me With Science by Thomas Dolby', id: 'papuvlVeZg8' },
    { name: `Survivor by Destiny's Child`, id: 'txOtZfq04-4' },
    { name: 'We are the World by USA for Africa', id: 'FG9M0aEpJGE' },
]);

export default songs$;