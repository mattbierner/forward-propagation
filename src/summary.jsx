import React from 'react';
import ReactDOM from 'react-dom';

import YearLabel from './year_label';

import * as generations from './generations';

/**
 * Summary of settings.
 */
export default class Summary extends React.Component {
    render() {
        const range = generations.getRange(this.props.generations, 0, 1);
        return (
            <span className="summary">
                {this.props.generations.length} generations <i>of</i> {this.props.generationLength} years <i>with</i> {this.props.overlap} year overlaps<br/>
                <i>spanning</i> <YearLabel value={range.start}/><i>to</i><YearLabel value={range.end} />
            </span>
        );
    }
}