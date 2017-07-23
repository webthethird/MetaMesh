import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

// Images
import uPortLogo from '../../../img/uport-logo.svg'

const LoginButton = ({ onLoginUserClick }) => {
  return(
      <div style={{ 'padding-left': '80px' }}>
        <a href="#" className="btn btn-primary" onClick={(event) => onLoginUserClick(event)}>Login with UPort</a>
     </div>
   
  )
}

export default LoginButton
