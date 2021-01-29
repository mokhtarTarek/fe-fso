import React, { useState } from 'react'
//togglable component : reusible
const Togglable = (props) => {

    const [visible, setVisible] = useState(false)
   /*this component render 2 div where the visibilty (display attribut) is controlled by 2 buttons : 
   in the first render the visibility of the first div should be 'true' because visible state is 'false'
   when the button is clicked the visible is toggled then the first is invisible un the second div will be visible
   with his props.children and cancel button
   */
    const showWhenVisibleIsFalse = { display: visible ? 'none' : '' }
    const showWhenVisibleIsTrue = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (
        <div>
            <div style={showWhenVisibleIsFalse}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisibleIsTrue}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable
/*props.children
is available on every component. 
It contains the content between the opening and closing tags of a component
<Welcome>Hello world!</Welcome>
The string Hello world! is available in props.children in the Welcome component:
function Welcome(props) {
  return <p>{props.children}</p>;
}*/

