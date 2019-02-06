const fetch = require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('validate functionality of articles', (done) => {
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

    it('GET /articles/id where id is valid', (done) => {
        fetch(url('/articles/yz141'), {
            method: 'GET',
            headers: {Cookie: cookie},
        }).then(r => r.json()).then(res => {
            expect(res['articles'].length).toBe(2);
            done();
        });
    });

    it('GET /articles/id where id is a invalid', (done) => {
        fetch(url('/articles/mh'), {
            method: 'GET',
            headers: {Cookie: cookie},
        }).then(r => r.json()).then(res => {
            expect(res['result']).toBe('Unable to get articles');
            done();
        });
    });

    it('should return all feeds of logged in user', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: {Cookie: cookie},
        }).then(r => r.json()).then(res => {
            console.log('articles length:'+ res['articles'].length);
            expect(res['articles'].length > 5).toBe(true);
            done();
        });
    });

    it('POST /article (adding an article for logged in user returns list of articles with new article, validate list increased by one and contents of the new article)', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: {Cookie: cookie},
        }).then(r => r.json()).then(res => {
            initialLen = res['articles'].length;
            fetch(url('/article'), {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Cookie: cookie},
                body: JSON.stringify({text: 'unit test'})
            }).then(r => r.json()).then(re => {
                const newArticles = re['articles'];
                let flag = false;
                for(let i = 0 ; i < newArticles.length ; i++){
                    if(newArticles[i].text == 'unit test') {
                        flag = true;
                        break;
                    }
                }
                fetch(url('/articles'), {
                    method: 'GET',
                    headers: {Cookie: cookie},
                }).then(r => r.json()).then(r => {
                    newLen = r['articles'].length;
                    expect(newLen - initialLen).toBe(1);
                    expect(flag).toBe(true);
                    done();
                });
            });
        });

    });
});
