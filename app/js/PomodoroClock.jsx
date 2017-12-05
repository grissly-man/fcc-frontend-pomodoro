import React, {Component} from 'react';
import ClockIndicator from './ClockIndicator';
import OptionsMenu from './OptionsMenu';

var styles = {
    'clock-container': {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        margin: 'auto',
        width: "350px",
        height: "350px",
        border: '0px hidden',
    },
    'clock-stem-container': {
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        height: '80px',
        overflow: 'hidden'
    },
    'clock-stem': {
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        height: '350px',
        borderRadius: '175px',
        background: "#a4b357", /* Old browsers */
        background: "-moz-linear-gradient(top, #a4b357 0%, #75890c 100%)", /* FF3.6-15 */
        background: "-webkit-linear-gradient(top, #a4b357 0%,#75890c 100%)", /* Chrome10-25,Safari5.1-6 */
        background: "linear-gradient(to bottom, #a4b357 0%,#75890c 100%)", /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        color: "#FFF"
    },
    'clock-stem-content': {
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        margin: 'auto',
        textAlign: 'center',
        width: '100px',
        lineHeight: '80px',
        height: '80px'
    },
    'clock-body-container': {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        height: '260px',
        overflow: 'hidden'
    },
    'clock-body': {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        height: '350px',
        borderRadius: '175px',
        backgroundColor: '#E46157',
        overflow: 'hidden'
    },
    'clock-body-inner-container': {
        position: 'absolute',
        top: '100px',
        bottom: '10px',
        left: '10px',
        right: '10px',
        overflow: 'hidden',
    },
    'clock-body-inner': {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        height: '330px',
        borderRadius: '165px',
        overflow: 'hidden',
    },
    'state-indicator': {
        position: 'absolute',
        left: '0px',
        right: '0px',
        top: '20px',
        margin: 'auto',
        padding: '0px',
        width: '40px',
        textAlign: 'center',
        fontSize: '25pt'
    }
};

class PomodoroClock extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        
        this.addPlay = this.addPlay.bind(this);
        this.addWork = this.addWork.bind(this);
        this.subtractPlay = this.subtractPlay.bind(this);
        this.subtractWork = this.subtractWork.bind(this);
        this.reset = this.reset.bind(this);
        
        this.state = {
            workSize: 25,
            playSize: 5,
            running: false,
            key: Date.now()
        };
    }
    
    handleClick(e) {
        e.preventDefault();
        var clockStem = document.getElementById('clock-stem');
        clockStem.style.top = '7px';
        this.setState({
            running: !this.state.running
        });
    }
    
    handleRelease(e) {
        e.preventDefault();
        var clockStem = document.getElementById('clock-stem');
        clockStem.style.top = '0px';
    }
    
    addWork() {
        this.setState({
            workSize: this.state.workSize + 1
        });
    }
    
    subtractWork() {
        if (this.state.workSize <= 1) return;
        
        this.setState({
            workSize: this.state.workSize - 1
        });
    }
    
    addPlay() {
        this.setState({
            playSize: this.state.playSize + 1
        });
    }
    
    subtractPlay() {
        if (this.state.playSize <= 1) return;
        
        this.setState({
            playSize: this.state.playSize - 1
        });
    }
    
    reset() {
        this.setState({
            workSize: 25,
            playSize: 5,
            running: false,
            key: Date.now()
        });
    }
    
    render() {
        return <div style={styles['clock-container']} key={this.state.key}>
            <div style={styles['clock-stem-container']} id='clock-stem'>
                <div style={styles['clock-stem']} onTouchStart={this.handleClick} onTouchEnd={this.handleRelease} onMouseDown={this.handleClick} onMouseUp={this.handleRelease}>
                    <div style={styles['clock-stem-content']}>{!this.state.running ? "Start" : "Pause"}</div>
                </div>
            </div>
            <div style={styles['clock-body-container']}>
                <div style={styles['clock-body']}>
                    <div style={styles['clock-body-inner-container']}>
                        <div style={styles['clock-body-inner']}>
                            {!this.state.running ? <OptionsMenu reset={this.reset} workSize={this.state.workSize} playSize={this.state.playSize} addPlay={this.addPlay} addWork={this.addWork} subtractPlay={this.subtractPlay} subtractWork={this.subtractWork} /> : null}
                            <ClockIndicator workSize={this.state.workSize} playSize={this.state.playSize} running={this.state.running} />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default PomodoroClock;