# whatsapp-zabbix-script

- [Документация на русском языке](https://github.com/green-api/whatsapp-zabbix-script/blob/master/docs/READMERU.md).

Full version of the article on the GREEN-API blog [available at the link](https://green-api.com/en/blog/2024/zabbix_notifications_in_whatsapp_for_free/). You can find a video version of the instructions [on our YouTube channel](https://www.youtube.com/@greenapi-en).

whatsapp-zabbix-script - a script for integrating notifications from [Zabbix](https://www.zabbix.com/) into [WhatsApp](https://www.whatsapp.com) using [GREEN-API](https://green-api.com/en).

## Preparing equipment

To implement the integration, you will need [Zabbix](https://www.zabbix.com/), a [WhatsApp](https://www.whatsapp.com) account linked to the GREEN-API instance, and a [WhatsApp](https://www.whatsapp.com) group, in case notifications are received in the group.

Detailed instructions for registering an account in GREEN-API can be found [here](https://green-api.com/en/docs/before-start/). For free use, use the "Developer" tariff.

To receive messages in a WhatsApp group, you need to know the ID of this group. You can learn more about it from the full version of the article or from our documentation.

## Integration of Zabbix and WhatsApp

All configuration is done in the [Zabbix](https://www.zabbix.com/) web interface:

1. Go to the `Administration` – `Media types` tab.

2. Click on `Create media type` in the upper right corner and create a notification method named `WhatsApp` (`Name` - `WhatsApp`), select the `Webhook` type for it (`Type` - `Webhook`).

3. Add the following parameters to the Parameters of the created method, specified in the format `Name` : `Value` (if the `Value` field contains `-`, the field remains empty):

`ApiURL` : `"insert ApiURL"`

`apiTokenInstance` : `"insert apiTokenInstance"`

`HTTPProxy` : `-`

`IdInstance` : `"insert IdInstance"`

`Message` : `{ALERT.MESSAGE}`

`ParseMode` : `-`

`Subject` : `{ALERT.MESSAGE}`

`ChatId` : `"insert chat ID or client ID"`

The values ​​for `ApiURL`, `apiTokenInstance` and `IdInstance` are taken from the [GREEN-API console](https://console.green-api.com/). In `chatId` we insert the ID of the chat to which we are sending notifications, or the [WhatsApp](https://www.whatsapp.com) client ID. You can read about generating [WhatsApp](https://www.whatsapp.com) identifiers for a personal chat or group in the full version of the article or in the documentation.

4. In the `Script` field, paste the script provided in the repository, the [Zabbix](https://www.zabbix.com/) version for which the script is written is indicated in its name. You can make changes for the version you are using yourself, in accordance with the [official Zabbix documentation](https://www.zabbix.com/documentation/5.0/en/manual/config/items/preprocessing/javascript/javascript_objects).

5. Next, go to the `Message templates` tab and add standard message templates: `Problem`, `Problem recovery`, `Problem update`, `Discovery`, `Autoregistration`. The text in `Template` can be left unchanged, or edited to your taste.

6. The `Options` tab can be left unchanged. It contains notification processing settings. The parameters provided there will be identical for all message types.

7. Save the created `"WhatsApp"` notification method.

## Testing the script

To test the created notification method, go back to the `Media types` tab and see the added `"WhatsApp"` method. You can test it by clicking `Test` on the right side of the screen on the line with this method.

As an example, in the `Message` value, we will put `Trigger message`, and in `Subject` – `Trigger fired`.

If everything was done correctly, then after clicking `Test`, the `Response` value will display OK.

You should also check whether the notification was delivered to the chat [WhatsApp](https://www.whatsapp.com).

## Additionally

This method allows you to set up any notifications from [Zabbix](https://www.zabbix.com/) to [WhatsApp](https://www.whatsapp.com) for free using [GREEN-API](https://green-api.com/en), within the framework of the "Developer" plan.

If you have any questions about our service or purchasing a paid plan, you can contact us in the following ways:

[+7-999-333-12-23](tel:+79993331223) for communication in Russia

[+7-727-312-23-66](tel:+77273122366) for communication in Kazakhstan

[+44-745-803-80-17](tel:+447458038017) our international number

[E-Mail: support@green-api.com](mailto:support@green-api.com)

[Support channel WhatsApp](https://wa.me/79993331223)
