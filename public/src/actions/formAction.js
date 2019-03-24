export var switchFormAction = (payload) => {
    return {
        type: "switchForm",
        payload
    }
}

export var submitFormAction = (payload) => {
    return {
        type: "addTaxes",
        payload
    }
}

export var addInputDataAction = (payload) => {
    return {
        type: "addInputData",
        payload
    }
}

export var deleteInputDataAction = (payload) => {
    return {
        type: "deleteInputData",
        payload
    }
}