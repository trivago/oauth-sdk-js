//@flow

//
// Flow types declaration:
type Config = {
    oauthOrigin: string,
    oauthPath: string,
    clientId: string,
    responseType: string,
    redirectUri: string,
    scope: string
}

//
// SDK code starts
import { buildOauthUrl, openPopup } from './util';

/**
 * Oauth initializer
 *
 * @param {string} clientId
 * @param {object} [options]
 * @param {string} [options.scope] - Oauth scope
 * @returns {Object}
 */
export default function(clientId: string, options: Object = {}) {
    if (!clientId) {
        throw new Error('ClientId is not specified.');
    }

    if (typeof clientId !== 'string') {
        throw new Error('ClientId should be a string.');
    }

    // Oauth default options
    let config: Config = {
        oauthOrigin: 'https://accounts.trivago.com',
        oauthPath: '/oauth/v2/check',
        clientId: '',
        responseType: 'token',
        redirectUri: 'postmessage',
        scope: ''
    };

    // Popup options
    const intervalTime: number = 1000;
    const popupWidth: number = 400;
    const popupHeight: number = 764;

    // Overwrite default values
    config.clientId = clientId;
    if (options.scope) {
        if (typeof options.scope !== 'string') {
            throw new Error('Scope should be a string.')
        }
        config.scope = options.scope;
    }

    /**
     * Oauth authorize to open popup window with the login form
     *
     * @returns {Promise}
     */
    const authorize = function(): Promise<*> {
        let oauthWindow = openPopup(buildOauthUrl(config), popupWidth, popupHeight);

        return new Promise((resolve, reject) => {
            window.addEventListener('message', onMessageReceive, false);

            function onMessageReceive(evt) {
                if (evt.origin !== config.oauthOrigin) {
                    return;
                }

                if (evt.data.status === 'success') {
                    resolve(evt.data);
                } else {
                    reject(evt.data);
                }

                clearInterval(timerId);
                window.removeEventListener('message', onMessageReceive, false);
            }

            // Check if user close popup
            let timerId: number = setInterval(function() {
                if (oauthWindow.closed) {
                    reject({
                        status: 'error',
                        error: 'access_denied',
                        error_description: 'User closed popup'
                    });
                    clearInterval(timerId);
                    window.removeEventListener('message', onMessageReceive, false);
                }
            }, intervalTime);
        });
    };

    return {
        authorize
    };
}
