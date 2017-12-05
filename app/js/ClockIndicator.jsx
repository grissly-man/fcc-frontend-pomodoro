import React, {Component} from 'react';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import style from '../css/clockIndicator.css';

class ClockIndicator extends Component {
    constructor(props) {
        super(props);
        
        this.toggleWorking = this.toggleWorking.bind(this);
        
        this.workArr = [];
        for (var i = this.props.workSize || 25; i >= 0; i--) this.workArr.push(i);
        this.playArr = [];
        for (var i = this.props.playSize || 5; i >= 0; i--) this.playArr.push(i);
        
        this.state = {
            working: true,
            workArr: this.workArr,
            playArr: this.playArr,
            arr: this.workArr,
            size: this.props.workSize || 25
        };
    }
    
    componentWillReceiveProps(props) {
        if (props.running)
            document.getElementById('time-dial').style.animationPlayState = "running";
        else if (props.running === false)
            document.getElementById('time-dial').style.animationPlayState = "paused";

        if (props.workSize !== this.props.workSize) {
            this.workArr = [];
            for (var i = props.workSize || 25; i >= 0; i--) this.workArr.push(i);
        }
        
        if (props.playSize !== this.props.playSize) {
            this.playArr = [];
            for (var i = props.playSize || 5; i >= 0; i--) this.playArr.push(i);
        }
        
        this.setState({
            playSize: this.props.playSize,
            workSize: this.props.workSize,
            arr: this.state.working ? this.workArr : this.playArr,
            size: this.state.working ? props.workSize : props.playSize
        });
    }
    
    toggleWorking() {
        var arr = [];
        for (var i = this.state.working ? this.props.playSize : this.props.workSize; i >= 0; i--) arr.push(i);
        this.setState({
            working: !this.state.working,
            arr: this.state.working ? this.playArr : this.workArr,
            size: this.state.working ? this.props.playSize : this.props.workSize
        });
        document.getElementById('time-dial').style.animationPlayState = "running";
    }
    
    render() {
        var clock = this;
        var styles = {
            'indicator-body': {
                position: 'absolute',
                left: '0px',
                right: '0px',
                bottom: '0px',
                height: '240px',
                backgroundColor: clock.state.working ? '#E46157' : '#fff'
            },
            'current-time-knotch': {
                position: 'absolute',
                top: '1px',
                margin: 'auto',
                left: '0px',
                right: '0px',
                width: '20px',
                padding: '0px',
                textAlign: 'center',
                color: clock.state.working ? "#FF8F86" : '#555555',
            },
            'time-dial': {
                position: 'absolute',
                bottom: '1px',
                height: '20px',
                padding: '0px',
                margin: '0px',
                width: 30 * clock.state.size + 'px',
                left: 151 - 30 * clock.state.size + "px",
                WebkitAnimation: 'time-dial ' + clock.state.size * 60 + 's linear paused',
                MozAnimation: 'time-dial ' + clock.state.size * 60 + 's linear paused',
                animation: 'time-dial ' + clock.state.size * 60 + 's linear paused',
                color: clock.state.working ? '#fff' : 'black',
            },
            'clock-body-top': {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                height: '80px',
                padding: '0px',
                margin: '0px',
                borderBottom: '1px solid',
                borderColor: clock.state.working? "#FF685C" : "#000"
            },
            'clock-body-bottom': {
                position: 'absolute',
                top: '80px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                padding: '0px',
                margin: '0px',
                border: '0px hidden',
                borderBottom: '1px solid #FF685C'
            }
        };
        
        // we force an update of the dial by changing the key
        return <div style={styles['indicator-body']}>
            <div style={styles['clock-body-top']}>
                <div key={this.state.working ? 'work-dial' : 'play-dial'} style={styles['time-dial']} id='time-dial'>
                    {clock.state.arr.map(function(minuteNum, key) {
                       return <div key={minuteNum} style={{
                           position: 'absolute',
                           left: 0 + key * 30 + 'px',
                           width: '30px',
                           lineHeight: '20px',
                           height: '20px',
                           padding: '0px',
                           margin: '0px',
                           textAlign: 'center',
                           fontWeight: key === 0 || minuteNum === 0 ? 'bold' : 'normal'
                       }}>{minuteNum % 5 == 0 || key == 0 ? minuteNum : "|"}</div>;
                    })}
                </div>;
            </div>
            <div style={styles['clock-body-bottom']}>
                <div style={styles['current-time-knotch']}>&#9650;</div>
                <CurrentTimeIndicator working={clock.state.working} size={clock.state.size} running={clock.props.running} onComplete={clock.toggleWorking} />
            </div>
        </div>;
    }
}

export default ClockIndicator;