import React from 'react';
import TextField from 'material-ui/TextField';
import { playTune } from './player';
import modHash from './favHash';
import { favorites$ } from './favorites';

const loadSong = (callback) => (event, value) => {
    const id = getId(value);

    if (id) {
        favorites$
            .take(1)
            .do((v) => { console.log(v) })
            .map(favorites => {
               const favoriteNumber = modHash(id, favorites.length);

               return favorites[favoriteNumber];
            })
            .do((v) => { console.log(v) })
            .subscribe((favorite) => {
                console.log(favorite);
                playTune({
                    name: id,
                    id,
                });
                global.refs.instanceManager.getById(favorite.id);
                callback();
            }, (e) => console.log(e));

    } else {
        console.log('Not a valid youtube link');
    }
}

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return false;
    }
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

const EnterYoutubeLink = ({ onClose }) => (
    <div style={enterYoutubeLinkStyles.wrap}>
        <TextField
            hintText="or enter your own youtube link!"
            onChange={loadSong(onClose)}
            style={enterYoutubeLinkStyles.root}
            inputStyle={enterYoutubeLinkStyles.input}
            hintStyle={enterYoutubeLinkStyles.hint}
            underlineStyle={enterYoutubeLinkStyles.underlineStyle}
            underlineFocusStyle={enterYoutubeLinkStyles.underlineFocusStyle}
            fullWidth
        />
    </div>
);

export default EnterYoutubeLink;