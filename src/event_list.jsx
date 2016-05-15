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
        const events = this.getEvents().map(x =>
            <Event key={x.i} {...x} generations={this.getGenerations(x.year)} />);

        return (
            <div>
                <ul className="event-list">
                    {events}
                </ul>
            </div>);
    }
}
