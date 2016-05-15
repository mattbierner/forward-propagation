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
    getGenerationsImpl(-span, start - span, count, span, -overlap, active).reverse();

export const getMiddleGenerations = (start, count, span, overlap) =>
    [].concat(
        getBackwardsGenerations(start + overlap, count, span, overlap, false),
        getGenerations(start, count, span, overlap));


export const getRange = (generations, padding, rounding) => {
    let min = Infinity;
    let max = -Infinity;
    for (const g of generations) {
        min = Math.min(min, g.start);
        max = Math.max(max, g.end);
    }

    min -= padding;
    max += padding;

    min = Math.ceil(min / rounding) * rounding;
    max = Math.ceil(max / rounding) * rounding;

    return {
        start: min,
        end: max,
        span: max - min
    };
};