# whatsapp-zabbix-script

- [English version of the documentation](https://github.com/green-api/whatsapp-zabbix-script/blob/master/README.md).

Полная версия статьи в блоге GREEN-API [доступна по ссылке](https://green-api.com/en/blog/2024/zabbix_notifications_in_whatsapp_for_free/). Видео-версию инструкции вы можете найти [на нашем YouTube канале](https://www.youtube.com/@green-api).

whatsapp-zabbix-script - скрипт для интеграции уведомлений из [Zabbix](https://www.zabbix.com/) в [WhatsApp](https://www.whatsapp.com) с помощью [GREEN-API](https://green-api.com/).

## Подготовка оборудования

Для реализации интеграции потребуется [Zabbix](https://www.zabbix.com/), учетная запись [WhatsApp](https://www.whatsapp.com), привязанная к инстансу GREEN-API и группа [WhatsApp](https://www.whatsapp.com), в случае получения уведомлений в группу.

С подробной инструкцией для регистрации аккаунта В GREEN-API можно ознакомиться [здесь](https://green-api.com/docs/before-start/). Для бесплатного использования воспользуйтесь тарифом "Разработчик".

Для получения сообщений в группу WhatsApp нужно знать ID этой группы. Подробнее об можно узнать из полной версии статьи или из нашей документации.

## Интеграция Zabbix и WhatsApp

Вся настройка производится в веб-интерфейсе [Zabbix](https://www.zabbix.com/):

1. Перейдите во вкладку `Administration` – `Media types`.

2. Нажмите на `Create media type` в правом верхнем углу и создайте способ оповещения с именем `WhatsApp` (`Name` - `WhatsApp`), выберите для него тип `Webhook` (`Type` - `Webhook`). 

3. Добавьте в `Parameters` созданного способа следующие параметры, указанные в формате `Name` : `Value` (если в поле `Value` стоит `-`, то поле остается пустым):

`ApiURL` : `"вставить ApiURL"`

`apiTokenInstance` : `"вставить apiTokenInstance"`

`HTTPProxy` : `-`

`IdInstance` : `"вставить IdInstance"`

`Message` : `{ALERT.MESSAGE}`

`ParseMode` : `-`

`Subject` : `{ALERT.MESSAGE}`

`ChatId` : `"вставить ID чата или идентификатор клиента"`

Значения для `ApiURL`, `apiTokenInstance` и `IdInstance` возьмите из [личного кабинета GREEN-API](https://console.green-api.com/). В `chatId` вставьте ID чата, в который направляются уведомления, либо идентификатор клиента [WhatsApp](https://www.whatsapp.com). Про формирование идентификаторов [WhatsApp](https://www.whatsapp.com) для личного чата или группы можете прочесть в полной версии статьи или в документации.

4. В поле `Script` вставьте приведенный в репозитории скрипт, версия [Zabbix](https://www.zabbix.com/), для которой написан скрипт, указана в его названии. Вы можете внести изменения для используемой вами версии самостоятельно, в соответсвии с [официальной документацией Zabbix](https://www.zabbix.com/documentation/5.0/en/manual/config/items/preprocessing/javascript/javascript_objects).

5. Перейдите во вкладку `Message templates` и добавьте стандартные шаблоны сообщений: `Problem`, `Problem recovery`, `Problem update`, `Discovery`, `Autoregistration`. Текст в `Template` оставьте без изменений, либо отредактируйте на свой вкус.

6. Вкладку `Options` оставьте без изменений. Она содержит настройки обработки оповещений, приведенные в ней параметры будут идентичными для всех типов сообщений.

7. Сохраните созданный способ оповещения `"WhatsApp"`.

## Тестирование работоспособности

Для тестирования созданного способа оповещения вернитесь во вкладкуу `Media types`. Там вы увидите добавленный способ `"WhatsApp"`. Для его тестирования в правой части экрана на строке с данным способом нажмите на `Test`.

Напишите тестовый текст, например, в `Message` поместите `Сообщение о триггере`, а в `Subject` – `Сработал триггер`.

Нажмите на `Test`. Если все было сделано правильно, то в `Response` отображается значение ОК.

Также проверьте было ли доставлено уведомление в чат [WhatsApp](https://www.whatsapp.com).

## Заключение

Благодаря данному способу вы можете бесплатно настроить любые уведомления из [Zabbix](https://www.zabbix.com/) в [WhatsApp](https://www.whatsapp.com) с помощью [GREEN-API](https://green-api.com/), укладываясь в рамки тарифа «Разработчик».

Если у вас возникнут вопросы по работе нашего сервиса или покупке платного тарифа, то вы можете связаться с нами следующими способами: 

[+7-999-333-12-23](tel:+79993331223) для связи по России

[+7-727-312-23-66](tel:+77273122366) для связи по Казахстану
 
[+44-745-803-80-17](tel:+447458038017) наш международный номер

[Почта: support@green-api.com](mailto:support@green-api.com)

[Канал поддержки WhatsApp](https://wa.me/79993331223)

[Канал поддержки Telegram](https://t.me/greenapi_support_ru_bot)
