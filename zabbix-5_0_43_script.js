var WhatsApp= {
    // Parameters
    ApiURL: null,
    IdInstance: null,
    apiTokenInstance: null,
    chatId: null,
    message: null,
    parse_mode: null, 
    // Function for escaping special characters depending on the selected markup format
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
    // Function for sending a message to WhatsApp
    sendMessage: function () {
        // API request parameters
        var params = {
            chatId: WhatsApp.chatId,
            message: WhatsApp.message,
            linkPreview: false
        },
        data,
        response,
        request = new CurlHttpRequest(),
        // Object for sending HTTP requests
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
        // Parses the API response into a JSON object
        try {
            response = JSON.parse(response);
        }
        catch (error) {
            response = null;
        }
        // Check if the message was sent successfully
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
// Processes input parameters
try {
    // Parses a JSON string with input parameters
    var params = JSON.parse(value);
    // Check for required parameters
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
    // Checking the correctness of the chat ID
    if (params.chatId.includes('@c.us') || params.chatId.includes('@g.us')) {
        WhatsApp.chatId = params.chatId;
    } else {
        throw 'Incorrect value is given for parameter "chatId": parameter is not ended with "@c.us" or "@g.us"';
    }
    // Initializes the message
    WhatsApp.message = '';
    // Adds a topic if one is set
    if (params.Subject.length > 0) {
        WhatsApp.message += (params.Subject + '\n');
    }
    // Adds a message
    WhatsApp.message += params.Message;
    if (['markdown', 'html', 'markdownv2'].indexOf(params.ParseMode) !== -1) {
        WhatsApp.message = WhatsApp.escapeMarkup(WhatsApp.message, params.ParseMode);
    }
    // Sends a message to WhatsApp
    WhatsApp.sendMessage();
    // Returns OK if sending was successful
    return 'OK';
}
catch (error) {
    Zabbix.Log(4, '[WhatsApp Webhook] notification failed: ' + error);
    // Shows error with error message
    throw 'Sending failed: ' + error + '.';
}