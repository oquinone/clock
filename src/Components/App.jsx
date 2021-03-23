import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import Beep from '../Sound/arcade-climb_tone_001.mp3';

import './App.scss';

class Clock extends Component {
    constructor(props){
        super(props);
        this.state = ({
            break_length: 5,
            session_length: 25,
            min: 25,
            sec: 0,
            running: false,
            intervalID: 0,
            session_Break: false,
            text: "Session",
        });
    }

    reset = () => {
        this.stopSound();
        this.pauseClock();
        
        this.setState({
            break_length: 5,
            session_length: 25,
            min: 25,
            sec: 0,
            running: false,
            intervalID: 0,
            text: "Session",
        })
    }

    decrement = (val) => {
        if(!this.state.running){
            if(val === "break" && this.state.break_length > 1){
                this.setState({
                    break_length: this.state.break_length - 1 
                })
            }
            else if(val === "session"){
                if(this.state.session_length > 1){
                    this.setState({
                        session_length: this.state.session_length - 1,
                        min: this.state.session_length - 1,
                        sec: 0
                    })
                }
            }
        }
    }

    increment = (val) => {
        if(!this.state.running){
            if(val === "break" && this.state.break_length < 60){
                this.setState({
                    break_length: this.state.break_length + 1 
                })
            }
            else if(val === "session"){
                if(this.state.session_length < 60){
                    this.setState({
                        session_length: this.state.session_length + 1,
                        min: this.state.session_length + 1,
                        sec: 0
                    })
                }
            }
        }
    }

    clock = () => {
        if(this.state.min === 0 && this.state.sec === 0){
            if(this.state.text !== "Break"){
                this.setState({
                    min: this.state.break_length,
                    sec: 0,
                    text: "Break"
                })
            }
            else{
                this.setState({
                    min: this.state.session_length,
                    sec: 0,
                    text: "Session"
                })
            }
        }
        else{
            if(this.state.sec === 0){
                this.setState({
                    min: this.state.min - 1,
                    sec: 59
                })
            }
            else{
                this.setState({
                    sec: this.state.sec - 1
                })
            }
        }
    }

    start_pause = () => {
        if(!this.state.running){
            this.startClock();
        }
        else{
            this.pauseClock();
        }
    }
    
    startClock = () => {
        let p = setInterval(this.clock, 1000)
        this.setState({
            running: true,
            intervalID: p
        })
    }

    pauseClock = () => {
        clearInterval(this.state.intervalID);
        this.setState({
            intervalID: 0,
            running: false
        })
    }
    
    playSound = () => {
        if(this.state.min === 0 && this.state.sec === 0){
            var sound = document.getElementById("beep");
            sound.play();
        }
    }

    stopSound = () => {
        var sound = document.getElementById("beep");
        sound.pause();
        sound.currentTime = 0;
    }

    render() { 
        return (
            <div id="clock">

                <div id="btns">
                    <span id="start_stop" onClick={() => this.start_pause()}>
                        <button className="btn-start-refresh"><FontAwesomeIcon icon={faPlay}/><FontAwesomeIcon icon={faPause}/></button>
                    </span>
                    <span id="reset" onClick={() => this.reset()}>
                        <button className="btn-start-refresh"><FontAwesomeIcon icon={faSync}/></button>
                    </span>
                </div>

                <div id="timer-label" className="flexC">
                    <h2>{ this.state.text }</h2>
                    <div id="time-left">
                        {(this.state.min) < 10 ? (`0${this.state.min}`) : (`${this.state.min}`) }:
                        {this.state.sec < 10 ? (`0${this.state.sec}`) :(`${this.state.sec}`)}
                    </div>
                    <audio src={Beep} id="beep"> { this.playSound() }</audio>
                </div>

                <div className="flex">
                    <div id="break-label">
                        <h2>Break Length</h2>
                        <span id="break-decrement" onClick={() => this.decrement("break")}>
                            <button className="btn"><FontAwesomeIcon icon={faArrowDown}/></button>
                        </span>
                        <span id="break-length">{ this.state.break_length }</span>
                        <span id="break-increment" onClick={() => this.increment("break")}>
                            <button className="btn"><FontAwesomeIcon icon={faArrowUp}/></button>
                        </span>
                    </div>
                    <div id="session-label">
                        <h2>Session Length</h2>
                        <span id="session-decrement" onClick={() => this.decrement("session")}>
                            <button className="btn"><FontAwesomeIcon icon={faArrowDown}/></button>
                        </span>
                        <span id="session-length">{ this.state.session_length }</span>
                        <span id="session-increment" onClick={() => this.increment("session")}>
                            <button className="btn"><FontAwesomeIcon icon={faArrowUp}/></button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Clock;