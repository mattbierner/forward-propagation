import React from 'react';
import ReactDOM from 'react-dom';

import YearLabel from './year_label';

import events from './events';
import * as generations from './generations';

/**
 * Single event in the event list.
 */
class Event extends React.Component {
    render() {
        return (
            <li className="event">
                <YearLabel value={this.props.year} /> - {this.props.description}
            </li>);
    }
}

/**
 * Summary of event for header range.
 */
class HeaderEvent extends React.Component {
    render() {
        return (
            <div className="header-event">
                <h3>{this.props.label}</h3>
                <h2><YearLabel value={this.props.year} /></h2>
                <p>{this.props.description}</p>
            </div>);
    }
}

/**
 * Displays first and last event in range.
 */
class EventRange extends React.Component {
    getMinYear() {
        return Math.min.apply(Math, this.props.generations.map(x => x.start));
    }

    render() {
        const events = this.props.events;

        let firstEvent, lastEvent;
        if (events.length >= 2) {
            return (
                <div className="event-range">
                    <HeaderEvent label="earliest" {...events[0]} />
                    <HeaderEvent label="latest" {...events[events.length - 1]} />
                </div>);
        }
        const minYear = this.getMinYear();
        return (
            <div className="event-range">
                {minYear >= 2016 && events.length === 0
                    ? <p>Out of history</p>
                    : ''}
            </div>
        );
    }
}

/**
 * Displays expandable list of events in range.
 */
class EventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    filterEvents() {
        const events = this.props.events;
        const sampleSize = 5;

        const out = [];
        const used = {};
        for (let i = 0; i <= sampleSize; ++i) {
            if (!used[i] && events[i]) {
                used[i] = true;
                out.push(events[i]);
            }
        }

        for (let i = events.length - sampleSize; i < events.length; ++i) {
            if (!used[i] && events[i]) {
                used[i] = true;
                out.push(events[i]);
            }
        }

        return out;
    }

    render() {
        const eventItems = this.filterEvents().map(x =>
            <Event key={x.i} {...x} />);

        return (
            <ul className="event-list">
                {eventItems}
            </ul>);
    }
}


/**
 * Displays information about events.
 */
export default class EventDisplay extends React.Component {
    getEvents() {
        const range = generations.getRange(this.props.generations, 0, 1);
        return events(range.start, range.end);
    }

    render() {
        const events = this.getEvents();
        return (
            <div>
                <EventRange events={events} generations={this.props.generations} />
                <EventList events={events} />
            </div>);
    }
}
