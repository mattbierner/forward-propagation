"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import Controls from './controls';
import Timeline from './timeline';

import {getGenerations} from './generations';
import modes from './modes';

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

    onGenLengthChange(value) {
        this.setState({
            generationLength: value,
            generations: getGenerations(this.state.year, this.state.numberGenerations, value, this.state.overlap)
        });
    }
    
    onYearChange(value) {
        this.setState({
            year: value,
            generations: getGenerations(value,  this.state.numberGenerations, this.state.generationLength, this.state.overlap)
        });
    }
    
    onNumberGenerationsChange(value) {
        this.setState({
            numberGenerations: value,
            generations: getGenerations(this.state.year, value, this.state.generationLength, this.state.overlap)
        });
    }
    
    onModeChange(mode) {
        this.setState({ mode: mode });
    }

    render() {
        return (
            <div id="main" className="container">
                <Controls {...this.state}
                    onGenLengthChange={this.onGenLengthChange.bind(this)}
                    onYearChange={this.onYearChange.bind(this)}
                    onNumberGenerationsChange={this.onNumberGenerationsChange.bind(this)} />
                
                <Timeline generations={this.state.generations} />
            </div>);
    }
};


ReactDOM.render(
    <Main />,
    document.getElementById('target'));
