import React from 'react';

export const SuccessCard = (props) => {
    return (
        <div className="bordertop border-left-success shadow">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs descriptiontext text-success text-uppercase mb-1">
                            {props.description}
                        </div>
                        <label className="switch">
                            {props.children}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}