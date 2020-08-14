import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { createTextMask } from 'redux-form-input-masks';
import style from '../css/main.module.css'
import { addBuyerForm, getStep } from '../redux/dataReduser'
import loader from '../img/loader.svg'
import { validation } from '../redux/utils'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <div>
        <input className={touched && (error || warning) ? style.inputError : style.inputStyle} {...input} placeholder={label} type={type} />
        {touched && ((error && <div className={style.warningText}>{error}</div>) || (warning && <div>{warning}</div>))}
      </div>
    </div>
  )

const phoneMask = createTextMask({
    pattern: '+7(999)999-99-99',
  })

const Form = (props) => {

    const addBuyer = () => {
        const newBuyer = {
            id: props.buyerForms[0] !== undefined ? parseInt(props.buyerForms[props.buyerForms.length - 1].id) + 1 : '1', 
            name: props.buyerForms[0] !== undefined ? 'fioBuyer' + (parseInt(props.buyerForms[props.buyerForms.length - 1].id) + 1) : 'nameBuyer', 
            sum: props.buyerForms[0] !== undefined ? 'sumBuyer'+ (parseInt(props.buyerForms[props.buyerForms.length - 1].id) + 1) : 'sumBuyer'
        }
        props.addBuyerForm(newBuyer)
    }
    
    return (
        <>
        {
            props.step === '3' ? <>
            <div className={style.approved}>Вам предварительно одобрено предложение по факторингу.<br/> В ближайшее время с вами свяжется наш менеджер.<br/></div>
            <div style={{ textAlign: 'center', fontSize: 13, paddingBottom: 15 }}>Уже сейчас, в личном кабинете, вы можете предоставить<br/>  необходимый пакет документов.</div>
            <form>
                <div style={{textAlign: 'center'}}>
                    <li><Field className={style.inputCabinet} placeholder='Логин' component={'input'} type={'text'} name={'login'} /></li>
                    <li><Field className={style.inputCabinet} placeholder='Пароль' component={'input'} type={'password'} name={'pass'} /></li>
                    <div style={{ fontSize: 12, cursor: 'pointer' }}><u>Забыли пароль?</u></div>
                </div><br/>
                <button className={ `${style.formButton} ${style.animation}`} type='submit'>Войти в личный кабинет</button> 
            </form></> 
            :
            <form onSubmit={ props.handleSubmit }>
                <li><Field component={renderField} label={'Ф.И.О.'} type={'text'} name={'fio'} validate={validation.required} /></li>
                <li><Field component={renderField} label={'Название компании / ИНН'} type={'text'} name={'innComp'} validate={validation.required} /></li>
                <li><Field component={renderField} label={'Название компании / ИНН вашего покупателя'} type={'text'} name={'innBuyer'} validate={validation.required} /></li>
                <li><Field component={renderField} label={'+7(___)___-__-__'} type={'tel'} name={'phone'} validate={[validation.required, validation.phone(10)]} {...phoneMask} /></li>
                <li><Field component={renderField} label={'Адрес электронной почты'} type={'email'} name={'email'} validate={[validation.required, validation.email]} /></li>
                <li><Field component={renderField} label={'Сумма финансирования, руб.'} type={'text'} name={'sum'} validate={[validation.required, validation.maxValue(50000000), validation.minValue(300000)]} normalize={validation.rank} /></li>
                
                {
                    props.buyerForms.map(form => <FormBuyer key={form.id} id={form.id} name={form.name} sum={form.sum}/>)
                }

                <button onClick={ addBuyer } className={`${style.addButton} ${style.animation}`} type='button'>Добавить покупателя</button>

                {
                    props.step === '1' ? <>
                    <li className={style.agree}>Даю согласие на обработку моих персональных данных и подтверждаю факт<br/> ознакомления с Политикой в отношении обработки персональных данных.</li>
                    <div style={{textAlign: 'center'}}><button className={ `${style.formButton} ${style.animation}` } type='submit'>Отправить заявку</button></div></> : 
                    props.step === '2' ? <div style={{textAlign: 'center'}}><img src={loader} alt={''} /></div> : null
                }
            </form> 
        }
        </>
    )
}

const FormBuyer = (props) => {
    return(
        <>
        <div className={style.line}><span>Покупатель {parseInt(props.id)+1}</span></div>
        <li><Field component={renderField} label={'Название компании / ИНН вашего покупателя'} type={'text'} name={props.name} validate={validation.required} /></li>
        <li><Field component={renderField} label={'Сумма финансирования, руб.'} type={'text'} name={props.sum} validate={[validation.required, validation.maxValue(50000000), validation.minValue(300000)]} normalize={validation.rank} /></li>
        </>
    )
}

const FormComponent = reduxForm({form: 'formData'})(Form)

const FactoringReqForm = (props) => {

    const onSubmit = (data) => {
        console.log(data)
        props.getStep('2')
    }

    return (
        <>
        <FormComponent 
        onSubmit={ onSubmit } buyerForms={ props.buyerForms } 
        addBuyerForm={ props.addBuyerForm } step={ props.step } />
        </>
    )
} 

let mapStateToProps = (state) => {
    return {
        buyerForms: state.dataReduser.buyerForms,
        step: state.dataReduser.step,
    }
}

export default connect(mapStateToProps, { addBuyerForm, getStep })(FactoringReqForm)