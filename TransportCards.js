var TransportCards = module.exports = function() {

	/**
	 * Транспортная карточка.
	 * Умеет применять пользовательские данные.
	 * @param data
	 * @constructor
	 */
	var Card = function(data) {
		for (var n in data) {
			if (data.hasOwnProperty(n)) {
				this[n] = data[n];
			}
		}
	};

	/**
	 * Карточка автобуса.
	 * @constructor
	 */
	var CardBus = function() {
		Card.apply(this, arguments);
	};
	CardBus.prototype = {
		departure: 	null,
		arrival: null,
		number: null,
		seat: null
	};
	CardBus.prototype.toString = function() {
		return 'В ' +this.departure+ ' сядьте на автобус ' +this.number+ ' до ' +this.arrival+ '.' +(this.seat ? ' Место ' +this.seat : '');
	};

	/**
	 * Карточка самолёта.
	 * @constructor
	 */
	var CardPlane = function() {
		Card.apply(this, arguments);
	};
	CardPlane.prototype = {
		departure: null,
		arrival: null,
		flightNumber: null,
		gate: null,
		seat: null,
		baggageNumber: null
	};
	CardPlane.prototype.toString = function() {
		return 'Летите самолётом ' +this.flightNumber+ ' из ' +this.departure+ ' в ' +this.arrival+ '. Терминал ' +this.gate+ ', место ' +this.seat+ '.' +(this.baggageNumber ? ' Багаж ' +this.baggageNumber : '');
	};

	/**
	 * Карточка поезда.
	 * @constructor
	 */
	var CardTrain = function() {
		Card.apply(this, arguments);
	};
	CardTrain.prototype = {
		departure: null,
		arrival: null,
		trainNumber: null,
		platform: null,
		way: null,
		seat: null
	};
	CardTrain.prototype.toString = function() {
		return 'Садитесь в ' +this.departure+ ' на поезд ' +this.trainNumber+ ' до ' +this.arrival+ '. Платформа ' +this.platform+ ', путь ' +this.way+ ', место ' +this.seat;
	};



	/**
	 * Обработка карточек
	 * @constructor
	 */
	var Processing = function(cards) {
		this.cards = cards;
	};

	/**
	 * Сортировка в цепочку
	 */
	Processing.prototype.sorting = function(items) {
		// Незачем сортировать если карточек мало
		if (items.length < 2) {
			return items;
		}

		// Найдём первый элемент
		var result = items.filter(function(res){
			for (var n in items) {
				if (items.hasOwnProperty(n)) {
					var data = items[n];
					if (data.arrival == res.departure) {
						return false;
					}
				}
			}
			return true;
		});

		// Почему-то нашлось несколько элементов которые не входят в цепочку
		if (result.length > 1) {
			throw 'bad chain';
		}

		/*
		 Пробежимся по всем карточкам и найдём связи,
		 если какие то не входят в цепочку они будут выкинуты, не баг а фича
		 */
		var length = items.length;
		for (var i=0; i<length; i++) {
			for (var n in items) {
				if (items.hasOwnProperty(n)) {
					var data = items[n];
					var step = result[result.length - 1];
					if (data.departure === step.arrival) {
						result.push(data);
						delete items[n];
					}
				}
			}
		}

		return result;
	};

	Processing.prototype.toString = function() {
		var cards = this.sorting(this.cards);
		var result = cards.join("\r\n");

		// Если каких-то карточек не хватает, сообщим об этом
		if (cards.length !== this.cards.length) {
			result += "\r\n" + 'Некоторые карточки не входят в маршрут';
		}

		return result;
	};

	return {
		card: {
			bus: 	CardBus,
			plane: 	CardPlane,
			train: 	CardTrain
		},
		processing: Processing
	};
};