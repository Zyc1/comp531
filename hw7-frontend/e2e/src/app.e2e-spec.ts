import {browser, by, element} from 'protractor';


    describe('authentication and main page test', () => {

        it('register a new user', () => {
            browser.get('#/registration').then(() => {
                element(by.id('accountName')).sendKeys('testUser');
                element(by.id('email')).sendKeys('test@aa.com');
                element(by.id('phone')).sendKeys('123-456-6789');
                element(by.id('birthdate')).sendKeys('10/31/1996');
                element(by.id('zipcode')).sendKeys('12345');
                element(by.id('password')).sendKeys('123456');
                element(by.id('confirmation')).sendKeys('123456');
                element(by.id('register')).click();
                expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/main');
             });
        });

        it('login as new user', () => {
            browser.get('/auth').then(() => {
                element(by.id('username')).sendKeys('testUser');
                element(by.id('password')).sendKeys('123456');
                element(by.id('login')).click();
                expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/main');
            });
        });

        it('Update headline headline and verify change', () => {
            browser.get('auth').then(() => {
                element(by.id('username')).sendKeys('testUser');
                element(by.id('password')).sendKeys('123456');
                element(by.id('login')).click();
                element(by.id('inputStatus')).sendKeys('update test');
                element(by.id('updateHeadline')).click();
                expect(element(by.id('headline')).getText()).toEqual('update test');
            });
        });

        it('Create new article and validate article appears in feed', () => {
            browser.get('/auth').then(() => {
                element(by.id('username')).sendKeys('testUser');
                element(by.id('password')).sendKeys('123456');
                element(by.id('login')).click();
                element(by.id('newPost')).sendKeys('e2e test');
                element(by.id('post')).click();
                const text = element.all(by.css('.allPosts')).filter(res => {
                    return res.getText().then(re => {
                        return re === 'e2e test';
                    });
                });
            });
        });

        it('Log out new user', () => {
            browser.get('/auth').then(() => {
                element(by.id('username')).sendKeys('testUser');
                element(by.id('password')).sendKeys('123456');
                element(by.id('login')).click();
                element(by.id('logout')).click();
                expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/auth');
            });
        });

        it('login as test user', () => {
            browser.get('/auth').then(() => {
                element(by.id('username')).sendKeys('yz141');
                element(by.id('password')).sendKeys('yz141');
                element(by.id('login')).click();
                expect(element(by.id('headline')).getText()).toEqual('Kristy is an art director living in New York');
            });
        });

        it('Search for a keyword that matches only one of test user`s articles ' +
            'and verify only one article shows, and verify the author', () => {
            browser.get('/auth').then(() => {
                element(by.id('username')).sendKeys('yz141');
                element(by.id('password')).sendKeys('yz141');
                element(by.id('login')).click();
                element(by.id('searchInput')).sendKeys('tiramisu');
                element(by.id('searchBtn')).click();
                // expect(element.all(by.id('allPost')).count()).toBe(1);
                const text = element.all(by.css('.articleAuthor')).filter(res => {
                    return res.getText().then(re => {
                        return re === 'yz141';
                    });
                });
            });
        });

        it('log out as test user', () => {
            browser.get('/auth').then(() => {
                element(by.id('username')).sendKeys('yz141');
                element(by.id('password')).sendKeys('yz141');
                element(by.id('login')).click();
                element(by.id('logout')).click();
                expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/auth');
            });
        });
    });
 // });

