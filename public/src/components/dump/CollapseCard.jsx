import React from 'react';

export const CollapseCard = (props) => {

    return (
        <form className={`card-body nopadding ${(props.isshow) ? 'show' : 'collapse'}`} id={props.id}>
            <h3>{props.title}</h3>
            {props.children}
        </form>
    )
}