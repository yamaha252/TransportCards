# Транспортные карточки

Вам дана стопка посадочных карточек на различные виды транспорта, которые доставят вас из точки A в точку B. Карточки перепутаны, и вы не знаете, где начинается и где заканчивается ваше путешествие. Каждая карточка содержит информацию о том, откуда и куда вы едете на данном отрезке маршрута, а также о типе транспорта (номер рейса, номер места и прочее).

Предоставьте JavaScript API, который отсортирует такой список карточек и вернет словесное описание, как проделать ваше путешествие. API должен принимать на вход несортированный список карточек в формате придуманном вами и возвращать, например, такое описание:

```text
Take train 78A from Madrid to Barcelona. Seat 45B.
Take the airport bus from Barcelona to Gerona Airport. No seat assignment.
From Gerona Airport, take flight SK455 to Stockholm. Gate 45B. Seat 3A. Baggage drop at ticket counter 344.
From Stockholm, take flight SK22 to New York JFK. Gate 22. Seat 7B. Baggage will be automatically transferred from your last leg.
```
Требования:

Алгоритм должен работать с любым количеством карточек, если все карточки образуют одну неразрывную цепочку.
Время прибытия и отправления неизвестно и не важно. Подразумевается, что средство передвижения для следующего отрезка дожидается вас.
Структура кода должна быть расширяема для использования любых типов транспорта и информации, которая может быть связана с каждым типом транспорта.
API будет вызываться из других частей JavaScript-кода без необходимости дополнительных запросов между браузером и сервером.
Используйте объектно-ориентированный JavaScript.
Не используйте библиотеки и фреймворки, напишите все с нуля.
Задокументируйте в коде формат входных и выходных данных.

## Реализация

Класс **TransportCards** на выходе отдаёт объект следующего формата:
* `card` - объект с карточками
* `processing` - функционал обработки

# Использование

## Создание транспортных карточек - `cards`

```javascript
var journey = new TransportCards;
var cards = [
	new journey.card.bus({ ... }),
	new journey.card.plane({ ... }),
	new journey.card.train({ ... })
];
```

## Атрибуты

**Автобус - `bus`**
* `departure` [required] - Место отправления
* `arrival` [required] - Место назначения
* `number` [required] - Номер автобуса
* `seat` [optional] - Посадочное место

```javascript
new journey.card.bus({
	departure: 	'Аэропорт Челябинск',
	arrival: 'с. Верхняя Дубровка',
	number: '222',
	seat: '23'
})
```

**Самолёт - `plane`**
* `departure` [required] - Место отправления
* `arrival` [required] - Место назначения
* `flightNumber` [required] - Номер рейса
* `gate` [required] - Терминал
* `seat` [required] - Место
* `baggageNumber` [optional] - Номер багажа

```javascript
new journey.card.plane({
	departure: 'Екатеринбург Кольцово',
	arrival: 'Москва Шереметьево',
	flightNumber: 'B231AS',
	gate: 'B',
	seat: '10A',
	baggageNumber: 'D22'
})
```

**Поезд - `train`**
* `departure` [required] - Место отправления
* `arrival` [required] - Место назначения
* `trainNumber` [required] - Номер поезда
* `platform` [required] - Платформа
* `way` [required] - Путь
* `seat` [required] - Место

```javascript
new journey.card.train({
	departure: 'Москва Шереметьево',
	arrival: 'Москва Внуково',
	trainNumber: '775',
	platform: '1',
	way: '2',
	seat: '23B'
})
```

Можно переопределить текст сниппеда заменив метод `toString` у карточки.

Для правильной работы программы необходимо чтобы все карточки были связаны между собой ключами `departure` и `arrival` и выстраивались в цепочку

## Обработка

```javascript
var journey = new TransportCards;
var cards = [ ... ];
var processing = new journey.processing(cards);
```

В результате отобразив переменную `processing` как текст, или явно вызвав метод `toString` мы получим текстовое описание маршрута, например:

```text
В Екатеринбург сядьте на автобус 222 до Екатеринбург Кольцово.
Летите самолётом B231AS из Екатеринбург Кольцово в Москва Шереметьево. Терминал B, место 10A. Багаж D22
Садитесь в Москва Шереметьево на поезд 775 до Москва Внуково. Платформа 1, путь 2, место 23B
Летите самолётом S123D из Москва Внуково в Аэропорт Челябинск. Терминал D, место 15A.
В Аэропорт Челябинск сядьте на автобус 222 до с. Верхняя Дубровка. Место 23
```