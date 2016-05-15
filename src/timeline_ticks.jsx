import React from 'react';
import ReactDOM from 'react-dom';

Math.log10 = Math.log10 || function (x) {
    return Math.log(x) / Math.LN10;
};

/**
 * Displays ticks on the timeline
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

    getScale(start, end) {
        const duration = Math.abs(start - end);
        return Math.max(100, Math.pow(10, Math.floor(Math.log10(duration))));
    }

    drawGrid(start, end) {
        const duration = Math.abs(start - end);

        const canvas = ReactDOM.findDOMNode(this).getElementsByTagName('canvas')[0];
        const {width, height} = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        context.imageSmoothingEnabled = true;

        context.lineWidth = 1;
        let base = this.getScale(start, end);

        const lines = [
            { scale: base, height: 1, color: '#aaa', exclude: [] },
            { scale: base / 4, height: 0.25, color: '#aaa', exclude: [base] },
            { scale: base / 20, height: 0.1, color: '#aaa', exclude: [base, base / 4] },
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
        const scale = this.getScale(this.props.start, this.props.end);
        return (
            <div className="timeline-ticks">
                <canvas />
                <div className="scale">
                    Large marks: <i>{scale} years</i><br/>
                    Small marks: <i>{scale / 20} years</i> 
                </div>
            </div>);
    }
}
