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
                <h4><YearLabel value={this.props.year} /></h4>
                <p>{this.props.description}</p>
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
                    <HeaderEvent label="earliest event" {...events[0]} />
                    <HeaderEvent label="latest event" {...events[events.length - 1]} />
                </div>);
        }
        const minYear = this.getMinYear();
        return (
            <div className="event-range">
                {events.length === 0
                    ? (minYear >= 2016 ? <p>Out of history</p> : <p>No events found</p>)
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

        // Number of events at start and end to grab for preview.
        this.sampleSize = 5;

        this.state = {
            expanded: false
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ expanded: false });
    }

    getPre(events, used) {
        const out = [];
        for (let i = 0; i < this.sampleSize; ++i) {
            if (!used[i] && events[i]) {
                used[i] = true;
                out.push(events[i]);
            }
        }
        return out;
    }

    getPost(events, used) {
        const out = [];
        for (let i = events.length - this.sampleSize; i < events.length; ++i) {
            if (!used[i] && events[i]) {
                used[i] = true;
                out.push(events[i]);
            }
        }
        return out;
    }

    onExpand() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const toItem = x => (<Event key={x.i} {...x} />);

        const events = this.props.events;
        let items;
        if (this.state.expanded) {
            items = events.map(toItem);
        } else {
            const used = {}
            const pre = this.getPre(this.props.events, used).map(toItem);
            const post = this.getPost(this.props.events, used).map(toItem);

            let mid = [];
            if (events.length > pre.length + post.length)
                mid = (<li className="expand-button" key="expand-button">
                    <span/>
                    <button onClick={this.onExpand.bind(this) }>Show all events</button>
                    <span/>
                </li>);

            items = [].concat(pre, mid, post);
        }

        return (<ul className="event-list">{items}</ul>);
    }
}

/**
 * Displays information about events in range.
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
