"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import events from './events';
import TimelineTicks from './timeline_ticks';

const getRange = (generations, padding, rounding) => {
    let min = Infinity;
    let max = -Infinity;
    for (const g of generations) {
        min = Math.min(min, g.start);
        max = Math.max(max, g.end);
    }
    
    min -= padding; 
    max += padding;
    
    min = Math.ceil(min / rounding) * rounding;
    max = Math.ceil(max / rounding) * rounding;
    
    return {
        start: min,
        end: max,
        span: max - min
    };
};

/**
 * 
 */
class Generation extends React.Component {
    render() {
        const style = {};
        style.width = (this.props.span / this.props.range.span) * 100 + '%';
        style.left = ((this.props.start - this.props.range.start) / this.props.range.span) * 100 + '%';
        
        const overlapStyle = {};
        overlapStyle.width =(this.props.overlap / this.props.span) * 100 + '%';
        
        return (
            <div className={"generation " + (this.props.active ? "active" : '')}  style={style}>
                <span className="overlap left-overlap" style={overlapStyle} />
                <span className="overlap right-overlap" style={overlapStyle} />
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
        
        this.padding = this.rounding = 25;
        
        const range = getRange(this.props.generations || [], this.padding, this.rounding);
        this.state = {
            range: range,
            events: events(range.start, range.end)
        };
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.generations) {
            const range = getRange(newProps.generations || [], this.padding, this.rounding);
            this.setState({
                range: range,
                events: events(range.start, range.end)
            });
        }
    }

    render() {
        const generations = (this.props.generations || []).map(x =>
            <Generation key={`${x.start}-${x.end}`} {...x} range={this.state.range} />);
        
        const events = (this.state.events).map(x => 
            <Event key={x.year} {...x} range={this.state.range} />);
        
        return (
            <div className="timeline">
                <span className="start-label">{this.state.range.start}</span>
                <span className="end-label">{this.state.range.end}</span>
                <div className="timeline-body">
                    <TimelineTicks start={this.state.range.start} end={this.state.range.end} />
                    <div className="generations">{generations}</div>
                </div>
                <div className="events">{events}</div>
            </div>);
    }
}
