describe('Automate a site', () => { 
 
    it('login with invalid user and validate error message', () => { 
 
        cy.visit("https://www.saucedemo.com/v1/") 
 
        cy.get("#user-name").type("invalid_username") 
        cy.get("#password").type("invalid_password") 
        cy.get("#login-button").click() 
 
        let expname3 = "Epic sadface: Username and password do not match any user in this service" 
 
        cy.get("h3[data-test='error']").then( (x4) => { 
                             
                                let actname3 = x4.text() 
                                assert.equal(actname3,expname3) 
        }) 
 
    }) 
    it('login with valid credential and add 2 products with t-shirt to cart', () => { 
 
        cy.visit("https://www.saucedemo.com/v1/") 
        cy.wait(3000) 
 
        cy.get("#user-name").type("standard_user") 
        cy.get("#password").type("secret_sauce") 
        cy.get("#login-button").click() 
        cy.url().should('contain', 'v1') 
 
        cy.get("div[class='inventory_item']").should('have.length', '6') 
 
        //add to cart and validate the count 
        cy.xpath("//div[3]//div[3]//button[1]").click() 
        cy.xpath("//div[4]//div[3]//button[1]").click() 
 
        cy.get(".fa-layers-counter.shopping_cart_badge").should('have.text', '2') 
 
        //click on cart and checkout button 
        cy.get("svg[role='img']").click() 
        cy.get(".btn_action.checkout_button").click() 
 
        //checkout formalities 
        cy.get("#first-name").type("Sanchit") 
        cy.get("#last-name").type("Bhatnagar") 
        cy.get("#postal-code").type("400001") 
        cy.get("input[value='CONTINUE']").click() 
        cy.get(".btn_action.cart_button").click() 
 
        cy.wait(3000) 
         
        let expname4 = "THANK YOU FOR YOUR ORDER" 
        cy.get(".complete-header").then((y2) => { 
 
                          let actname4 = y2.text() 
                          assert.equal(actname4,expname4) 
        }) 
    }) 
}) 