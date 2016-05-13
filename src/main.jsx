"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import Controls from './controls';
import Timeline from './timeline';

import * as generations from './generations';
import modes from './mode';

/**
 * Main page
 */
class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            generationLength: 80,
            year: 1900,
            generations: [],
            overlap: 5,
            numberGenerations: 3,
            mode: modes[Object.keys(modes)[0]]
        };
    }

    componentWillMount() {
        this.onGenLengthChange(this.state.generationLength);
    }

    getGenerations(mode, data) {
        data = Object.assign({}, this.state, data);
        switch (mode) {
            case modes.backwards:
                return generations.getBackwardsGenerations(data.year, data.numberGenerations, data.generationLength, data.overlap)

            case modes.middle:
                return generations.getMiddleGenerations(data.year, data.numberGenerations, data.generationLength, data.overlap);

            case modes.forwards:
            default:
                return generations.getGenerations(data.year, data.numberGenerations, data.generationLength, data.overlap)
        }
    }

    onGenLengthChange(value) {
        this.setState({
            generationLength: value,
            generations: this.getGenerations(this.state.mode, { generationLength: value })
        });
    }

    onYearChange(value) {
        this.setState({
            year: value,
            generations: this.getGenerations(this.state.mode, { year: value })
        });
    }

    onNumberGenerationsChange(value) {
        this.setState({
            numberGenerations: value,
            generations: this.getGenerations(this.state.mode, { numberGenerations: value })
        });
    }

    onModeChange(mode) {
        this.setState({
            mode: mode,
            generations: this.getGenerations(mode, {})
        });
    }

    render() {
        return (
            <div id="main" className="container">
                <Controls {...this.state}
                    onGenLengthChange={this.onGenLengthChange.bind(this) }
                    onYearChange={this.onYearChange.bind(this) }
                    onNumberGenerationsChange={this.onNumberGenerationsChange.bind(this) }
                    onModeChange={this.onModeChange.bind(this) }/>

                <Timeline generations={this.state.generations} />
            </div>);
    }
};


ReactDOM.render(
    <Main />,
    document.getElementById('target'));
