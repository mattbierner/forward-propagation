"use strict";
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * Main page
 */
class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            generationLength: 80,
            year: 1900
        };
    }

    onGenLengthChange(e) {
        const value = e.target.value;
        this.setState({ generationLength: value });
    }
    
    onYearChange(e) {
        const value = e.target.value;
        this.setState({ year: value });
    }

    render() {
        return (
            <div id="main">
                Generation Length: <input type="number" onChange={this.onGenLengthChange.bind(this)} value={this.state.generationLength} />
                
                Year: <input type="number" onChange={this.onYearChange.bind(this)} value={this.state.year} />
            </div>);
    }
};


ReactDOM.render(
    <Main />,
    document.getElementById('target'));
