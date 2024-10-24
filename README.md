# whatsapp-zabbix-script

- [Документация на русском языке](https://github.com/green-api/whatsapp-zabbix-script/blob/master/docs/READMERU.md)[WhatsApp].

whatsapp-zabbix-script - a script for integrating notifications from [Zabbix](https://www.zabbix.com/) into [WhatsApp](https://www.whatsapp.com) using [GREEN-API](https://green-api.com/en). More detailed instructions can be found in [our blog](https://green-api.com/en/blog/2024/zabbix_notifications_in_whatsapp_for_free/).

## Preparing equipment

To implement the integration, you will need [Zabbix](https://www.zabbix.com/), a [WhatsApp](https://www.whatsapp.com) account linked to the GREEN-API instance, and a [WhatsApp](https://www.whatsapp.com) group, in case notifications are received in the group.

Notifications can be sent either to the client's personal [WhatsApp](https://www.whatsapp.com) number, or you can use sending to a [WhatsApp](https://www.whatsapp.com) group to receive notifications for all responsible employees.

You can create a group on your mobile device or using the [CreateGroup](https://green-api.com/en/docs/api/groups/CreateGroup/) method. We recommend creating a group using this method, since the response body will immediately indicate the `chatId` of the new group, which will be required later when creating the integration.

## Setting up GREEN-API

Detailed instructions for registration can be found [here](https://green-api.com/en/docs/before-start/). For free use, use the "Developer" tariff.

## Webhook Endpoint Technology

To receive notifications, we use Webhook Endpoint technology. To debug incoming notifications, you will need a [test site webhook.site](https://webhook.site/) (or similar) to receive them. Configuring the receipt of incoming notifications is performed in the [Console](https://console.green-api.com/auth). In the instance settings, we specify the received URL for sending notifications (webhookUrl), and also enable the switches `Receive notifications about incoming messages and files` and `Receive notifications about messages sent from the phone`.

To receive messages in the [WhatsApp](https://www.whatsapp.com) group, you need to know the ID of this group. If the group was created using the `CreateGroup` method in the Console, then the response body contains a string with a chat ID of the form `"chatId": 11XXXXXXXXXX6561@g.us"`.

If you need to use one of the existing groups for notifications, you can find out the necessary chat ID by calling the [GetContacts](https://green-api.com/en/docs/api/service/GetContacts/) method, which is designed to get a list of contacts for the current account.

In addition, [you can find out](https://www.youtube.com/watch?v=oNA_-fvGGR0) the chat ID using the same [webhook.site](https://webhook.site/) by writing a message to the group.

## Integration of Zabbix and WhatsApp

All configuration is done inside the [Zabbix](https://www.zabbix.com/) web interface:

1. Go to the `Administration` tab – `Media types`.

2. In the upper right corner, click on `Create media type` and create a notification method, which we will call `WhatsApp` (`Name` - `WhatsApp`) and select the `Webhook` type (`Type` - `Webhook`).

3. Add the following parameters to the Parameters of the created method, specified in the format `Name` : `Value` (if the `Value` field contains `-`, the field remains empty):

`ApiURL` : `"insert ApiURL"`

`apiTokenInstance` : `"insert apiTokenInstance"`

`HTTPProxy` : `-`

`IdInstance` : `"insert IdInstance"`

`Message` : `{ALERT.MESSAGE}`

`ParseMode` : `-`

`Subject` : `{ALERT.MESSAGE}`

`ChatId` : `"insert chat ID or client ID"`

The values ​​for `ApiURL`, `apiTokenInstance` and `IdInstance` are taken from the [GREEN-API console](https://console.green-api.com/). In `chatId` we insert the ID of the chat to which we are sending notifications, or the [WhatsApp](https://www.whatsapp.com) client ID.

According to the [WhatsApp](https://www.whatsapp.com) identifier system, the identifier for a personal chat is generated using the template `00000000000@c.us`, where the recipient's phone number is inserted instead of the zeros `00000000000`. The phone number is indicated in full, with the country code and without spaces.
The group chat ID is a string like `XXXXXXXXXX-XXXXXXXXXX@g.us` or `XXXXXXXXXXXXXXXXX@g.us`, where the `XXXXXXXXXXXXXXXXX` characters are replaced by the chat ID.

4. In the `Script` field, insert the script provided in the repository corresponding to the version of [Zabbix](https://www.zabbix.com/) used.

5. Next, go to the `Message templates` tab and add standard message templates: `Problem`, `Problem recovery`, `Problem update`, `Discovery`, `Autoregistration`. The text in `Template` can be left unchanged, or edited to your taste.

6. The `Options` tab can be left unchanged. It contains notification processing settings. The parameters provided there will be identical for all message types.

7. Save the created `"WhatsApp"` notification method.

## Testing the script

To test the created notification method, go back to the `Media types` tab and see the added `"WhatsApp"` method. You can test it by clicking `Test` on the right side of the screen on the line with this method.

As an example, in the `Message` value, we will put `Trigger message`, and in `Subject` – `Trigger fired`.

If everything was done correctly, then after clicking `Test`, the `Response` value will display OK.

You should also check whether the notification was delivered to the chat (or client) [WhatsApp](https://www.whatsapp.com).

## Additionally

This method allows you to set up any notifications from [Zabbix](https://www.zabbix.com/) to [WhatsApp](https://www.whatsapp.com) for free using [GREEN-API](https://green-api.com/en), within the framework of the "Developer" tariff.

If you have any questions about our service or purchasing a paid plan, or you have noticed an error in the SDK, you can contact us in the following ways:

[+7-999-333-12-23](tel:+79993331223) for communication in Russia

[+7-727-312-23-66](tel:+77273122366) for communication in Kazakhstan

[+44-745-803-80-17](tel:+447458038017) our international number

[E-Mail: support@green-api.com](mailto:support@green-api.com)

[Support channel WhatsApp](https://wa.me/79993331223)

