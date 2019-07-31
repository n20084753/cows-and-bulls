import React, {Component} from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import './play-area.scss';

import CustomCodeInput from '../../components/CustomCodeInput';
import GuessResult from '../../components/GuessResult';

class PlayArea extends Component {
    state = {
        input: "",
        history: [],
        timer: 0
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.setState({timer: this.state.timer + 1});
        }, 1000)
    }

    componentWillUnmount = () => clearInterval(this.interval)

    formattedTime = () => {
        let min = Math.floor(this.state.timer / 60) + "";
        let sec = (this.state.timer - min * 60) + "";

        return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
    }

    checkGuessedNumber = (e) => {
        let input = this.state.input,
            secret = this.props.secretNumber,
            cowsCount = 0,
            bullsCount = 0,
            newHistory = [...this.state.history];

        // To handle focus on button, if not keypress is not handled
        if (e) {
            document.activeElement.blur();
        }

        if (secret.length !== input.length) {
            return;
        }        
        let flag = [];
        for (let i = 0; i< input.length; i++) {
            if (secret[i] === input[i]) {
                cowsCount++;
                flag[i] = 'C';
            } else {
                for (let j = 0;j< input.length;j++) {
                    if (secret[j] === input[i]) {
                        if(flag[j] !== 'C'&&flag[j] !== 'B') {
                            bullsCount++;
                            flag[j] = 'B';
                        }
                    }
                }
            }
        }

        newHistory.unshift({
            input: input,
            result: {
                cowsCount: cowsCount,
                bullsCount: bullsCount
            }
        });

        this.setState({
             history: newHistory,
             input: ""
        });

        if (cowsCount === secret.length) {
            clearInterval(this.interval);

            this.props.onComplete({
                timeTaken: this.formattedTime(),
                noOfAttempts: this.state.history.length
            });
        }
    }

    updateInput = (key) => {
        let newInput = this.state.input;

        if (key === "enter") {
            if (this.props.secretNumber.length === newInput.length) {
                this.checkGuessedNumber();
            }
            return;
        }        

        if (!isNaN(key)) {
            if (this.props.secretNumber.length === newInput.length) {
                return;
            }

            newInput += key;
        } else if (newInput.length > 0) {
            newInput = newInput.slice(0, -1);
        }

        this.setState({ input: newInput });
    }

    render() {
        let length = this.state.history.length;
        let historyContent = this.state.history.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="collapsing">{(length - index)}</td>
                    <td>
                        <CustomCodeInput
                            input={item.input}
                            level={this.props.secretNumber.length}
                        />
                    </td>
                    <td className="collapsing right"><GuessResult data = {item.result} /></td>
                </tr>
            )
        });

        let recentGuess = this.state.history[0],
            recentGuessContent = (<div className="recent-guess">No recent Guesses made</div>);

        if (recentGuess) {
            recentGuessContent = (
                <div className="recent-guess">
                    <CustomCodeInput
                        input={recentGuess.input}
                        level={this.props.secretNumber.length}
                    />                     
                    <div className="recent-guess--result inline-content">
                        <GuessResult data={recentGuess.result} />
                    </div>
                </div>
            )
        }

        return (
            <div className="play-area">
                
                <div className="ui right floated segment">
                    <b>{this.formattedTime()}</b>
                </div>
                <div className="ui left floated segment">
                    # of attempts: <b>{length}</b>
                </div>
                
                <div className="clear"></div>
                
                <div className="game-input">
                    <CustomCodeInput
                        large = {true}
                        input = {this.state.input}
                        level = {this.props.secretNumber.length}
                    />
                    <div>
                        <div tabIndex="0" onClick={this.checkGuessedNumber} className="positive ui button">Guess</div>
                    </div>
                </div>
                
                <KeyboardEventHandler
                    handleKeys={['numeric', 'backspace', 'delete', 'clear', 'enter']}
                    onKeyEvent={(key, e) => this.updateInput(key)} />
                
                <div className="ui divider"></div>
                
                {recentGuessContent}
                
                <div className="ui divider"></div>
                
                <div>
                    <table className="ui celled striped table">
                        <thead>
                            <tr>
                                <th colSpan="3">Guesses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyContent}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PlayArea;