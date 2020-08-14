import React from 'react'
import { connect } from 'react-redux'
import style from '../css/main.module.css'

const MyAccount = (props) => {

    return (
        <>
        
        <div className={style.headerText}><b>ЛИЧНЫЙ КАБИНЕТ</b></div>
        <div style={ {paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 15} }>
            <div className={style.acountInfo}>
                <div style={{ fontSize: 12}}>
                    <div><b>Ф.И.О.:</b> {props.orderData.fio}</div>
                    <div><b>Название компании / ИНН:</b> {props.orderData.innComp}</div>
                    <div><b>Название компании / ИНН вашего покупателя:</b> {props.orderData.innBuyer}</div>
                    <div><b>Телефон:</b> {props.orderData.phone}</div>
                    <div><b>Адрес электронной почты:</b> {props.orderData.email}</div>
                </div>

                {
                    props.dataBuyer.map((buyer, index) => {
                        return(
                            <div style={{fontSize: 12}} key={index}>
                                <div style={{fontSize: 15, marginTop: 15}}><b>Покупатель {index+1}</b></div>
                                <div><b>{buyer.name}: </b>{ buyer.sum } руб.</div>
                            </div>
                        )
                    })
                }
            </div>

            <div style={{ textAlign: 'center', fontSize: 13, paddingBottom: 15, marginTop: 20 }}>Загрузите изображения Устава и Паспорта</div>
            <div className={style.box}>
					<input type="file" name="pasport" className={style.inputfile} multiple />
					<label><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Загрузить файлы&hellip;</span></label>
			</div>
            <button className={ `${style.formButton} ${style.animation}`} type='submit'>Отправить</button> 
        </div>
        </>
    )
}

let mapStateToProps = (state) => {
    return {
        orderData: state.dataReduser.orderData,
        dataBuyer: state.dataReduser.buyerData
    }
}

export default connect(mapStateToProps, {})(MyAccount)