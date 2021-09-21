import React from 'react'
import Button from './Button'

class Stopwatch extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            running: false,
            elapsed: 0,
            lastTick: 0
        }

        this.handleStart=this.handleStart.bind(this)
        this.handlePause=this.handlePause.bind(this)
        this.handleStop=this.handleStop.bind(this)
        this.tick=this.tick.bind(this)

    }

    componentDidMount(){
        this.interval = setInterval(this.tick,1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    tick(){
        if(this.state.running){
            let now = Date.now()
            let diff = now - this.state.lastTick

            this.setState({
                elapsed: this.state.elapsed + diff,
                lastTick: now
            })   
        }
    }

    handleStart(){
        this.setState({
            running: true,
            lastTick: Date.now()
        })
    }

    handlePause(){
        this.setState({
            running: false
        })
    }

    handleStop(){
        this.setState({
            running: false,
            elapsed: 0,
            lastTick: 0
        })
    }

    format(millisecons){
        let totalSeconds = Math.floor(millisecons/1000)
        let minutes = Math.floor(totalSeconds/60)
        let seconds = totalSeconds % 60
        
        return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
    }

    render(){
        let time = this.format(this.state.elapsed)
        return(
            <section className="stopwatch">
                <div className="stopwatch-time">{time}</div>
                <div className="stopwatch-controls">
                    {this.state.running ? 
                        <button onClick={this.handlePause}>Pause</button>
                        :
                        <button onClick={this.handleStart}>Start</button>
                    }
                    <button onClick={this.handleStop}>Stop</button>
                    
                </div>
            </section>
        )
    }

}

export default Stopwatch