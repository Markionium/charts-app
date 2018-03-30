import { ReplaySubject } from 'rxjs/ReplaySubject';

export const favorites$ = new ReplaySubject(1);

export function loadFavorites(apiUrl) {
    jQuery.getJSON(`${apiUrl}/charts.json?fields=id,displayName%7Crename(name),lastUpdated,access,title,description&order=name:asc&_dc=1490723565834&paging=false&filter=relativePeriods.thisYear:eq:false&filter=created:lt:2016-01-01`)
        .then(( favorites ) => favorites$.next(favorites.charts));
}

export function getFavorites() {
	return favorites$;
}