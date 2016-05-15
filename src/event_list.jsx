import React from 'react';
import ReactDOM from 'react-dom';

import events from './events';

class Event extends React.Component {
    render() {
        return (
            <li className="event">
                {this.props.year} - {this.props.description}
            </li>);
    }
}

/**
 * Displays list of events in range.
 */
export default class EventList extends React.Component {
    getEvents() {
        return events(this.props.start, this.props.end);
    }

    render() {
        const events = this.getEvents().map(x =>
            <Event key={x.i} {...x} />);

        return (
            <ul className="event-list">
                {events}
            </ul>);
    }
}
