"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import events from './events';

const getRange = (generations) => {
    let min = Infinity;
    let max = -Infinity;
    for (const g of generations) {
        min = Math.min(min, g.start);
        max = Math.max(max, g.end);
    }
    return { start: min, end: max, span: max - min };
};

/**
 * 
 */
class Generation extends React.Component {
    render() {
        const style = {};
        style.width = (this.props.span / this.props.range.span) * 100 + '%';
        style.left = ((this.props.start - this.props.range.start) / this.props.range.span) * 100 + '%';

        return (
            <div className="generation" style={style}>
                <span className="year-label">{this.props.start} - {this.props.end}</span>
            </div>
        );
    }
}

/**
 * 
 */
class Event extends React.Component {
    render() {
        const style = {};
        style.left = ((this.props.year - this.props.range.start) / this.props.range.span) * 100 + '%';

        return (
            <div className="event" style={style}>
                <div className="event-label">
                    <span>{this.props.year}</span>
                    <div>{this.props.description}</div>
                </div>
            </div>);
    }
}

/**
 * Timeline
 */
export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        
        const range = getRange(this.props.generations || []);
        this.state = {
            range: range,
            events: events(range.start, range.end)
        };
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.generations) {
            const range = getRange(newProps.generations || []);
            this.setState({
                range: range,
                events: events(range.start, range.end)
            });
        }
    }

    render() {
        const generations = (this.props.generations || []).map(x =>
            <Generation key={x.start} {...x} range={this.state.range} />);
        
        const events = (this.state.events).map(x => 
            <Event key={x.year} {...x} range={this.state.range} />);
        
        return (
            <div className="timeline">
                {generations}
                {events}
            </div>);
    }
}
