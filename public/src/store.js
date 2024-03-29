import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
// we need to pass the initial state with the new look
function configureStore() {
  return createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
export default configureStore;
