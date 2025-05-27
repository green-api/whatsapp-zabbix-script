/*global Zabbix, HttpRequest, value */
/* jshint undef: false */

var WhatsApp = {
    // Parameters
    ApiURL: null,
    IdInstance: null,
    apiTokenInstance: null,
    chatId: null,
    message: null,
    parse_mode: null,
    proxy: null,

    // Function for escaping special characters depending on the markup format
    escapemarkup: function(str, mode) {
        switch (mode) {
            case 'markdown':
                return str.replace(/([_*$$`])/g, '\\$&');
            case 'markdownv2':
                return str.replace(/([_*$\[\]()~`>#+\-=|{}.!])/g, '\\$&');
            case 'html':
                return str.replace(/<(\s|[^a-z\/])/g, '<$1');
            default:
                return str;
        }
    },

    // Send message to WhatsApp
    sendmessage: function() {
        var url = this.ApiURL + '/waInstance' + this.IdInstance + '/sendmessage/' + this.apiTokenInstance;
        Zabbix.Log(4, '[WhatsApp Webhook] Sending to: ' + url);

        var payload = {
            chatId: this.chatId,
            message: this.message,
            linkPreview: false
        };

        if (this.parse_mode) {
            payload.parse_mode = this.parse_mode;
        }

        var request = new HttpRequest();
        if (this.proxy) {
            request.SetProxy(this.proxy);
        }

        request.addHeader('Content-Type: application/json');
        var data = JSON.stringify(payload);
        Zabbix.Log(4, '[WhatsApp Webhook] Payload: ' + data);

        var rawResponse = request.post(url, data);
        var status = request.getStatus();
        Zabbix.Log(4, '[WhatsApp Webhook] HTTP status: ' + status);

        try {
            var response = JSON.parse(rawResponse);
            if (status !== 200) {
                throw response.description || 'Unknown error';
            }
        } catch (e) {
            throw 'Failed to parse response: ' + rawResponse;
        }
    }
};

// Main logic
try {
    if (typeof value === 'undefined') {
        throw 'Input value is undefined';
    }

    var params = JSON.parse(value);

    // Validate required parameters
    var requiredParams = ['ApiURL', 'IdInstance', 'apiTokenInstance', 'chatId', 'Message'];
    for (var i = 0; i < requiredParams.length; i++) {
        var param = requiredParams[i];
        if (!params[param]) {
            throw 'Missing required parameter: ' + param;
        }
    }

    WhatsApp.ApiURL = params.ApiURL;
    WhatsApp.IdInstance = params.IdInstance;
    WhatsApp.apiTokenInstance = params.apiTokenInstance;

    if (!params.chatId.endsWith('@c.us') && !params.chatId.endsWith('@g.us')) {
        throw 'chatId must end with @c.us or @g.us';
    }
    WhatsApp.chatId = params.chatId;

    // Optional parameters
    WhatsApp.proxy = params.HTTPProxy || null;

    var validParseModes = ['markdown', 'html', 'markdownv2'];
    if (params.ParseMode) {
        var mode = params.ParseMode.toLowerCase();
        if (validParseModes.indexOf(mode) !== -1) {
            WhatsApp.parse_mode = mode;
        } else {
            throw 'Invalid parse_mode: ' + mode + '. Valid: ' + validParseModes.join(', ');
        }
    }

    // Build message
    WhatsApp.message = '';

    if (params.Subject && typeof params.Subject === 'string' && params.Subject.trim()) {
        WhatsApp.message += params.Subject + '\n';
    }

    if (typeof params.Message !== 'string' || !params.Message.trim()) {
        throw 'Invalid or empty Message';
    }

    WhatsApp.message += params.Message;

    if (WhatsApp.parse_mode) {
        WhatsApp.message = WhatsApp.escapemarkup(WhatsApp.message, WhatsApp.parse_mode);
    }

    // Send message
    WhatsApp.sendmessage();
    return 'OK';

} catch (error) {
    Zabbix.Log(4, '[WhatsApp Webhook] Error: ' + error);
    throw 'Sending failed: ' + error;
}
