const fetch = require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`

describe('validate functionality of headline', () => {

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

    /*
     * check Get headlines/:users?
     * */
    it('GET /headlines return array with 1 element containing headline for logged in user', (done) => {
        fetch(url('/headlines'), {
            method: 'GET',
            headers: {Cookie: cookie}
        }).then(r => r.json()).then(res => {
            expect(res['headlines'][0].username).toBe('yz141');
            done();
        });
    });

    it('PUT /headline update logged in user headline', (done) => {
        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        myHeader.append('Cookie', cookie);
        fetch(url('/headline'), {
            method: 'PUT',
            body: JSON.stringify({headline: 'update headline'}),
            headers: myHeader
        }).then(r => r.json()).then(res => {
            expect(res['headline']).toBe('update headline');
            done();
        });
    });
});