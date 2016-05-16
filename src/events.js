"use strict";
import events from './data/events.js';
import first_millennium from './data/first_millennium.js';

/**
 * Convert `all-of-human-history-events` to expected format.
 */
const normalizeHistory = events =>
    events.map(x => ({
        year: x.start.year,
        description: x.event
    }));

/**
 * Set of all events.
 */
const allEvents = [].concat(
    events,
    normalizeHistory(require('json!all-of-human-history/data/bronze_age.json')),
    normalizeHistory(require('json!all-of-human-history/data/antiquity.json')),
    first_millennium
).sort((a, b) => a.year - b.year);

/**
 * Get all events in a given range.
 */
export default (start, end) => {
    const out = [];
    let i = 0;
    for (const e of allEvents) {
        if (e.year >= start && e.year <= end) {
            out.push(Object.assign({}, e, {i}));
        }
        ++i;
    }
    return out;
};
