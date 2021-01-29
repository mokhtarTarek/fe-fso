import React from 'react'
//LoginForm is an object let's distructuring it
const LoginForm=({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
})=>{
return(
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

export default LoginForm