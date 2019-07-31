import React, { Component } from "react";

import './game.scss';

import Header from '../../components/Header';
import GameInitializer from "../../components/GameInitializer";
import PlayArea from "../PlayArea";
import CustomCodeInput from "../../components/CustomCodeInput";

const GAME_STATUS = {
    INITIAL: 0,
    STARTED: 1,
    FINISHED: 2
};

const LEVEL = {
    EASY: 3,
    MEDIUM: 4,
    HARD: 5
};

class Game extends Component {
    state = {
        gameStatus: GAME_STATUS.INITIAL,
        numberOfAttempts: 0, 
        timeTaken: "",
        level: LEVEL.EASY,
        secretNumber: ""
    }

    constructor(props) {
        super(props);
        this.state.secretNumber = this.generateRandomNumber(this.state.level);        
    }

    generateRandomNumber = (level) => {
        var max = Math.pow(10, level);
        var min = Math.pow(10, level - 1);
        return Math.floor(Math.random() * (max - min) + min) + "";
    }

    // Sets new level on changing the levels
    setLevel = (level) => this.setState({
        level: level,
        secretNumber: this.generateRandomNumber(level)
    })
    
    // Updates the gameStatus to STARTED and begins new game
    startGame = () => this.setState({ gameStatus: GAME_STATUS.STARTED })

    // Updates the gameStatus to Finished and sets the result
    finishGame = (result) => this.setState({
        gameStatus: GAME_STATUS.FINISHED,
        numberOfAttempts: result.noOfAttempts,
        timeTaken: result.timeTaken
    })
    
    // Updates the gameStatus to INITIAL and resets the result to default
    resetGame = () => this.setState({            
        gameStatus: GAME_STATUS.INITIAL,
        numberOfAttempts: 0,
        timeTaken: "",
        secretNumber: this.generateRandomNumber(this.state.level)
    })  

    render() {
        return (
            <React.Fragment>
                <div className="game-container ui segment">
                    <Header />
                    {   
                        this.state.gameStatus === GAME_STATUS.INITIAL &&
                            <GameInitializer 
                                gameStatus = {this.state.gameStatus}
                                currentLevel={this.state.level}
                                levels = {LEVEL}
                                onSelectLevel = {this.setLevel}
                                onStart = {this.startGame}
                            />
                    }
                    {
                        this.state.gameStatus === GAME_STATUS.STARTED &&
                            <PlayArea 
                                secretNumber = {this.state.secretNumber}
                                onComplete = {this.finishGame}
                            />
                    }
                    {
                        this.state.gameStatus === GAME_STATUS.FINISHED &&
                            <React.Fragment>
                                <div className="game-result">
                                    <h1>YaY!<br/> Congrats Sherlock</h1>
                                    <CustomCodeInput 
                                        large = {true}
                                        input = {this.state.secretNumber}
                                        level = {this.state.secretNumber.length}
                                    />
                                    <p>You have taken <span className="highlight">{this.state.numberOfAttempts}</span> attempts in <span className="highlight">{this.state.timeTaken} minutes</span> to complete</p>
                                </div>
                                <div className="footer-button">
                                    <button onClick={this.resetGame} className="ui large red button">Try Again</button>
                                </div>
                            </React.Fragment>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Game;