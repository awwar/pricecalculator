import React from 'react';

export const Alert = (props) => {

    console.log(props);
    return (
        <div className={`alert fadein alert-${props.type} ${(props.show)?'show':'collapse'}`}>
            <span id="msg" style={{whiteSpace: 'pre-line'}}>{props.message.map((value)=>{
                return [<span>{'\u2728'}</span>, value+"\n"]
            })}</span>
        </div>
    )
}