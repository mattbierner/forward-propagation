import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 
 */
export default class TimelineTicks extends React.Component {
    componentDidMount() {
        this.drawGrid(this.props.start, this.props.end);

        window.addEventListener('resize', () => {
            this.drawGrid(this.props.start, this.props.end);
        }, false);
    }

    componentWillReceiveProps(nextProps) {
        this.drawGrid(nextProps.start, nextProps.end);
    }

    drawGrid(start, end) {
        const duration = Math.abs(start - end);
        
        const canvas = ReactDOM.findDOMNode(this);
        const {width, height} = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        context.lineWidth = 1;
        context.strokeStyle = '#777';
        this.drawTicks(context, width, height, duration, start, height, 100.0);
        context.strokeStyle = '#aaa';

        this.drawTicks(context, width, height, duration, start, height / 4, 25.0);
    }

    drawTicks(context, width, height, duration, start, tickHeight, step) {
        const upper = height / 2 - tickHeight / 2;
        const lower = height / 2 + tickHeight / 2;
        
        const s = (start % step);
        
        const stepSize = (width / duration) * step;
        if (stepSize <= 0)
            return;
        
        context.beginPath();
        for (let i = -s * (width / duration); i <= width; i += stepSize) {
            context.moveTo(i, upper);
            context.lineTo(i, lower);
        }
        context.stroke();
    }

    render() {
        return <canvas className="timeline-ticks" />;
    }
}
