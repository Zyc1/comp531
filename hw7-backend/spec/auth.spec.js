const fetch = require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`

describe('validate functionality of login/register', () => {
    it('POST /login log in user', (done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: 'yz141', password: 'yz141'})
        }).then(r => r.json()).then(res => {
            expect(res.username == 'yz141' && res.result == 'success').toBe(true);
            done();
        }).catch((err) => console.log(err));
    });

    it('POST /register register new user', (done) => {
        fetch(url('/register'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: 'testUser',
                password: '123456',
                email: 'test@rice.com',
                tel: '123-456-7896',
                dob:'1999-10-31',
                zipcode: '12345',
            })
        }).then(r => r.json()).then(res => {
            expect(res['result']).toBe('success');
            done()
        })
    });
});

describe('validate functionality of logout', () => {

    beforeEach((done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: 'yz141', password: 'yz141'})
        }).then(r => r.json()).then((res) => {
            cookie = 'sid=' + res['sid'];
            done();
        });
    });

    it('PUT /logout log out current logged in user', (done) => {
        fetch(url('/logout'), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', Cookie: cookie}
        }).then(r => r.json()).then(res => {
            expect(res['result']).toBe('OK');
            done()
        })
    })
});