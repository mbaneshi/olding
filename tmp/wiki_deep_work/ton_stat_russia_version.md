
[https://www.tonstat.com/ TonStat] — инструмент для анализа блокчейна [[Telegram Open Network|TON]], с помощью которого пользователи могут открыто наблюдать за основными метриками сети.

TonStat отслеживает количество зарегистрированных сетевых адресов и [[Кошельки TON|кошельков]], объём сожжённых и застейканных [https://ton.org/ru/toncoin Toncoin], объём выпущенных NFT, количество [[Валидатор|валидаторов]] и ряд других показателей.
[[Файл:Главная страница.png|без|мини|800x800пкс|Главная страница]]

=[https://www.tonstat.com/#toncoin Toncoin и данные блокчейна TON]=

===Общий объём TON===
Показатель общего предложения ([https://coinmarketcap.com/academy/ru/glossary/total-supply Total Supply]) отражает, сколько монет TON существует в настоящее время. Этот показатель рассчитывается при суммировании остатков токенов на всех счетах.
[[Файл:Показатель Total Supply.png|без|мини|800x800пкс|Показатель Total Supply]]

===Комиссии===

====Почему существуют [[Transaction Fees|транзакционные комиссии]]?====

1. Экономика сети: транзакционные комиссии вознаграждают участников сети, таких как валидаторы, за поддержку и обслуживание блокчейна The Open Network.

2. Безопасность: комиссии помогают предотвратить перегрузку сети или атаки со стороны злоумышленников.

3. Спам: комиссии предотвращают массовое создание бесполезных транзакций, что улучшает работу сети.

====Значимость стоимости комиссии====
Текущая комиссия за транзакцию составляет около 0.005 TON. Даже при значительном росте стоимости TON, комиссии останутся низкими, менее $0.01. Валидаторы могут корректировать комиссии, если они станут слишком высокими.

====Комиссии за различные операции:====

*Отправка TON: средняя комиссия составляет 0.0055 TON.
*Отправка [[TON Jettons|Jettons]]: средняя комиссия составляет 0.037 TON.
*Создание [https://coinmarketcap.com/academy/ru/glossary/non-fungible-token NFT]: средняя комиссия составляет 0.08 TON.

Комиссии за хранение взимаются за каждую секунду хранения смарт-контракта в блокчейне. Они зависят от количества ячеек и битов в контракте, и это довольно дешево:

*[https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D0%B4%D1%83%D0%BF%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F Дедупликация] — позволяет избежать дублирования и сократить требуемое пространство.
*Оптимизация алгоритмов —- минимизирует вычислительные затраты

Комиссии за транзакции и хранение данных, оплачиваемые пользователями ежедневно.
[[Файл:Показатель Transaction Fees.png|без|мини|800x800пкс|Показатель Transaction Fees]]

===Сжигание Toncoins===
[https://coinmarketcap.com/academy/ru/glossary/burned Сжигание монет] — это процесс уничтожения части токенов для уменьшения общего доступного предложения. Токены переводятся на неактивный кошелёк с неизвестным приватным ключом, делая их недоступными навсегда. Сжигание может быть периодическим (ежеквартально, раз в полгода) или реальным (автоматическое сжигание с каждой транзакцией или блоком).

В TON используется механизм реального сжигания, уничтожающий 50% комиссий, уплаченных за транзакции в каждом блоке. Это снижает общее и циркулирующее предложение, способствуя устойчивому долгосрочному росту экосистемы TON.

====Влияние сжигания на держателей TON====
Реальное сжигание не требует действий от пользователей и не влияет на владения напрямую. Уменьшение предложения со временем должно благоприятно сказаться на держателях TON, хотя это также зависит от использования Toncoin и рыночного спроса.
[[Файл:Показатель Toncoins burned per day.png|без|мини|800x800пкс|Показатель Toncoins burned per day]]

===Новые созданные Toncoin===
[[История майнинга TON|Майнинг Toncoin]], завершившийся в июне 2022 года, заменил традиционный [https://coinmarketcap.com/academy/ru/glossary/proof-of-work-pow Proof-of-Work] на [https://coinmarketcap.com/academy/ru/glossary/proof-of-stake-pos Proof-of-Stake], внедрив уникальный подход IPoW (Initial Proof-of-Work) для начального распределения монет.

Валидаторы теперь зарабатывают Toncoin в качестве вознаграждения, с каждым блоком [https://docs.ton.org/develop/blockchain/shards#masterchain masterchain] добавляется 1.7 Toncoin, а с каждым блоком [https://docs.ton.org/develop/blockchain/shards shardchain] – 1 Toncoin.

Пользователи оплачивают комиссии за транзакции, половина которых идёт на счёт валидаторов, а другая половина сжигается, что может приводить к дефляции в периоды высокой активности блокчейна.

Toncoin, заработанные валидаторами.
[[Файл:Показатель Toncoins minted per day.png|без|мини|800x800пкс|Показатель Toncoins minted per day]]

===Аккаунты===
В рамках TON термин «аккаунт» относится к любому типу [[Смарт-контракты|смарт-контракта]] в сети. Сюда входят кошельки, NFT, контракты [[Стейкинг|стейкинга]] и другое.

В TON всё — смарт-контракт. В том числе кошельки пользователей, отдельные функции и сервисы (обмен, авторизация на сайте, минт NFT и так далее).

Смарт-контракты в TON работают по принципу «акторов». Актор — это программа, которая получает сообщения, изменяет своё состояние и отправляет сообщения другим акторам.

Каждый смарт-контракт в TON имеет адрес, по которому получает сообщения. Чем больше смарт-контрактов, тем больше адресов.

Адрес контракта вычисляется на основе двух вещей:

# '''Скомпилированный код''': это сама программа контракта, записанная в специальном формате

# '''Начальное состояние''': это значения, которые контракт имеет в момент создания

В итоге, адрес контракта — это [https://ru.wikipedia.org/wiki/%D0%A5%D0%B5%D1%88-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F хэш], который получается из комбинации кода и начального состояния.
[[Файл:Показатель Accounts.png|без|мини|800x800пкс|Показатель Accounts]]

===Транзакции за день===
[https://ru.tonwiki.space/wiki/Telegram_Open_Network Блокчейн TON] работает, используя три ключевых элемента: аккаунты, сообщения и транзакции.

Транзакция представляет собой операцию, обрабатывающую входящие и исходящие сообщения, связанные с конкретным аккаунтом, изменяя его состояние и потенциально генерируя комиссии для валидаторов.
[[Файл:Показатель Transactions per day.png|без|мини|800x800пкс|Показатель Transactions per day]]

=[https://www.tonstat.com/#activeWallets Активные кошельки TON]=
В контексте этой статистики «ончейн кошельком» считается смарт-контракт типа «кошелёк». Важно отметить, что для хранения жетонов требуется отдельный тип смарт-контракта, называемый «джеттон-кошельком».

Кошелёк считается «активированным», если успешно отправил хотя бы одну исходящую транзакцию.

График активных кошельков за месяц показывает количество уникальных кошельков сети, которые совершили хотя бы одну транзакцию в течение скользящего 30-дневного периода. Например, на 31 марта учитываются все кошельки, которые совершили хотя бы одну транзакцию с 1 марта по 31 марта.
[[Файл:Метрики кошельков.png|без|мини|800x800пкс|Метрики кошельков]]

=[https://www.tonstat.com/#deFiData DeFi]=

===Общая стоимость заблокированных активов на [https://coinmarketcap.com/academy/ru/glossary/decentralized-exchange-dex DEX]===
TVL ([https://coinmarketcap.com/academy/ru/glossary/total-value-locked-tvl Total Value Locked]) — это общая стоимость активов, заблокированных в смарт-контрактах биржи. Это метрика, отражающая ликвидность и доверие пользователей к платформе. Повышение TVL свидетельствует о росте принятия и использования DEX, что способствует его устойчивости в криптовалютной экосистеме.

DEX, или децентрализованные биржи, позволяют пользователям обмениваться цифровыми активами напрямую, без участия центрального органа. В качестве таких бирж выступают [https://ru.tonwiki.space/wiki/STON.fi STON.fi] и [http://DeDust.io DeDust.io].
[[Файл:Показатель DEX total value locked.png|без|мини|800x800пкс|Показатель DEX total value locked]]

===Объём ежедневной торговли на DEX===
Объём торгов на DEX — это общая сумма активов, которые покупаются и продаются за определённый период. Эта метрика измеряет активность и ликвидность биржи, показывая общую стоимость сделок, совершаемых пользователями.

Высокие объемы торгов свидетельствуют о повышенной ликвидности и активности, что способствует более динамичному и эффективному рынку. Кроме того, объём торгов используется трейдерами и аналитиками для оценки популярности и производительности DEX по сравнению с другими платформами на рынке.
[[Файл:Показатель DEX daily trading volume.png|без|мини|800x800пкс|Показатель DEX daily trading volume]]

===Toncoin в ликвидном стейкинге===
Протоколы [https://coinmarketcap.com/academy/ru/glossary/liquid-staking ликвидного стейкинга] позволяют пользователям получать вознаграждения за стейкинг без необходимости блокировать токены или управлять инфраструктурой стейкинга.

Пользователи [https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D0%BF%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5 депонируют] Toncoins и получают в обмен торгуемые ликвидные токены, а смарт-контракт протокола управляет [[Стейкинг|стейкингом]] через операторов стейкинг-узлов. Средства пользователей остаются под контролем смарт-контракта, что предотвращает прямой доступ операторов к токенам и обеспечивает безопасность активов.
[[Файл:Показатели Toncoin locked in Liquid Staking.png|без|мини|800x800пкс|Показатели Toncoin locked in Liquid Staking]]

=[https://www.tonstat.com/#subtokens Активы]=

===Кошельки Jetton===
В экосистеме блокчейна [[The Open Network|TON]] взаимозаменяемые токены (FTs) классифицируются как [[TON Jettons|jettons]]. Эти токены отличаются от других благодаря уникальной реализации на блокчейне TON, который использует [https://coinmarketcap.com/academy/ru/glossary/sharding шардинг] для повышения эффективности.

'''Контракты кошельков Jetton:'''

''Назначение и функции'':

*Контракты кошельков Jetton предназначены для отправки, получения и сжигания jettons.
*Каждый контракт кошелька хранит информацию о балансе пользователя.
*В некоторых случаях для каждого типа jetton существуют индивидуальные кошельки владельцев.

''Отличие от других кошельков'':

*Кошельки Jetton не следует путать с кошельками, предназначенными для хранения и управления только Toncoin, такими как [https://docs.ton.org/participate/wallets/contracts#wallet-v3 кошельки v3R2], [https://docs.ton.org/participate/wallets/contracts#special-wallets highload кошельки] и другие. Эти кошельки обслуживают конкретные типы jetton.

''Механизм работы'':

*Кошельки Jetton используют [[смарт-контракты]] и взаимодействуют через внутренние сообщения между кошельком владельца и кошельком Jetton.

Например, если Алиса владеет кошельком с Jettons, она использует кошелёк (например, v3R2) для управления Jettons. При отправке Jettons она отправляет внешние сообщения своему кошельку, который, в свою очередь, отправляет внутреннее сообщение кошельку Jetton. Это сообщение запускает фактическую передачу токенов.

На графике изображено количество кошельков Jetton с ненулевым балансом.
[[Файл:Показатель Jetton Wallets.png|без|мини|800x800пкс|Показатель Jetton Wallets]]

===Выпущенные NFT's===
[https://coinmarketcap.com/academy/ru/glossary/non-fungible-token NFT] — уникальные цифровые активы, представляющие собой цифровые произведения искусства, которые могут быть куплены и проданы на платформах, таких как [[Getgems|getgems.io]]. Они помогают художникам зарабатывать деньги от продажи работ и получать [https://coinmarketcap.com/academy/ru/glossary/nft-royalties?ttrp321795=820vdi роялти] при их перепродаже.

Маркетплейсы NFT стали важной частью блокчейн-инфраструктуры, предоставляя платформу для обмена уникальными цифровыми активами и помогая пользователям понять концепцию владения на основе блокчейна.

График отображает количество невзаимозаменяемых токенов (NFT), которые были созданы и сопровождаются метаданными.
[[Файл:Показатель NFT's Minted.png|альт=Показатель NFT's Minted|без|мини|800x800пкс|Показатель NFT's Minted]]

===[https://dns.ton.org/ TON DNS]===
[[TON DNS]] — это сервис, который переводит человекочитаемые доменные имена (например, wallet.ton или swap.ton) в адреса TON смарт-контрактов.
[[Файл:Метрики TON DNS.png|без|мини|800x800пкс|Метрики TON DNS]]

=[https://www.tonstat.com/#validators Валидаторы]=
[[Валидатор]] (англ. validator) — это узел сети, который управляется специализированным ПО, запускаемым и контролируемым отдельными людьми или командами на своих ПК.
На графике отображено:

# Количество сетевых узлов, поддерживающих работу блокчейна, проверяющих и записывающих блоки

# Общее количество Toncoin (TON), заложенное валидаторами, помогающими поддерживать работу блокчейна

# Количество стран, в которых находятся валидаторы, поддерживающие работу блокчейна. Это важно для обеспечения безопасности и устойчивости блокчейн-сети, снижения рисков цензуры, повышения децентрализации и производительности, а также минимизации юридических рисков

[[Файл:Метрики Validators.png|без|мини|800x800пкс|Метрики Validators]]
Таким образом, [https://www.tonstat.com/ TonStat] является важным аналитическим инструментом для сети TON, позволяющим пользователям отслеживать ключевые метрики и поддерживать прозрачность и устойчивость экосистемы.

=Ссылки=

# [https://www.tonstat.com/ Сайт TonStat]

# [https://t.me/tonstatcom Telegram канал]
