import React from 'react'
import PropTypes from 'prop-types'
//LoginForm is an object let's distructuring it
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
                    Username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
                    Password
          <input
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>

      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm