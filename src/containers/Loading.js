import React from 'react';

// Component made to for loading animation. Allows for info to get to component
// without looking too messy.
class Loading extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: 'Loading'
        }
    }

    // When component mounts, we add ... to text and remove ... at stopper and start again.
    componentDidMount() {
        const stopper = this.state.text + '...'

        this.interval = window.setInterval(() => {
            this.state.text === stopper 
            ? this.setState({text: 'Loading'})
            : this.setState((currentState)=> {
                return {
                    text: currentState.text + '.'
                }
            })
        }, 300);
    }

    // Clears interval, so process gets killed.
    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return <p>{this.state.text}</p>
    }
}

export default Loading;