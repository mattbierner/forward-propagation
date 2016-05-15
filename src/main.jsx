"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import Controls from './controls';
import Timeline from './timeline';
import EventList from './event_list';

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
            year: new Date().getFullYear(),
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
            case 'middle':
                return generations.getMiddleGenerations(data.year, data.numberGenerations, data.generationLength, data.overlap);

            case 'forwards':
                return generations.getGenerations(data.year, data.numberGenerations, data.generationLength, data.overlap)
           
            case 'backwards':
            default:
                return generations.getBackwardsGenerations(data.year, data.numberGenerations, data.generationLength, data.overlap)
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
    
    onGenerationOverlapChange(value) {
        this.setState({
            overlap: value,
            generations: this.getGenerations(this.state.mode, { overlap: value })
        });
    }

    onModeChange(mode) {
        this.setState({
            mode: mode,
            generations: this.getGenerations(mode, {})
        });
    }

    render() {
        const range = generations.getRange(this.state.generations, 0, 1);
        return (
            <div id="main">
                <div className="container">
                    <Controls {...this.state}
                        onGenLengthChange={this.onGenLengthChange.bind(this) }
                        onYearChange={this.onYearChange.bind(this) }
                        onNumberGenerationsChange={this.onNumberGenerationsChange.bind(this)}
                        onGenerationOverlapChange={this.onGenerationOverlapChange.bind(this)}
                        onModeChange={this.onModeChange.bind(this) }/>
                </div>
                <Timeline generations={this.state.generations} />
                <EventList start={range.start} end={range.end} />
            </div>);
    }
};


ReactDOM.render(
    <Main />,
    document.getElementById('target'));
