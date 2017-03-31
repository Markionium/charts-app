import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const songs$ = new BehaviorSubject([]);
songs$.next([
    { name: 'Bohemian Rhapsody by Queen', id: 'fJ9rUzIMcZQ' },
    { name: 'Day-O by Harry Belafonte', id: '6Tou8-Cz8is' },
    { name: 'I Feel Good by James Brown', id: 'PJqKkZ1VVMk' },
    { name: `It's all about the Pentiums by Weird Al`, id: 'qpMvS1Q1sos' },
    { name: 'Glory by John Legend and Common', id: 'HUZOKvYcx_o' },
    { name: 'Mr. Roboto by Styx', id: '3cShYbLkhBc' },
    { name: 'Particle Man by They Might be Giants', id: 'LsAiCs66l40' },
    { name: 'She Blinded Me With Science by Thomas Dolby', id: 'Y2VNxmn0lNA' },
    { name: `Survivor by Destiny's Child`, id: 'Wmc8bQoL-J0' },
    { name: 'The Chainsmokers - Paris', id: 'RhU9MZ98jxo' },
]);

export default songs$;