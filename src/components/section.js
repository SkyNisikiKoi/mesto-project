export class Section {
    constructor(options, containerSelector) {
      this.items = options.items,
      this._renderer = options.renderer,
      this._container = document.querySelector(containerSelector);
    }

    renderElements() {
        this.items.reverse().forEach(item => {
        this._renderer(item);
    })
    }

    addItem(elementNoda){
        this._container.append(elementNoda);
    }
}