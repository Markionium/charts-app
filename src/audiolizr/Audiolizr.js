import React, { Component } from 'react';
import plyr from 'plyr';
import 'plyr/dist/plyr.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ListIcon from 'material-ui/svg-icons/av/library-music';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-downward';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import Card from 'material-ui/Card';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import mapPropsStream from 'recompose/mapPropsStream';
import rxjsconfig from 'recompose/rxjsObservableConfig';
import setObservableConfig from 'recompose/setObservableConfig';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { favorites$ } from './favorites';
import { playTune, player$ } from './player';
import Dhis2nzLogo from './Dhis2nzLogo';
import songs$ from './songs';
import EnterYoutubeLink from './EnterYoutubeLink';
import NowPlaying from './NowPlaying';
import YouTubeSearchField from './YouTubeSearchField';
import { Tunez, Tune } from './Tunez';

player$.subscribe(song => window.console && console.log(song));

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
setObservableConfig(rxjsconfig);
injectTapEventPlugin();

let player;
let eventsSet = false;
class AudioPlayer extends Component {
    constructor(props, context) {
        super(props, context);

        this.setRef = this.setRef.bind(this);
    }

    setRef(element) {
        console.log('setting ref!');
        console.log(element);
        this.playerElement = element;
        const [playerInstance] = plyr.setup(this.playerElement, { autoplay: true, fullscreen: { enabled: false } });
        player = playerInstance;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        console.log('load', nextProps.player.id);

        try {
            player.source({
                type:       'video',
                title:      'Example title',
                sources: [{
                    src:    nextProps.player.id,
                    type:   'youtube'
                }]
            });

            if (!eventsSet) {
                try {
                    player.on('play', function(event) {
                        if (noteHue != 'not started') {
                            speakers.blastIt();
                            $('.falling-notes').css('display', 'block');
                        }
                    });

                    player.on('pause', function(event) {
                        speakers.beBoring();
                        $('.falling-notes').css('display', 'none');
                    });
                } catch (e) {
                    // No speakers when the requests fail
                }
            }

            // Turn the speakers on!
            setTimeout(() => speakers.blastIt(), 8000);
            startIntervals();

        } catch (e) {
            // When testing offline this will be called.... or when offline.. :P
            alert('No youtube! :( please e-mail jan@dhis2.org');
        }
    }

    render() {
        return (
            <div className="audiolizr--player">
                <div>{this.props.player.name}</div>
                <div 
                    id="plyr-player"
                    ref={this.setRef}
                    data-type="youtube"
                    data-video-id=""
                ></div>
            </div>
        );
    }
}

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

const Title = ({children}) => (<h1 className="audiolizr--overlay--title">{children}</h1>);

function Overlay({ open, actions, children, onRequestClose }) {
    if (!open) {
        return null;
    }

    return (
        <div className="audiolizr--overlay">
            <div className="audiolizr--overlay--header">
                <div className="audiolizr--overlay--logo">
                    <Dhis2nzLogo width={200} />
                </div>
                <div className="audiolizr--overlay--actions">
                    {actions}
                </div>
            </div>
            <div className="audiolizr--overlay--content">
                <Title>Welcome! Pick a tune to audiolize your data, and then click along with the beat!</Title>
                <YouTubeSearchField onTuneSelect={(song) => {
                            playTune(song);
                            global.refs.instanceManager.getById(song.favorite.id);
                            onRequestClose();
                        }} />
                {children}
            </div>
        </div>
    );
}

function TunezControls({ open, onRequestClose, onListClick, songs, showTooltip }) {
    return (
        <div className="tunez-controls">
            {showTooltip ? <div className="audiolizr--tooltip">
                Analyse more data with 2NZ here!!!
                <DownArrow color="white" style={{ width: '50px', height: '50px' }} />
            </div>: null}
            <IconButton onClick={onListClick} style={{ width: '75px', width: '75px' }} iconStyle={{ width: '50px', height: '50px' }}>
                <ListIcon color="white" />
            </IconButton>
            <Overlay
                open={open}
                onRequestClose={onRequestClose}
                actions={[
                    <IconButton key="Close" onClick={onRequestClose}>
                        <CloseIcon color="white" />
                    </IconButton>
                ]}
            >
                <div>
                    <h1>2nz we recommend:</h1>
                    <Tunez songs={songs} />
                </div>
            </Overlay>
        </div>
    );
}

const songsWithFavorites$ = songs$
    .combineLatest(favorites$, (songs, favorites) => ({ songs, favorites }))
    .map(({ songs, favorites }) => songs.map(song => {
        const favoriteNumberFromName = favHash(song.name, favorites.length);
        const favorite = favorites[favoriteNumberFromName];

        return {
            ...song,
            favorite,
        };
    }));

const AudiolizrTunezControls = compose(
    withState('open', 'setOpen', true),
    withState('showTooltip', 'setShowTooltip', true),
    withHandlers({
        onRequestClose: ({ setOpen }) => () => setOpen(false),
        onListClick: ({ setOpen, setShowTooltip }) => () => {
            setShowTooltip(false);
            setOpen(true);
        },
    }),
    mapPropsStream(props$ => props$
        .combineLatest(
            songsWithFavorites$,
            (props, songs) => ({ ...props, songs })
        )
        .map(({ songs, onRequestClose, ...props }) => {
            return {
                ...props,
                onRequestClose,
                songs: songs
                    .map(song => ({
                        ...song,
                        onTuneSelect() {
                            playTune(song);
                            global.refs.instanceManager.getById(song.favorite.id);
                            onRequestClose();
                        }
                    }))
            }
        }),
    )
)(TunezControls);

const AudioPlayerForTunez = compose(
    mapPropsStream(props$ => props$
        .combineLatest(player$.startWith({}), (props, player) => ({ ...props, player }))
    )
)(AudioPlayer);

export default function Audiolizr() {
    return (
        <MuiThemeProvider>
            <div className="audiolizr--root">
                <AudioPlayerForTunez />
                <AudiolizrTunezControls />
                <NowPlaying />
            </div>
        </MuiThemeProvider>
    );
}
