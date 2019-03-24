import React from 'react';

export const Block = (props) => {

    return (
        <div className="card steps">
            <div className="card-body">
                {
                    (props.title !== undefined) 
                    ?  <h5 className="card-title">{props.title}</h5>
                    : null
                }
                {props.children}
            </div>
        </div>
    )
}