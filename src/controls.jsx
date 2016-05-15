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
                    onChange={this.onModeChange.bind(this) }>{options}</select>
            </div>
        );
    }
}

/**
 * 
 */
class NumberSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workingValue: props.value,
            error: null
        };
    }

    componentWillReceiveProps(newProps) {
        if (!isNaN(newProps.value)) {
            this.setState({
                workingValue: newProps.value,
                error: null
            });
        }
    }

    onChange(e) {
        let value = Math.round(e.target.value);
        if (isNaN(value) || e.target.value === '') {
            this.setState({
                workingValue: e.target.value,
                error: 'Invalid number'
            });
            return;
        }

        if (!isNaN(this.props.min)) {
            value = Math.max(this.props.min, value);
        }

        if (!isNaN(this.props.max)) {
            value = Math.min(this.props.max, value);
        }

        this.props.onChange(value);
    }

    render() {
        return (
            <div className="control-group">
                <div className="control-label">{this.props.label}</div>
                <input type="number"
                    min={this.props.min || '' }
                    max={this.props.max || ''}
                    onChange={this.onChange.bind(this) }
                    value={this.state.workingValue} />
                <span className="field-error" style={{ display: this.state.error ? 'block' : 'none' }}>{this.state.error}</span>
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

    onNumberGenerationsChange(e) {
        const value = Math.round(e.target.value);
        if (isNaN(value) || value < 0) {
            // TODO: handle error
            return;
        }
        this.props.onNumberGenerationsChange(value);
    }

    onOverlapChange(e) {
        const value = Math.round(e.target.value);
        if (isNaN(value) || value < 0) {
            // TODO: handle error
            return;
        }
        this.props.onGenerationOverlapChange(value);
    }

    onCollapse() {
        this.setState({ active: !this.state.active });
    }

    render() {
        return (
            <div className={"controls " + (this.state.active ? 'active' : '') }>
                <NumberSelector label="Year"
                    onChange={this.props.onYearChange}
                    value={this.props.year} />

                <NumberSelector label="Generations"
                    onChange={this.props.onNumberGenerationsChange}
                    min="1"
                    max="500"
                    value={this.props.numberGenerations} />


                <div className="control-group mode-control">
                    <div className="control-label">Mode</div>
                    <ModeSelector {...this.props} />
                </div>

                <button className="collapseButton" onClick={this.onCollapse.bind(this) }>{this.state.active ? 'Hide Options' : 'More Options'}</button>
                <div className={"collapsible " + (this.state.active ? 'active' : '') }>
                    <div className="control-group">
                        <div className="control-label">Generation Length</div>
                        <input type="number" onChange={this.onGenLengthChange.bind(this) } value={this.props.generationLength} />
                    </div>
                    <div className="control-group">
                        <div className="control-label">Generation Overlap</div>
                        <input type="number" onChange={this.onOverlapChange.bind(this) } value={this.props.overlap} />
                    </div>
                </div>
            </div>);
    }
};