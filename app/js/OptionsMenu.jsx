import React, {Component} from 'react';

var styles = {
    'options-menu-background': {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        height: '240px',
        zIndex: '30',
        fontSize: '20pt',
        backgroundColor: '#E46157',
        color: '#FFAAAA'
    },
    'options-box': {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        maxHeight: '180px',
        maxWidth: '250px',
        margin: 'auto',
        textAlign: 'center',
        lineHeight: '60px',
    },
    'options-item': {
        height: '60px'
    },
};

class Button extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault();
        e.target.style.marginTop = '10px';
        if (this.props.onClick) return this.props.onClick(e);
        return;
    }
    
    handleRelease(e) {
        e.preventDefault();
        e.target.style.marginTop = '0px';
        if (this.props.onRelease) return this.props.onRelease(e);
        return;
    }
    
    render() {
        var styles = {
            'options-button': {
                verticalAlign: 'middle',
                fontSize: '16pt',
                padding: '5px',
                margin: '0px',
                borderRadius: '15px',
                border: '1px solid #FF8F86',
                outline: 'none',
                color: '#FF8F86',
                background: 'none'
            }
        }
        return <button onMouseDown={this.handleClick} onTouchStart={this.handleClick} onTouchEnd={this.handleRelease} onMouseUp={this.handleRelease} style={this.props.style || styles['options-button']}>{this.props.children}</button>;
    }
}

class OptionsMenu extends Component {
    render() {
        return <div style={styles['options-menu-background']}>
            <div style={styles['options-box']}>
                <div style={styles['options-item']}><Button onClick={this.props.subtractWork}>-</Button> Work: <strong>{this.props.workSize}</strong> <Button onClick={this.props.addWork}>+</Button></div>
                <div style={styles['options-item']}><Button onClick={this.props.subtractPlay}>-</Button> Play: <strong>{this.props.playSize}</strong> <Button onClick={this.props.addPlay}>+</Button></div>
                <div style={styles['options-item']}>&nbsp;<Button onRelease={this.props.reset}>Reset Clock</Button>&nbsp;</div>
            </div>
        </div>
    }
}

export default OptionsMenu;