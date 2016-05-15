"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import TimelineTicks from './timeline_ticks';
import YearLabel from './year_label';

import events from './events';
import * as generations from './generations';


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
                <span className="year-label">
                    <YearLabel value={this.props.start} /> - <YearLabel value={this.props.end}/></span>
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
        
        const range = generations.getRange(this.props.generations || [], this.padding, this.rounding);
        this.state = {
            range: range,
            events: events(range.start, range.end)
        };
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.generations) {
            const range = generations.getRange(newProps.generations || [], this.padding, this.rounding);
            this.setState({
                range: range,
                events: events(range.start, range.end)
            });
        }
    }

    render() {
        const generationsValues = (this.props.generations || []).map(x =>
            <Generation key={`${x.start}-${x.end}`} {...x} range={this.state.range} />);
        
        const events = (this.state.events).map(x => 
            <Event key={x.year} {...x} range={this.state.range} />);
        
        const generationRange = generations.getRange(this.props.generations, 0, 1);
        
        return (
            <div className="timeline">
                <YearLabel className="start-label" value={generationRange.start} />
                <YearLabel className="end-label" value={generationRange.end} />
                <div className="timeline-body">
                    <div className="generations">{generationsValues}</div>
                    <TimelineTicks start={this.state.range.start} end={this.state.range.end} /> 
                </div>
                <div className="events">{events}</div>
            </div>);
    }
}
