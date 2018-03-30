import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { askForGooglePermission, searchYouTubeFor, checkIfAuthorized } from './YouTubeSearch';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { favorites$ } from './favorites';
import { Tunez } from './Tunez';
import { authSubject$, handleLogin } from './YouTubeSearch';

const searchSubject = new Subject();

const searchResults$ = searchSubject
    .debounceTime(500)
    .filter(value => value.length > 3)
    .flatMap(value => Observable.fromPromise(searchYouTubeFor(value)))
    .map(resultsToTunez)
    .combineLatest(favorites$, (songs, favorites) => ({ songs, favorites }))
    .map(({ songs, favorites }) => songs.map(song => {
        const favoriteNumberFromName = favHash(song.name, favorites.length);
        const favorite = favorites[favoriteNumberFromName];

        return {
            ...song,
            favorite,
        };
    }));

searchResults$.subscribe(results => {
    console.log('results came in!');
    console.log(results);
});
    

function resultsToTunez(youtubeApiResults) {
    if (!youtubeApiResults) {
        return [];
    }
    return (youtubeApiResults.items || [])
        .map((youtubeResult) => {
            return {
                id: youtubeResult.id.videoId,
                name: youtubeResult.snippet.title
            };
        });
}

const enterYoutubeLinkStyles = {
    wrap: {
        width: '100%',
        minHeight: '50px',
        display: 'flex',
    },
    root: {
        marginLeft: '3rem',
    },
    input: {
        color: 'white',
    },
    hint: {
        color: 'rgba(255,255,255,0.6)',
    },
    underlineStyle: {

    },
    underlineFocusStyle: {
        borderBottomColor: 'goldenrod',
    },
};

export default class YouTubeSearchField extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isAuthorized: false,
            search: "",
            results: [],
        };
    }

    componentDidMount() {
        this.setState({
            isAuthorized: checkIfAuthorized()
        });

        askForGooglePermission()
            .then(() => {
                this.setState({ isAuthorized: true });
            })
            .catch(() => this.setState({ isAuthorized: false }));

        this.subscription = searchResults$
            .subscribe(tunez => {
                this.setState({
                    ...this.state,
                    results: tunez
                        .map(song => {  
                            return {
                                ...song,
                                onTuneSelect: () => this.props.onTuneSelect(song),
                            };
                        }),
                });
            });

        this.authSubscription = authSubject$
            .subscribe((user) => {
                console.log('User from subject', user);
                this.setState({
                    isAuthorized: true,
                });
            });
    }

    componentWillUnMount() {
        this.subscription.unsubscribe(); 
        this.authSubscription.unsubscribe(); 
    }

    render() {
        if (!this.state.isAuthorized) {
            return <RaisedButton label="or login to YouTube to search (you might need to allow popups and refresh)!" onClick={this._authorize} />
        }

        return (
            <div>
                <div style={enterYoutubeLinkStyles.wrap}>
                    <TextField
                        name="SearchField"
                        hintText="or search the YouTubez for more music! :D"
                        value={this.state.search}
                        onChange={this._setSearchValue}
                        style={enterYoutubeLinkStyles.root}
                        inputStyle={enterYoutubeLinkStyles.input}
                        hintStyle={enterYoutubeLinkStyles.hint}
                        underlineStyle={enterYoutubeLinkStyles.underlineStyle}
                        underlineFocusStyle={enterYoutubeLinkStyles.underlineFocusStyle}
                        fullWidth
                    />
                </div>
                {this.state.results.length ? <SearchResults tunez={this.state.results} /> : !this.state.search ? <div className="fourtyEightPadding">Type above to search</div> : null}
            </div>
        )
    }

    _authorize = () => {
        handleLogin()
            .then(() => {
                this.setState({
                    isAuthorized: true,
                });
            })
    }

    _setSearchValue = (event, value) => {
        this.setState({
            ...this.state,
            search: event.target.value,
        });

        searchSubject.next(event.target.value);
    }
}

function SearchResults({ tunez }) {
    return (
        <div>
            <h1>Search results</h1>
            <Tunez songs={tunez} />
        </div>
    );
}