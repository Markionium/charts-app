import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const songs$ = new BehaviorSubject([]);
songs$.next([
    { name: 'Bohemian Rhapsody by Queen', id: 'kPbbfmILrQo' },
    { name: 'I Love Rock and Roll by Joan Jett & the Foo Fighters', id: 'awZqg3aJOSU' },
    { name: 'Total Eclipse of the Heart by Bonnie Tyler', id: 'lcOxhH8N3Bo' },
    { name: 'From a Distance by Bette Midler', id: 'lN4AcFzxtdE' },
    { name: 'Gagnam Style by Psy', id: 'CH1XGdu-hzQ' },
    { name: 'Happy by Pharrell Williams', id: 'TIC9wgt4X_E' },
    { name: 'The Imperial March by John Williams', id: 'u7HF4JG1pOg' },
    { name: 'Let It Go by Idina Menzel', id: 'moSFlvxnbgk' },
    { name: 'O Fortuna by Carl Orff', id: 'GXFSK0ogeg4' },
    { name: 'Smooth Operator by Sade', id: '4TYv2PhG89A' },
    { name: 'Take it to the Limit by Eagles', id: 'pl9gZSIZqmQ' },
    { name: 'Vogue by Madonna', id: 'GuJQSAiODqI' },
]);

export default songs$;