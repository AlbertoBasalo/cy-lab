/// <reference types="cypress" />


import { typeBlur } from "./action.functions"
import { login, loginUI, loginUICredentials } from "./login.functions"

Cypress.Commands.add('login', login)
Cypress.Commands.add('loginUI', loginUI)
Cypress.Commands.add('loginUICredentials', loginUICredentials)
Cypress.Commands.add('typeBlur', typeBlur)
