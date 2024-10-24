# whatsapp-zabbix-script

- [English version of the documentation](https://github.com/green-api/whatsapp-zabbix-script/blob/master/README.md)[WhatsApp]{:target="_blank"}.

whatsapp-zabbix-script - скрипт для интеграции уведомлений из [Zabbix](https://www.zabbix.com/){:target="_blank"} в [WhatsApp](https://www.whatsapp.com){:target="_blank"} с помощью [GREEN-API](https://green-api.com/){:target="_blank"}. Более подробную инструкцию можно найти в [нашем блоге](https://green-api.com/en/blog/2024/zabbix_notifications_in_whatsapp_for_free/){:target="_blank"}.

## Подготовка оборудования

Для реализации интеграции потребуется [Zabbix](https://www.zabbix.com/){:target="_blank"}, учетная запись [WhatsApp](https://www.whatsapp.com){:target="_blank"}, привязанная к инстансу GREEN-API и группа [WhatsApp](https://www.whatsapp.com){:target="_blank"}, в случае получения уведомлений в группу.

Отправлять уведомления можно либо на личный номер клиента [WhatsApp](https://www.whatsapp.com){:target="_blank"}, либо воспользоваться отправкой в группу [WhatsApp](https://www.whatsapp.com){:target="_blank"} для получения уведомлений всеми ответственными работниками.

Группу можно создать на вашем мобильном устройстве или помощью метода [CreateGroup](https://green-api.com/docs/api/groups/CreateGroup/){:target="_blank"}. Рекомендуем создавать группу именно через данный метод, поскольку в теле ответа сразу будет указан `chatId` новой группы, который будет требоваться далее при создании интеграции.

## Настройка GREEN-API

С подробной инструкцией для регистрации можно ознакомиться [здесь](https://green-api.com/docs/before-start/){:target="_blank"}. Для бесплатного использования воспользуйтесь тарифом "Разработчик".

## Технология Webhook Endpoint

Для получения уведомлений используется технология Webhook Endpoint. Для отладки входящих уведомлений понадобится [тестовый сайт webhook.site](https://webhook.site/){:target="_blank"} (или аналогичный) для их получения. Настройка получения входящих уведомлений выполняется в [Личном кабинете](https://console.green-api.com/auth){:target="_blank"}. В настройках инстанса указываем полученный адрес отправки уведомлений URL (webhookUrl), а также включаем переключатели `Получать уведомления о входящих сообщениях и файлах` и `Получать уведомления о сообщениях, отправленных с телефона`.

Для получения сообщений в группу [WhatsApp](https://www.whatsapp.com){:target="_blank"} нужно знать ID этой группы. В случае, если группу создали методом `CreateGroup` в личном кабинете, то в теле ответа получена строка с идентификатором чата вида `"chatId": 11XXXXXXXXXX6561@g.us"`.

Если же для уведомлений нужно использовать одну из уже имеющихся групп, то можно узнать необходимый идентификатор чата вызвав метод [GetContacts](https://green-api.com/docs/api/service/GetContacts/){:target="_blank"}, который предназначен для получения списка контактов текущего аккаунта.

Кроме этого, [можно узнать](https://www.youtube.com/watch?v=huHLZIlyW9w){:target="_blank"} идентификатор чата с помощью того же [webhook.site](https://webhook.site/){:target="_blank"}, написав сообщение в группу. 

## Интеграция Zabbix и WhatsApp

Вся найтройка происходит внутри веб-интерфейса [Zabbix](https://www.zabbix.com/){:target="_blank"}:
1. Перейдем во вкладку `Administration` – `Media types`.
2. В правом верхнем углу нажмем на `Create media type` и создадим способ оповещения, который назовем `WhatsApp` (`Name` - `WhatsApp`) и выберем тип `Webhook` (`Type` - `Webhook`). 

3. Добавим в Parameters созданного способа следующие параметры, указанные в формате `Name` : `Value` (если в поле `Value` стоит `-`, то поле остается пустым):

`ApiURL` : `"вставить ApiURL"`

`apiTokenInstance` : `"вставить apiTokenInstance"`

`HTTPProxy` : `-`

`IdInstance` : `"вставить IdInstance"`

`Message` : `{ALERT.MESSAGE}`

`ParseMode` : `-`

`Subject` : `{ALERT.MESSAGE}`

`ChatId` : `"вставить ID чата или идентификатор клиента"`

Значения для `ApiURL`, `apiTokenInstance` и `IdInstance` берем из [личного кабинета GREEN-API](https://console.green-api.com/){:target="_blank"}. В `chatId` вставим ID чата, в который направляем уведомления, либо идентификатор клиента [WhatsApp](https://www.whatsapp.com){:target="_blank"}.

Согласно системе идентификаторов [WhatsApp](https://www.whatsapp.com){:target="_blank"}, для личного чата идентификатор формируется по шаблону `00000000000@c.us`, где вместо нулей `00000000000` вставляется номер телефона получателя. Телефон указывают полностью, с кодом страны и без пробелов.
Идентификатор группового чата представляет собой строку вида `XXXXXXXXXX-XXXXXXXXXX@g.us` или `XXXXXXXXXXXXXXXXX@g.us`, где вместо символов `XXXXXXXXXXXXXXXXX` вставляется ID чата.

4. В поле `Script` вставляется приведенный в репозитории скрипт, соответсвующей используемой версии [Zabbix](https://www.zabbix.com/){:target="_blank"}.

5. Далее перейдем во вкладку `Message templates` и добавим стандартные шаблоны сообщений: `Problem`, `Problem recovery`, `Problem update`, `Discovery`, `Autoregistration`. Текст в `Template` можно оставить без изменений, либо отредактировать на свой вкус.

6. Вкладку `Options` можно оставить без изменений. Она содержит настройки обработки оповещений. Приведенные в ней параметры будут идентичными для всех типов сообщений.

7. Сохраняем созданный способ оповещения `"WhatsApp"`.

## Тестирование работоспособности

Для тестирования созданного способа оповещения вернемся во вкладкуу `Media types` и увидим в ней добавленный способ `"WhatsApp"`. Протестировать его можно нажав в правой части экрана на строке с данным способом на `Test`.

В качестве примера в значение `Message` поместим `Сообщение о триггере`, а в `Subject` – `Сработал триггер`.

Если все было сделано правильно, то после нажатия на `Test`, в `Response` отображается значение ОК.

Также следует проверить было ли доставлено уведомление в чат (либо клиенту) [WhatsApp](https://www.whatsapp.com){:target="_blank"}.

## Заключение

Благодаря данному способу можно бесплатно настроить любые уведомления из [Zabbix](https://www.zabbix.com/){:target="_blank"} в [WhatsApp](https://www.whatsapp.com){:target="_blank"} с помощью [GREEN-API](https://green-api.com/){:target="_blank"}, укладываясь в рамки тарифа «Разработчик».

Если у вас возникнут вопросы по работе нашего сервиса или покупке платного тарифа, либо вы заметили ошибку в SDK, то вы можете связаться с нами следующими способами: 

[+7-999-333-12-23](tel:+79993331223){:target="_blank"} для связи по России

[+7-727-312-23-66](tel:+77273122366){:target="_blank"} для связи по Казахстану
 
[+44-745-803-80-17](tel:+447458038017){:target="_blank"} наш международный номер

[Почта: support@green-api.com](mailto:support@green-api.com){:target="_blank"}

[Канал поддержки WhatsApp](https://wa.me/79993331223){:target="_blank"}

[Канал поддержки Telegram](https://t.me/greenapi_support_ru_bot){:target="_blank"}
