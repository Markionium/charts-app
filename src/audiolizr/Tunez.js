import * as React from 'react';
import Card from 'material-ui/Card';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';

const titleStyle = {
    fontSize: '1rem',
};

const imgStyle = {
    minWidth: 250,
    minHeight: 250,
};

export function Tune({ name, id, onTuneSelect }) {
    return (
        <Card className="audiolizr--tunes--tune" onClick={onTuneSelect}>
            <CardMedia
                overlay={<CardTitle title={name} titleStyle={titleStyle} />}
            >
                <img
                    className="audiolizr--tunes--tune__image"
                    style={imgStyle}
                    src={`https://img.youtube.com/vi/${id}/0.jpg`}
                />
            </CardMedia>
        </Card>
    )
}

export function Tunez({ songs }) {
    return (
        <div className="audiolizr--tunes">
            {songs.map(song => (<Tune key={song.id} {...song} />))}
        </div>
    )
}