import React from 'react';

import './custom-code-input.scss';

const CustomCodeInput = (props) => {
    let content = [];
    for (let i = 0; i < props.level; i++) {
        let value =  (props.input && props.input[i]) ? props.input[i] : "";
        content.push(<div key={i} className="ui large label">{value}</div>)
    }

    let className = props.large ? "custom-code-input large" : "custom-code-input"; 

    return (
        <div className={className}>
            <div className="ui circular labels">
                {content}
            </div>
        </div>
    )
}

export default CustomCodeInput;