## 3 types of testing
integration testing
unit tests
E2E testing

**Cypress : E2E testing** 
Unlike the frontend's unit tests, Cypress tests can be in the frontend or the backend repository, or even in their own separate repository.
The tests require the tested system to be running *(fe & be must be running)*
*npm run cypress:open*
there is a difference between *CSS class selector* and *CSS id selector* when using cypress get methode
*every test start from zero not from the end of the previous test*

Custom commands are declared in *cypress/support/commands.js*
