import React from 'react';
import ReactDOM from 'react-dom';

import YearLabel from './year_label';

import events from './events';
import * as generations from './generations';

class Event extends React.Component {
    render() {
        const even = this.props.generations.some(x => x % 2) ? 'even' : ' ';
        const odd = this.props.generations.some(x => !(x % 2)) ? 'odd' : ' ';

        return (
            <li className={"event " + even + ' ' + odd}>
                <YearLabel value={this.props.year} /> - {this.props.description}
            </li>);
    }
}

class HeaderEvent extends React.Component {
    render() {
        return (
            <div {...this.props}>
                <YearLabel value={this.props.year} /> - {this.props.description}
            </div>);
    }
}

class EventRange extends React.Component {
    render() {
        const events = this.props.events;
        
        let firstEvent, lastEvent;
        if (events.length >= 2) {
            firstEvent = <HeaderEvent {...events[0]} />;
            lastEvent = <HeaderEvent {...events[events.length - 1]} />;
        }
        return (
            <div className="event-range">
                {firstEvent}
                {lastEvent}
            </div>);
    }
}

/**
 * Displays list of events in range.
 */
export default class EventList extends React.Component {
    getEvents() {
        const range = generations.getRange(this.props.generations, 0, 1);
        return events(range.start, range.end);
    }

    getGenerations(year) {
        const out = [];
        let i = 0;
        for (const g of this.props.generations) {
            if (year >= g.start && year <= g.end) {
                out.push(i);
            }
            ++i;
        }
        return out;
    }

    render() {
        const events = this.getEvents();
        const eventItems = events.map(x =>
            <Event key={x.i} {...x} generations={this.getGenerations(x.year) } />);

        let firstEvent, lastEvent;
        if (events.length >= 2) {
            firstEvent = <HeaderEvent {...events[0]} />;
            lastEvent = <HeaderEvent {...events[events.length - 1]} />;
        }
        return (
            <div>
                <EventRange events={events} />
                
                <ul className="event-list">
                    {eventItems}
                </ul>
            </div>);
    }
}
