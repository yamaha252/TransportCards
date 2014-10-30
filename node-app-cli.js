#!/usr/bin/env nodejs

var TransportCards = require('./TransportCards');

var journey = new TransportCards;

var cards = [
	new journey.card.bus({
		departure: 	'Екатеринбург',
		arrival: 'Екатеринбург Кольцово',
		number: '222'
	}),
	new journey.card.plane({
		departure: 'Екатеринбург Кольцово',
		arrival: 'Москва Шереметьево',
		flightNumber: 'B231AS',
		gate: 'B',
		seat: '10A',
		baggageNumber: 'D22'
	}),
	new journey.card.train({
		departure: 'Москва Шереметьево',
		arrival: 'Москва Внуково',
		trainNumber: '775',
		platform: '1',
		way: '2',
		seat: '23B'
	}),
	new journey.card.plane({
		departure: 'Москва Внуково',
		arrival: 'Аэропорт Челябинск',
		flightNumber: 'S123D',
		gate: 'D',
		seat: '15A'
	}),
	new journey.card.bus({
		departure: 	'Аэропорт Челябинск',
		arrival: 'с. Верхняя Дубровка',
		number: '222',
		seat: '23'
	})
];

var cardsRandom = cards.sort(function(){ return Math.random() > 0.5 });

var processing = new journey.processing(cardsRandom);

process.stdout.write(processing + "\r\n");