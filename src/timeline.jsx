"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

const getRange = (generations) => {
    let min = Infinity;
    let max = -Infinity;
    for (const g of generations) {
        min = Math.min(min, g.start);
        max = Math.max(max, g.end);
    }
    return { start: min, max: max, span: max - min };
};

/**
 * 
 */
class Generation extends React.Component {
    render() {
        const style = {};
        style.width = (this.props.span / this.props.range.span) * 100 + '%';
        style.left = ((this.props.start - this.props.range.start) / this.props.range.span) * 100 + '%';

        return (
            <div className="generation" style={style}>
                {this.props.start} - {this.props.end}
            </div>
        );
    }
}

/**
 * Timeline
 */
export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: getRange(this.props.generations || [])
        };
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.generations) {
            this.setState({ range: getRange(newProps.generations || []) })
        }
    }
    

    render() {
        const generations = (this.props.generations || []).map(x =>
            <Generation key={x.start} {...x} range={this.state.range} />);
        
        return (
            <div className="timeline">
                {generations}
            </div>);
    }
}
