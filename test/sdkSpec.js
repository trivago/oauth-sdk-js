import { assert, expect } from 'chai';
import init from '../lib/trv.sdk';
import { buildOauthUrl } from '../lib/util';

//
// mocks
global.window = {
    screenLeft: 0,
    screenTop: 0,
    open() {},
    addEventListener() {}
};

global.document = {
    documentElement: {
        clientWidth: 1920,
        clientHeight: 1080
    }
};

let configNoScope = {
    oauthOrigin: 'https://accounts.trivago.com',
    oauthPath: '/oauth/v2/auth',
    clientId: '123',
    responseType: 'token',
    redirectUri: 'postmessage', // default value if not specified by client
    scope: ''
};

let configWithScope = Object.assign({}, configNoScope, { scope: 'name,email'});


//
// Tests
describe('util: buildOauthUrl()', () => {
    it('without scope: should return a concatenated string', () => {
        assert.equal(
            buildOauthUrl(configNoScope),
            'https://accounts.trivago.com/oauth/v2/auth?client_id=123&redirect_uri=postmessage&response_type=token'
        );
    });

    it('with scope: should return a concatenated string', () => {
        assert.equal(
            buildOauthUrl(configWithScope),
            'https://accounts.trivago.com/oauth/v2/auth?client_id=123&redirect_uri=postmessage&response_type=token&scope=name,email'
        );
    });
});

describe('init()', () => {
    it('should throw an error if no clientId was passed', () => {
        expect(init).to.throw(Error, 'ClientId is not specified.');
    });

    it('should throw an error if integer was passed as clientId', () => {
        expect(() => init(123)).to.throw(Error, 'ClientId should be a string.');
    });

    it('should return an object with authorize method', () => {
        const sdk = init('123');

        expect(sdk).to.be.an('object');
        expect(sdk).to.include.keys('authorize');
    });
});

describe('authorize()', () => {
    it('should return a promise', () => {
        const sdk = init('123');

        expect(sdk.authorize()).to.be.a('promise');
    });
});