import './scss/styles.scss';

import {AuctionAPI} from "./components/AuctionAPI";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import { Component } from './components/base/Component';
import { createElement, ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new AuctionAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})


interface ICounter {
    amount: number;
}

class Counter extends Component<ICounter> {
    protected _counter: HTMLElement;
    protected _increment: HTMLButtonElement;
    protected _decrement: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this._counter = createElement<HTMLElement>('div');
        this._increment = createElement<HTMLButtonElement>('button', {
            className: 'button button_outline',
            textContent: '+'
        });
        this._decrement = createElement<HTMLButtonElement>('button', {
            className: 'button button_outline',
            textContent: '-'
        });    

        this.container.append(this._counter, this._increment, this._decrement);

        this._increment.addEventListener('click', this.onClick(1));
        this._decrement.addEventListener('click', this.onClick(-1));
    }

    protected onClick = (change: number) => () => {
        console.log('change: ', change);
        this.amount += change;
    } 

    set amount(value: number) {
        this.setText(this._counter, value);
    }

    get amount() {
        return Number(this._counter.textContent);
    }
}

const root = ensureElement<HTMLElement>('main .catalog__items');
const counter = new Counter(root);
counter.render({
    amount: 5
});


// Все шаблоны


// Модель данных приложения


// Глобальные контейнеры


// Переиспользуемые части интерфейса


// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно


// Получаем лоты с сервера
api.getLotList()
    .then(result => {
        // вместо лога поместите данные в модель
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });


