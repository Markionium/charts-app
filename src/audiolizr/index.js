import React from 'react';
import { render } from 'react-dom';
import Audiolizr from './Audiolizr';
import speaker from '../images/speaker.png';
import { loadFavorites, getFavorites } from './favorites';
import './YouTubeSearch';

export default function audiolizr(appManager) {
    return function (i18n) {
        loadFavorites(appManager.getApiPath());

        allFavorites = getFavorites();

        render(
            <Audiolizr />,
            document.getElementById('audiolizr')
        );

        const musicNotes = document.createElement('div');
        musicNotes.classList.add('falling-notes');

        const notes = new Array(25).fill('<span></span>').join('');

        musicNotes.innerHTML = notes;

        document.querySelector('body')
            .appendChild(musicNotes);

        appManager.appName = i18n.data_visualizer = 'Data Audiolizer';

        return function () {
            // Collapse the accordion... we don't need that for tunezzzz
            $('#button-1472').click();

            // Keep tunin with smaller speakers
            Array.from(document.querySelectorAll('.speaker'))
                .forEach(element => element.classList.add('speaker__chart-loaded'));

            window.speakers = {
                blastIt() {
                    Array.from(document.querySelectorAll('.speaker'))
                        .forEach(element => element.classList.add('speaker-boom'));
                },
                beBoring() {
                    Array.from(document.querySelectorAll('.speaker'))
                        .forEach(element => element.classList.remove('speaker-boom'));
                }
            }
        };
    };
}