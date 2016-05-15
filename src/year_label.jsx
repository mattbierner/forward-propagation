"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Get readable year label
 */
const yearLabel = year =>
    year < 0
        ? `${Math.abs(year)} BCE`
        : `${year}`;


export default class YearLabel extends React.Component {
    render() {
        return (
            <span {...this.props}>{yearLabel(this.props.value)}</span>
        );
    }
}
