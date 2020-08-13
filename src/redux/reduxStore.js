import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import dataReduser from './dataReduser'

let rootReduser = combineReducers({
    dataReduser,
    form: formReducer,
})

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))

export default store