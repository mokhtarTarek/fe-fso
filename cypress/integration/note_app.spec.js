import { func } from "prop-types"

//using arrow fun is not recommended
describe('Note app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Tarek',
            username: 'Spartacus',
            password: 'Sparta'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Notes')
        cy.contains('Departement of Chemlan-City Moknine-Tunisia')
    })
    it('login form can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains('login').click()
    })
    it('user can log in', function () {
        cy.contains('login').click()
        cy.get('#username').type('Spartacus')
        cy.get('#password').type('Sparta')
        cy.get('#login-button').click()

        cy.contains('Tarek logged-in')
    })
    //it.only run only the required test
    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.contains('Wrong credentials')
        //the CSS class-selector is .classeName
        cy.get('.error').contains('Wrong credentials')
        //cy.get('html):acces the visible contain of the app
        cy.get('html').should('not.contain', 'Tarek logged-in')
        //cy.get('.error').should('contain',Wrong credentials')
        //cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        //cy.get('.error').should('have.css', 'border-style', 'solid')

        //because all test are for the same component : 

        // cy.get('.error')
        //     .should('contain', 'wrong credentials')
        //     .and('have.css', 'color', 'rgb(255, 0, 0)')
        //     .and('have.css', 'border-style', 'solid')
    })

    //Isn't the user logged in after the first test? No,
    //because each test starts from zero as far as the browser is concerned
    describe('when logged in', function () {
        beforeEach(function () {
            //the CSS id-selector is #idName

            /*cy.contains('login').click()
            cy.get('#username').type('Spartacus')
            cy.get('#password').type('Sparta')
            cy.get('#login-button').click()

            cy.contains('Tarek logged-in')*/

            //cypress recomand the log-in form and do
            //a HTTP request to the backend to login
            //see : support commande
            cy.login({username:'Spartacus',password:'Sparta'})
        })

        it('a new note can be created', function () {
            cy.contains('new Note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })

        describe('and several notes exists', function () {
            beforeEach(function () {
                // cy.contains('new Note').click()
                // cy.get('input').type('another note cypress')
                // cy.contains('save').click()
                cy.createNote({ content: 'first note',  important: false })
                cy.createNote({ content: 'second note',  important: false })
                cy.createNote({ content: 'third noe',  important: false })
                   
               
                  
            })
            it('one of those can be made important', function () {
                cy.contains('second note')
                    .contains('make important')
                    .click()

                cy.contains('second')
                    .contains('make not important')
            })

        })

    })

})

/*
We can access the first and the last input field on the page,
and write to them with the command cy.type like so:

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('input:first').type('mluukkai')
        cy.get('input:last').type('salainen')
      })

The test works. The problem is if we later add more input fields,
the test will break because it expects the fields it needs to be
the first and the last on the page.
It would be better to give our inputs unique ids and use
those to find them. We change our login form like so :
*/