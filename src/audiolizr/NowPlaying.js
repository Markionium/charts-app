import React from 'react';
import mapPropsStream from 'recompose/mapPropsStream';
import { player$ } from './player';
import Paper from 'material-ui/Paper';
import renderNothing from 'recompose/renderNothing';
import { Observable } from 'rxjs/Observable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';

const imgStyle = {
    minWidth: 250,
    minHeight: 250,
};

const Nothing = renderNothing();

export default mapPropsStream(props$ => 
    props$
        .combineLatest(player$, (props, song) => ({ ...props, song }))
        .mergeMap(({ song }) => {
            return Observable.of(
                Observable.of(
                        <Paper key={song.id} className="nowplaying">
                            <div className="nowplaying--header">
                                <h1>Now Playing on</h1>
                                <img src="images/dhis2nzlogo.png" />
                            </div>
                            <img
                                style={imgStyle}
                                src={`https://img.youtube.com/vi/${song.id}/0.jpg`}
                            />
                        </Paper>
                ),
                Observable
                    .of(<Nothing />)
                    .delay(3000)
            );
        })
        .mergeAll()
        .delay(1250)
        .startWith(<Nothing />)
        .map((component) => ({ component }))
)(({ component = null }) => {
    return (
        <ReactCSSTransitionGroup
            transitionName="nowplaying"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
        >
            {component}
        </ReactCSSTransitionGroup>
    );
});
