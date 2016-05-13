"use strict";

const getGenerationsImpl = (dx, start, count, span, overlap) => {
    const generations = [];
    for (let i = 0; i < count; ++i) {
        generations.push({
            start: start,
            end: start + span,
            span: span
        });
        start += (dx - overlap);
    }
    
    return generations;
};

export const getGenerations = (start, count, span, overlap = 0) =>
    getGenerationsImpl(span, start, count, span, overlap);

export const getBackwardsGenerations = (start, count, span, overlap = 0) =>
    getGenerationsImpl(-span, start - span, count, span, -overlap);

export const getMiddleGenerations = (start, count, span, overlap = 0) =>
    [].concat(
        getBackwardsGenerations(start + overlap, count, span, overlap),
        getGenerations(start, count, span, overlap));