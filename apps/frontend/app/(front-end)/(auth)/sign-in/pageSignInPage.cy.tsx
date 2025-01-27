import React from 'react'
import SignInPage from './page'

describe('<SignInPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignInPage />)
  })
})