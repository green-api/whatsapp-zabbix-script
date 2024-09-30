var WhatsApp= {
    ApiURL: null,
    IdInstance: null,
    apiTokenInstance: null,
    chatId: null,
    message: null,
    parse_mode: null, 
    escapeMarkup: function (str, mode) {
        switch (mode) {
            case 'markdown':
                return str.replace(/([_*\[`])/g, '\\$&');
            case 'markdownv2':
                return str.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$&');
            case 'html':
                return str.replace(/<(\s|[^a-z\/])/g, '&lt;$1');
            default:
                return str;
        }
    },
    sendMessage: function () {
        var params = {
            chatId: WhatsApp.chatId,
            message: WhatsApp.message,
            linkPreview: false
        },
        data,
        response,
        request = new CurlHttpRequest(),
        url = WhatsApp.ApiURL + '/waInstance' + WhatsApp.IdInstance + '/sendMessage/' + WhatsApp.apiTokenInstance;
        Zabbix.Log(4, url);
        if (WhatsApp.parse_mode !== null) {
            params['parse_mode'] = WhatsApp.parse_mode;
        }
        if (WhatsApp.proxy) {
            request.SetProxy(WhatsApp.proxy);
        }
        request.AddHeader('Content-Type: application/json');
        data = JSON.stringify(params);
        Zabbix.Log(4, '[WhatsApp Webhook] params: ' + data);
        response = request.Post(url, data);
        Zabbix.Log(4, '[WhatsApp Webhook] HTTP code: ' + request.Status());
        try {
            response = JSON.parse(response);
        }
        catch (error) {
            response = null;
        }
        if (request.Status() !== 200) {
            if (typeof response.description === 'string') {
                throw response.description;
            }
            else {
                throw 'Unknown error. Check debug log for more information.';
            }
        }
    }
};
try {
    var params = JSON.parse(value);

    if (typeof params.ApiURL === 'undefined') {
        throw 'Incorrect value is given for parameter "ApiURL": parameter is missing';
    }
    WhatsApp.ApiURL = params.ApiURL;

    if (typeof params.IdInstance === 'undefined') {
        throw 'Incorrect value is given for parameter "IdInstance": parameter is missing';
    }
    WhatsApp.IdInstance = params.IdInstance;

    if (typeof params.apiTokenInstance === 'undefined') {
        throw 'Incorrect value is given for parameter "apiTokenInstance": parameter is missing';
    }
    WhatsApp.apiTokenInstance = params.apiTokenInstance;

    if (params.HTTPProxy) {
        WhatsApp.proxy = params.HTTPProxy;
    } 
    params.ParseMode = params.ParseMode.toLowerCase();
    
    if (['markdown', 'html', 'markdownv2'].indexOf(params.ParseMode) !== -1) {
        WhatsApp.parse_mode = params.ParseMode;
    }

    if (params.To.includes('@c.us') || params.chatId.includes('@g.us')) {
        WhatsApp.chatId = params.chatId;
    } else {
        throw 'Incorrect value is given for parameter "chatId": parameter is not ended with "@c.us" or "@g.us"';
    }
    
    WhatsApp.message = '';
    if (params.Subject.length > 0) {
        WhatsApp.message += (params.Subject + '\n');
    }
    WhatsApp.message += params.Message;
    if (['markdown', 'html', 'markdownv2'].indexOf(params.ParseMode) !== -1) {
        WhatsApp.message = WhatsApp.escapeMarkup(WhatsApp.message, params.ParseMode);
    }
    WhatsApp.sendMessage();
    return 'OK';
}
catch (error) {
    Zabbix.Log(4, '[WhatsApp Webhook] notification failed: ' + error);
    throw 'Sending failed: ' + error + '.';
}