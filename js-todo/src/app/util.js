export class HtmlElementWrapper {
    constructor(selector) {
        this.$element = document.querySelector(selector)
    }

    addEventListener(type, callback) {
        this.$element.addEventListener(type, callback)
        return this
    }
}

export function getElementWithId(event) {
    return event.path.find(element => element.id)
}
