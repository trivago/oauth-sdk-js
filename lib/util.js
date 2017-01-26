//@flow

/**
 * Url builder for a given options object
 *
 * @param {Object} options
 * @returns {string}
 */
const buildOauthUrl = function buildOauthUrl(options: Object): string {
    let arr = [
        options.oauthOrigin,
        options.oauthPath,
        '?client_id=',
        options.clientId,
        '&redirect_uri=',
        options.redirectUri,
        '&response_type=',
        options.responseType
    ];

    if (options.scope !== '') {
        arr.push('&scope=' + options.scope);
    }

    return arr.join('');
};

/**
 * Convenient method to open a popup in the middle of a screen
 *
 * @param {string} url
 * @param {int} w - Width of popup
 * @param {int} h - Height of popup
 * @returns {Object}
 */
const openPopup = function openPopup(url: string, w: number, h: number): Object {
    // Fixes dual-screen position                         Most browsers      Firefox
    const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    let oauthWindow = window.open(url, 'oauthTrivago', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        oauthWindow.focus();
    }

    return oauthWindow;
};

export {
    buildOauthUrl,
    openPopup
}