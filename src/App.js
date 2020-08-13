import React from 'react';
import './App.css';
import style from './css/main.module.css'
import FactoringReqForm from './Components/FactoringReqForm'

const MainRequestComponent = () => {
  return (
    <div className={style.main}>
      <div className={style.headerText}><b>ЗАЯВКА НА ФАКТОРИНГ</b></div>
      <div style={ {paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 15} }>
          <FactoringReqForm/>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <MainRequestComponent />
    </div>
  )
}

export default App;
