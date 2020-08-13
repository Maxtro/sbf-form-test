let ADD_BUYER = 'ADD_BUYER'
let IS_STEP = 'IS_STEP'

let initialState = {
    buyerForms: [],
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

        default:
            return state
    }
}

const setBuyerForm = (formArray) => ({ type: ADD_BUYER, formArray })
const setStep = (step) => ({ type: IS_STEP, step })

export const addBuyerForm = (formArray) => (dispatch) => {  
    dispatch(setBuyerForm(formArray))
}

export const getStep = (step) => (dispatch) => {
    dispatch(setStep(step))
     setTimeout(() => {
        dispatch(setStep('3'))
      }, 2000);
}

export default dataReduser