"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 
 */
class Generation extends React.Component {
    render() {
        return (
            <div class="generation">
                {this.props.start} - {this.props.end}
            </div>
        );
    }
}

/**
 * Timeline
 */
export default class TimeLine extends React.Component {
    constructor(props) {
        super(props); 
    }

    render() {
        const generations = (this.props.generations || []).map(x =>
            <Generation key={x.start} {...x} />);
        
        return (
            <div className="timeline">
                {generations}
            </div>);
    }
}
