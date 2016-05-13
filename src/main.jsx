"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import Timeline from './timeline';
import {getGenerations} from './generations';

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

    

    onGenLengthChange(e) {
        const value = +e.target.value;
        if (isNaN(value)) {
            // TODO: handle error
            return;
        }
        
        this.setState({
            generationLength: value,
            generations: getGenerations(this.state.year, this.state.numberGenerations, value, this.state.overlap)
        });
    }
    
    onYearChange(e) {
        const value = +e.target.value;
        if (isNaN(value)) {
            // TODO: handle error
            return;
        }
        
        this.setState({
            year: value,
            generations: getGenerations(value,  this.state.numberGenerations, this.state.generationLength, this.state.overlap)
        });
    }

    render() {
        return (
            <div id="main">
                Generation Length: <input type="number" onChange={this.onGenLengthChange.bind(this)} value={this.state.generationLength} />
                
                Year: <input type="number" onChange={this.onYearChange.bind(this)} value={this.state.year} />
                
                <Timeline generations={this.state.generations} />
            </div>);
    }
};


ReactDOM.render(
    <Main />,
    document.getElementById('target'));
