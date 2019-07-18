import React from 'react';

import cowImage from '../../assets/images/cow.png';
import bullImage from '../../assets/images/bull.png';
import wrongImage from '../../assets/images/wrong.png';


const GuessResult = (props)  => {    

    let guessResultContent = [];

    if (props.data.bullsCount || props.data.cowsCount) {
        if (props.data.cowsCount) {
            guessResultContent.push(
                <a key="cow-count" className="ui label">
                    <img className = "ui right spaced avatar image" src={cowImage} alt="cow" />
                    {props.data.cowsCount}
                </a>
            );
        } 

        if (props.data.bullsCount) {
            guessResultContent.push(
                <a key="bull-count" className="ui label">
                    <img className = "ui right spaced avatar image" src={bullImage} alt="cow" />
                    {props.data.bullsCount}
                </a>
            );
        }
    } else {
        guessResultContent.push(
            <a key="wrong-guess" className="ui image label">
                <img className="ui right spaced avatar image" src={wrongImage} alt="cow" />
                0
            </a>
        );
    }

    return (
        <div className="inline-content">
            {guessResultContent}
        </div>
    );
}

export default GuessResult;