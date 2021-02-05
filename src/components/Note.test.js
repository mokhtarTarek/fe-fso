import React from 'react';
//importing test library
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Note from './Note'
import Togglable from './Togglable'
import NoteForm from './NoteForm'
test ('renders content',()=>{
const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
}
//the test render the comp using the render() method provied by react-testing-lib
const component = render(
    <Note note={note} />
  )
  //component.debug()
const li=component.container.querySelector('li')
console.log(prettyDOM(li))
/*
render return an od that has serveral props :
one of them is called container and it contain
all the html rendred by the component
*/
//method1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  //method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', () => {
    
  const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  //The event handler is mock function defined with Jest:
    const mockHandler = jest.fn()
  
    const component = render(
      <Note note={note} toggleImportance={mockHandler} />
    )
    //The test finds the button based on the text from the rendered component and clicks the element:
    const button = component.getByText('make not important')
    fireEvent.click(button)
  //The expectation of the test verifies that the mock function has been called exactly once.
    expect(mockHandler.mock.calls).toHaveLength(1)
})

  describe('<Togglable />', () => {
    let component
    //The beforeEach function gets called before each test
    beforeEach(() => {
      component = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" />
        </Togglable>
      )
    })

  //The first test verifies that the Togglable component renders its child component <div className="testDiv" />.
    test('verify that the comp renders its children', () => {
      expect(
        component.container.querySelector('.testDiv')
      ).toBeDefined()
    })
  
    test('verify at start the children are not displayed', () => {
      const div = component.container.querySelector('.togglableContent')
  
      expect(div).toHaveStyle('display: none')
    })
  
    test('after clicking the button, children are displayed', () => {
      const button = component.getByText('show...')
      fireEvent.click(button)
  
      const div = component.container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })
  })

  test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const createNote = jest.fn()
  
    const component = render(
      <NoteForm createNote={createNote} />
    )
  
    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')
  
    fireEvent.change(input, { 
      target: { value: 'testing of forms could be easier' } 
    })
    fireEvent.submit(form)
  
    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
  })
/*
npm test :run the test normaly

const createNote = jest.fn() : the event handler is created by jest.fn()

component.container.querySelector('className') : select div with classeName tag
component.container.querySelector('input') 

component.getByText('element text') : return the first mutching button
The getByText method that we used is just one of the many queries react-testing-library offers.
*/


