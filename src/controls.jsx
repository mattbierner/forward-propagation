"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 
 */
export default class Controls extends React.Component {
    constructor(props) {
        super(props);
    }

    onGenLengthChange(e) {
        const value = +e.target.value;
        if (isNaN(value)) {
            // TODO: handle error
            return;
        }
        this.props.onGenLengthChange(value);
    }
    
    onYearChange(e) {
        const value = +e.target.value;
        if (isNaN(value)) {
            // TODO: handle error
            return;
        }
        this.props.onYearChange(value);
    }

    render() {
        return (
            <div class="controls">
                Generation Length: <input type="number" onChange={this.onGenLengthChange.bind(this)} value={this.props.generationLength} />
                
                Year: <input type="number" onChange={this.onYearChange.bind(this)} value={this.props.year} />
            </div>);
    }
};