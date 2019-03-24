var initialState = {
    count: 0,
    type: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "counterChange":
            return {
                ...state,
                count: action.payload.price
            };
        default:
            return state;
    }
};
