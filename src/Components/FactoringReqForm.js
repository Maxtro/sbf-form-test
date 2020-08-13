import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import style from '../css/main.module.css'
import { addBuyerForm, getStep } from '../redux/dataReduser'
import loader from '../img/loader.svg'

const required = value => value ? undefined : 'Обязательное для заполнения поле'

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Некорректный адрес электронной почты' : undefined

const phone = value => value && !/^\+7\s?[(]{0,1}9[0-9]{2}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/i.test(value) ?
  'Укажите номер телефона в формате +7ХХХXXXXXXX' : undefined

  const maxValue = (max) => value =>
  parseInt(value.replace(/\s/g, '')) && parseInt(value.replace(/\s/g, '')) > max ? `Сумма должна быть не больше ${max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.` : undefined
const maxValue50 = maxValue(50000000)

const minValue = (min) => value =>
parseInt(value.replace(/\s/g, '')) && parseInt(value.replace(/\s/g, '')) < min ? `Сумма должна быть не меньше ${min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.` : undefined
const minValue30 = minValue(300000)

const rank = value => value && value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <div>
        <input className={touched && (error || warning) ? style.inputError : style.inputStyle} {...input} placeholder={label} type={type} />
        {touched && ((error && <div className={style.warningText}>{error}</div>) || (warning && <div>{warning}</div>))}
      </div>
    </div>
  )

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
                <li><Field component={renderField} label={'Ф.И.О.'} type={'text'} name={'fio'} validate={required} /></li>
                <li><Field component={renderField} label={'Название компании / ИНН'} type={'text'} name={'innComp'} validate={required} /></li>
                <li><Field component={renderField} label={'Название компании / ИНН вашего покупателя'} type={'text'} name={'innBuyer'} validate={required} /></li>
                <li><Field component={renderField} label={'Номер телефона'} type={'tel'} name={'phone'} validate={[required, phone]} /></li>
                <li><Field component={renderField} label={'Адрес электронной почты'} type={'email'} name={'email'} validate={[required, email]} /></li>
                <li><Field component={renderField} label={'Сумма финансирования, руб.'} type={'text'} name={'sum'} validate={[required, maxValue50, minValue30]} normalize={rank} /></li>
                
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
        <li><Field component={renderField} label={'Название компании / ИНН вашего покупателя'} type={'text'} name={props.name} validate={required} /></li>
        <li><Field component={renderField} label={'Сумма финансирования, руб.'} type={'text'} name={props.sum} validate={[required, maxValue50, minValue30]} normalize={rank} /></li>
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