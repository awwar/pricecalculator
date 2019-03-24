import React from 'react';

export const HeadTitleBlock = (props) => {

    return (
        <div className="card steps">
            <div className="card-primary card-header" id="card-head">
                {props.title}
            </div>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}