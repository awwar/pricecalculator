var initialState = {
    formId: 1,
    inputData: {},
    taxes: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "switchForm":
            return {
                ...state,
                formId: action.payload
            };
        case "deleteInputData":
            if (action.payload.name in state.inputData) {
                delete state.inputData[action.payload.name];
            } 
            return {
                ...state,
                inputData: state.inputData
            };
        case "addInputData":
            state.inputData[action.payload.name] = action.payload
            return {
                ...state,
                inputData: state.inputData
            };
        case "addTaxes":
            state.taxes[action.payload.formId] = action.payload.data
            return {
                ...state,
                taxes: state.taxes
            };

        default:
            return state;
    }
};

