"use strict";

const getGenerationsImpl = (dx, start, count, span, overlap, active = false) => {
    const generations = [];
    for (let i = 0; i < count; ++i) {
        generations.push({
            start: start,
            end: start + span,
            span: span,
            overlap: Math.abs(overlap),
            active: active && i === 0
        });
        start += (dx - overlap);
    }
    
    return generations;
};

export const getGenerations = (start, count, span, overlap, active = true) =>
    getGenerationsImpl(span, start, count, span, overlap, active);

export const getBackwardsGenerations = (start, count, span, overlap, active = true) =>
    getGenerationsImpl(-span, start - span, count, span, -overlap, active);

export const getMiddleGenerations = (start, count, span, overlap) =>
    [].concat(
        getBackwardsGenerations(start + overlap, count, span, overlap, false),
        getGenerations(start, count, span, overlap));