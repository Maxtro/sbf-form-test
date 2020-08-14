let ADD_BUYER = 'ADD_BUYER'
let IS_STEP = 'IS_STEP'
let SET_ORDER_DATA = 'SET_ORDER_DATA'
let SET_BUYER_DATA = 'SET_BUYER_DATA'

let initialState = {
    buyerForms: [],
    orderData: {},
    buyerData: [],
    step: '1'
}

const dataReduser = (state = initialState, action) => {

    switch (action.type) {

        case ADD_BUYER: {
            return { ...state, buyerForms: [...state.buyerForms, action.formArray] }
        }

        case IS_STEP: {
            return { ...state, step: action.step }
        }

        case SET_ORDER_DATA: {
            return { ...state, orderData: action.data }
        }

        case SET_BUYER_DATA: {
            return { ...state, buyerData: action.dataBuyer }
        }

        default:
            return state
    }
}

const setBuyerForm = (formArray) => ({ type: ADD_BUYER, formArray })
const setStep = (step) => ({ type: IS_STEP, step })
const setOrderData = (data) => ({ type: SET_ORDER_DATA, data })
const setBuyerData = (dataBuyer) => ({ type: SET_BUYER_DATA, dataBuyer })

export const addBuyerForm = (formArray) => (dispatch) => {  
    dispatch(setBuyerForm(formArray))
}

export const getOrderData = (data, dataBuyer) => (dispatch) => {  
    dispatch(setOrderData(data))
    dispatch(setBuyerData(dataBuyer))
}

export const getStep = (step) => (dispatch) => {
    dispatch(setStep(step))
     setTimeout(() => {
        dispatch(setStep('3'))
      }, 2000);
}

export default dataReduser