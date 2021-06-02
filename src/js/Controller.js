/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
export default class Controller {
  constructor(layout, handler) {
    this.layout = layout;
    this.handler = handler;
  }

  init() {
    this.layout.init();
    this.body = document.body;
    this.addListeners();
  }

  addListeners() {
    this.body.removeEventListener('keydown', (e) => this.listenerCallback(e));
    this.body.addEventListener('keydown', (e) => this.listenerCallback(e));
  }

  listenerCallback(e) {
    this.text = this.body.querySelector('textarea').value;
    if (e.key === 'Enter' && this.text !== '') {
      this.getCoords(this.text);
      this.body.querySelector('textarea').value = '';
    }
  }

  createDate() {
    this.date = new Date();
    this.dailyFormatter = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
    });
    this.yearFormatter = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    return `${this.yearFormatter.format(this.date)} ${this.dailyFormatter.format(this.date)}`;
  }

  getCoords(text) {
    if (navigator.geolocation) {
      return navigator
        .geolocation
        .getCurrentPosition((pos) => this.positionDetected(pos), (err) => this.positionError(err, text));
    }
  }

  positionDetected(position) {
    const { timestamp, coords } = position;
    const { latitude, longitude, accuracy } = coords;
    console.log(`
    Координаты успешно получены
    Время: ${timestamp}
    Ширина: ${latitude}
    Долгота: ${longitude}
    Точность позиции +- ${accuracy} метров
    `);
    this.coords = `[${latitude.toFixed(5)}, ${longitude.toFixed(5)}]`;
    this.layout.renderMessage(this.text, this.createDate(), this.coords);
  }

  positionError(error, text) {
    console.log(text);
    while (this.body.firstChild) {
      this.body.firstChild.remove();
    }
    this.layout.renderError();
    this.errorEl = document.querySelector('.error');
    this.initErrorListeners(text);
    console.log(`
      Определить геопозицию не удалось.
      Ошибка: ${error.message}
      Код ошибки: ${error.code}
    `);
  }

  initErrorListeners(text) {
    this.errorEl.addEventListener('click', (e) => {
      if (e.target.id === 'cancel') {
        while (this.body.firstChild) {
          this.body.firstChild.remove();
        }
        this.init();
      } else if (e.target.id === 'ok') {
        const data = this.errorEl.querySelector('textarea').value;
        const coords = this.handler.split(data);
        while (this.body.firstChild) {
          this.body.firstChild.remove();
        }
        this.init();
        this.coords = `[${coords.latitude}, ${coords.longitude}]`;
        this.layout.renderMessage(text, this.createDate(), this.coords);
      }
    });
  }
}
