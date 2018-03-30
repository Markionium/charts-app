import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const songs$ = new BehaviorSubject([]);
songs$.next([
    { name: 'Bohemian Rhapsody by Queen', id: 'kPbbfmILrQo' },
    { name: 'From a Distance by Bette Midler', id: 'lN4AcFzxtdE' },
    { name: 'Happy by Pharrell Williams', id: 'TIC9wgt4X_E' },
    { name: 'Let It Go by Idina Menzel', id: 'moSFlvxnbgk' },
    { name: 'I Love Rock and Roll by Joan Jett & the Foo Fighters', id: 'awZqg3aJOSU' },
    { name: 'The Imperial March by John Williams', id: 'u7HF4JG1pOg' },
    { name: 'Smooth Operator by Sade', id: '4TYv2PhG89A' },
    { name: 'Take it to the Limit by Eagles', id: 'pl9gZSIZqmQ' },
    { name: 'Total Eclipse of the Heart by Bonnie Tyler', id: 'lcOxhH8N3Bo' },
    { name: 'Vogue by Madonna', id: 'GuJQSAiODqI' },
]);

export default songs$;