import React, {Component} from 'react';

class CurrentTimeIndicator extends Component {
    constructor(props) {
        super(props);
        
        this.pause = this.pause.bind(this);
        this.run = this.run.bind(this);
        
        this.state = {
            timeRemaining: this.props.size * 60 * 1000,
            secondsRemaining: this.props.size * 60
        };
    }
    
    run() {
        this.startTime = new Date();  // share this between the run and pause methods
        var timeToFinish = this.startTime + this.state.timeRemaining;  // millesconds until clock is finished
        
        var clock = this;  // alias for timeout functions
        var timeOutInterval = this.state.timeRemaining % 1000;  // number of milleseconds to elapse until the next clock fire
        
        clock.timeout = setTimeout(function() {  // first elapse the milleseconds until the next interval
            if (timeOutInterval > 0) clock.setState({
                secondsRemaining: Math.floor(clock.state.timeRemaining / 1000)  // set the clock explicitly
            });
            
            clock.interval = setInterval(function() {
                // when time elapses (we have two checks which should both fire at the same time) stop the clock
                if (new Date() >= timeToFinish || clock.state.secondsRemaining - 1 <= 0) {
                    clock.setState({
                        secondsRemaining: 0
                    });
                    clearInterval(clock.interval);
                    return clock.props.onComplete();
                }
                
                // decrement the clock
                return clock.setState({
                    secondsRemaining: clock.state.secondsRemaining - 1
                });
            }, 1000);
            
        }, timeOutInterval);
    }
    
    pause() {
        clearInterval(this.interval);  // pause the clock
        clearTimeout(this.timeout);  // stop other timeouts from creating a new interval
        var timeElapsed = Date.now() - this.startTime;  // time elapsed since the clock started
        this.setState({
            timeRemaining: this.state.timeRemaining - timeElapsed
        });
    }
    
    // primarily for starting / pausing the clock
    componentWillReceiveProps(props) {
        if (props.running) this.run();
        else if (props.running === false) this.pause();
        
        if (props.working !== this.props.working) {
            return this.setState({
                timeRemaining: props.size * 60 * 1000,
                secondsRemaining: props.size * 60
            });
        }
        
        if (props.size !== this.props.size) this.setState({
            timeRemaining: this.state.timeRemaining + (props.size - this.props.size) * 60 * 1000,
            secondsRemaining: this.state.secondsRemaining + (props.size - this.props.size) * 60
        });
    }
    
    formatTime(seconds) {
        var numSeconds = (seconds % 60).toString();
        if (numSeconds.length == 1) numSeconds = "0" + numSeconds;
        return Math.floor(seconds / 60) + ":" + numSeconds;
    }
    
    render() {
        return <div style={{
            position: 'absolute',
            left: '0px',
            right: '0px',
            bottom: '0px',
            top: '0px',
            lineHeight: '160px',
            width: '200px',
            margin: 'auto',
            textAlign: 'center',
            fontSize: '30pt',
            color: this.props.working ? '#FF8F86' : "#55AA55"
        }}>
            {this.formatTime(this.state.secondsRemaining)}
        </div>;
    }
}

export default CurrentTimeIndicator;