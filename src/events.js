"use strict";
import events from './data/events.js';

/**
 * Get all events in a given range.
 */
export default (start, end) => {
    const out = [];
    let i = 0;
    for (const e of events) {
        if (e.year >= start && e.year <= end) {
            out.push(Object.assign({}, e, {i}));
        }
        ++i;
    }
    return out;
};
