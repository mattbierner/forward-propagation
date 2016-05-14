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
        context.imageSmoothingEnabled = true;

        context.lineWidth = 1;
        const lines = [
            { scale: 100, height: 1, color: '#aaa', exclude: [] },
            { scale: 25, height: 0.25, color: '#aaa', exclude: [100] },
            { scale: 5, height: 0.1, color: '#aaa', exclude: [100, 25] },
        ];
        
        for (const line of lines) {
            context.strokeStyle = line.color;
            this.drawTicks(context, width, height, duration, start, height * line.height, line.scale, line.exclude);
        }
    }

    drawTicks(context, width, height, duration, start, tickHeight, step, skip = []) {
        const upper = height / 2 - tickHeight / 2;
        const lower = height / 2 + tickHeight / 2;
        
        const s = (start % step);
        
        const stepSize = (width / duration) * step;
        if (stepSize <= 0)
            return;
        
        context.beginPath();
        let year = start - s;
        for (let i = -s * (width / duration); i <= width; i += stepSize) {
            if (skip.every(x => year % x !== 0)) {
                context.moveTo(i, upper);
                context.lineTo(i, lower);
            } 
            year += step;
        }
        context.stroke();
    }

    render() {
        return <canvas className="timeline-ticks" />;
    }
}
