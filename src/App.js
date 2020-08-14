import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import style from './css/main.module.css'
import FactoringReqForm from './Components/FactoringReqForm'
import MyAccount from './Components/MyAccount'

const MainRequestComponent = () => {
  return (
    <>
      <div className={style.headerText}><b>ЗАЯВКА НА ФАКТОРИНГ</b></div>
      <div style={ {paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 15} }>
          <FactoringReqForm/>
      </div>
    </>
   
  )
}

const App = () => {
  return (
    <div className="App">
      <div className={style.main}>
        <Route exact path='/' component={() => <MainRequestComponent />} />
        <Route exact path='/MyAccount' component={() => <MyAccount />} />
      </div>
    </div>
  )
}

export default App;
