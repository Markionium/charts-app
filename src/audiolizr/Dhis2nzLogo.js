import React from 'react';
import tnzLogo from '../images/dhis2nzlogo.png';

export default function Dhis2nzLogo({ width = 400 }) {
    return (
        <div>
            <img 
                src={tnzLogo}
                style={{ width }}
            />
        </div>
    );
}