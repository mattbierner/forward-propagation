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
    constructor(props) {
        super(props);
        
        this.state = {
            active: false
        };
    }
    
    onGenLengthChange(e) {
        const value = Math.round(e.target.value);
        if (isNaN(value) || value < 0) {
            // TODO: handle error
            return;
        }
        this.props.onGenLengthChange(value);
    }
    
    onYearChange(e) {
        const value = Math.round(e.target.value);
        if (isNaN(value) || value < 0) {
            // TODO: handle error
            return;
        }
        this.props.onYearChange(value);
    }
    
    onNumberGenerationsChange(e) {
        const value = Math.round(e.target.value);
        if (isNaN(value) || value < 0 ) {
            // TODO: handle error
            return;
        }
        this.props.onNumberGenerationsChange(value);
    }

    render() {
        return (
            <div className="controls">
                <div className="control-group">
                    <div className="control-label">Year</div>
                    <input type="number" onChange={this.onYearChange.bind(this)} value={this.props.year} />
                </div>
                <div className="control-group">
                    <div className="control-label">Generations</div>
                    <input type="number"
                        onChange={this.onNumberGenerationsChange.bind(this)}
                        min="1"
                        max="500"
                        value={this.props.numberGenerations} />
                </div>
                <div className="control-group">
                    <div className="control-label">Mode</div>
                    <ModeSelector {...this.props} />
                </div>
                
                <div className="collapsible">
                    <div className="control-group">
                        <div className="control-label">Generation Length</div>
                        <input type="number" onChange={this.onGenLengthChange.bind(this)} value={this.props.generationLength} />
                    </div>
                </div>
            </div>);
    }
};