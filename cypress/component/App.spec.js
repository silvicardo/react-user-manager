import React from 'react';
import { mount } from '@cypress/react'
import App from "../../src/components/App";

describe('setup component testing check',function(){

    it('mounts component with expected elements', function(){

        mount(<App />);

        cy.findByAltText('logo').should('exist').and('be.visible');

        cy.findByText(/and save to reload./i).should('exist').and('be.visible')

        cy.findByText(/learn react/i).should('exist').and('be.visible')
    })

});