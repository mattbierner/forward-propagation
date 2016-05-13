"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import modes from './mode';

/**
 * Selection of generation mode.
 */
class ModeSelector extends React.Component {
    onModeChange(e) {
        const value = e.target.value;
        this.props.onModeChange(value);
    }
    
    render() {
        const options = Object.keys(modes).map(mode =>
            <option key={mode} value={mode}>{modes[mode]}</option>);
        
        return (
            <div className="control-group">
                <select value={this.props.mode}
                    onChange={this.onModeChange.bind(this)}>{options}</select>
            </div>
        );
    }
}

/**
 * 
 */
export default class Controls extends React.Component {
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
    
    onNumberGenerationsChange(e) {
        const value = +e.target.value;
        if (isNaN(value)) {
            // TODO: handle error
            return;
        }
        this.props.onNumberGenerationsChange(value);
    }

    render() {
        return (
            <div className="controls">
                <div className="control-group">
                    Generation Length: <input type="number" onChange={this.onGenLengthChange.bind(this)} value={this.props.generationLength} />
                </div>
                <div className="control-group">
                    Year: <input type="number" onChange={this.onYearChange.bind(this)} value={this.props.year} />
                </div>
                <div className="control-group">
                    Generations: <input type="number"
                        onChange={this.onNumberGenerationsChange.bind(this)}
                        min="1"
                        max="500"
                        value={this.props.numberGenerations} />
                </div>
                <ModeSelector {...this.props} />
            </div>);
    }
};