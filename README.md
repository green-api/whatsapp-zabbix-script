# whatsapp-zabbix-script
This script will look at the integration of the [Zabbix](https://www.zabbix.com/) monitoring system with [WhatsApp](https://www.whatsapp.com) messenger using [GREEN-API](https://green-api.com/en) service.

Integration setup takes place inside [Zabbix](https://www.zabbix.com/) web interface shell.

In [Zabbix](https://www.zabbix.com/) web interface, go to `Administration` – `Media types`.

In the upper right corner, click on `Create media type`. Create a notification method called `WhatsApp`, containing the following parameters (all parameters that do not have values ​​are left blank):

Name : WhatsApp

Type: Webhook

Parameters:

ApiURL: 

apiTokenInstance:

HTTPProxy:

IdInstance:

Message: {ALERT.MESSAGE}

ParseMode:

Subject: {ALERT.MESSAGE}

ChatId:

You will find the values ​​for the required parameters in your console of GREEN-API.

Next, you need to go to the Message templates tab and add the following standard message templates, which you can change to suit your taste if you wish.

A message template is a pre-prepared message text that will be used when sending. Dynamic variables selected in templates are changed to the current ones at the time of sending.

The Options tab is left unchanged. This tab contains notification processing settings. These parameters will be identical for all message types. More details can be found in the [Zabbix documentation](https://www.zabbix.com/documentation/5.0/en/manual/config/notifications/media).

Now you need to test the created notification method. When you return to Media types, you can see the previously added WhatsApp method. On the right side of the screen, on the line with the selected method, you need to click Test.

As an example, let's put Trigger message in the Message value, and Trigger fired in the Subject value.

If everything is done correctly, then after clicking on Test, the value OK will be displayed in Response.

Using this method, you can set up any notifications from [Zabbix](https://www.zabbix.com/) to WhatsApp for free using GREEN-API, within the framework of the "Developer" plan.