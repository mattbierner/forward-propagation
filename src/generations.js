"use strict";

export const getGenerations = (start, count, span, overlap = 0) => {
    const generations = [];
    for (let i = 0; i < count; ++i) {
        generations.push({
            start: start,
            end: start + span,
            span: span
        });
        start += (span - overlap);
    }
    
    return generations;
};