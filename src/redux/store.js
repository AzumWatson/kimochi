import { createStore, combineReducers, applyMiddleware} from 'redux'
import reduxPromise from 'redux-promise'

const Reducer = (prevState = {
    json: null
}, action) => {

    let newState = { ...prevState }

    switch (action.type) {
        case "change-json":
            newState.json = action.payload
            return newState

        default:
            return prevState
    }
}

const pageReducer = (prevState = {
    pagelist: {
        list:[],
        button:true,
        page:1
    }
}, action) => {

    let newState = { ...prevState }

    switch (action.type) {
        case "listAdd":
            newState.pagelist = action.payload
            return newState
        default:
            return prevState
    }
}

// 合并 reducer
const reducer = combineReducers({
    Reducer,
    pageReducer
})

const store = createStore(reducer,applyMiddleware(reduxPromise));

export default store