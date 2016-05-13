"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import Controls from './controls';
import Timeline from './timeline';
import {getGenerations} from './generations';

/**
 * 
 */
const mode = {
    forwards: 'forwards',
    backwards: 'backwards',
    middle: 'middle'
};


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
            numberGenerations: 3
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

    render() {
        return (
            <div id="main" className="container">
                <Controls {...this.state}
                    onGenLengthChange={this.onGenLengthChange.bind(this)}
                    onYearChange={this.onYearChange.bind(this)} />
                
                <Timeline generations={this.state.generations} />
            </div>);
    }
};


ReactDOM.render(
    <Main />,
    document.getElementById('target'));
