"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import chroma from 'chroma-js';


import TimelineTicks from './timeline_ticks';
import YearLabel from './year_label';

import events from './events';
import * as generations from './generations';

const scale = chroma.scale(['#74ceb7', '#86fffb']);

/**
 * 
 */
class Generation extends React.Component {
    render() {
        const style = {};
        
        style.width = (this.props.span / this.props.range.span) * 100 + '%';
        style.left = (this.props.start - this.props.range.start) / this.props.range.span * 100 + '%';
        style.marginTop = (+this.props.shift) * 10 + 'px';
        
        style.background = scale((this.props.start - this.props.generationRange.start) / (this.props.generationRange.span - this.props.span)).hex();

        const overlapStyle = {};
        overlapStyle.width = (this.props.overlap / this.props.span) * 100 + '%';

        return (
            <div className={"generation " + (this.props.active ? "active" : '') }  style={style}>
                <span className="overlap left-overlap" style={overlapStyle} />
                <span className="overlap right-overlap" style={overlapStyle} />
                <span className="generation-range-label">
                    <YearLabel value={this.props.start} /> - <YearLabel value={this.props.end}/>
                </span>
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
                    <YearLabel value={this.props.year} />
                    <div>{this.props.description}</div>
                </div>
            </div>);
    }
}


const getShifts = (generations) => {
    let i = 1;
    
    const shifts = {0: { values: [], end: -Infinity }};
    for (const g of generations) {
        let found = false;
        for (let f = 0; f < i; ++f) {
            const upper = shifts[f];
            if (g.start >= upper.end) {
                upper.values.push(g);
                upper.end = g.end;
                found = true;
                break;
            }
            const lower = shifts[-f];
            if (g.start >= lower.end) {
                lower.values.push(g);
                lower.end = g.end;
                found = true;
                break;
            }
        }
        if (!found) {
            shifts[i] = { values: [g], end: g.end };
            shifts[-i] = { values: [], end: -Infinity };
            ++i;
        }
    }
    return shifts;
};

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
        const shifts = getShifts(this.props.generations || []);
        const numShifts = Math.max.apply(Math, Object.keys(shifts));
        
        const generationRange = generations.getRange(this.props.generations, 0, 1);

        let i = 0;
        const generationsValues = [].concat.apply([], 
            Object.keys(shifts).map(x => +x).sort().map(shift => {
                return shifts[shift].values.map(x => <Generation key={`${x.start}-${x.end}`} {...x} i={x.i / this.props.generations.length} shift={shift} range={this.state.range} generationRange={generationRange} />);
            }));

        const events = (this.state.events).map(x =>
            <Event key={x.year} {...x} range={this.state.range} />);


        const bodyStyle = {};
        bodyStyle.height = Math.max(60, Math.max.apply(Math, Object.keys(shifts)) * 2 * 10) + 'px'; 

        return (
            <div className="timeline">
                <YearLabel className="start-label" value={this.state.range.start} />
                <YearLabel className="end-label" value={this.state.range.end} />
                <div className="timeline-body" style={bodyStyle}>
                    <div className="generations">
                        {generationsValues}
                        <div className="current-year" style={{
                            left: ((this.props.year - this.state.range.start) / this.state.range.span) * 100 + '%'
                        }}></div>
                    </div>
                    <TimelineTicks start={this.state.range.start} end={this.state.range.end} />
                </div>
                <div className="events">{events}</div>
            </div>);
    }
}
