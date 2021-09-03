import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import hvReducer from "./hyperverge/reducers";
import navReducer from './slices/navSlice'


const rootReducer = combineReducers({ 
  hv: hvReducer ,
  nav: navReducer,
});
const configureStore = createStore(rootReducer, applyMiddleware(thunk))

export default configureStore;
