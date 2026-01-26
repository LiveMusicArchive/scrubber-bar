import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '../src/scrubber-bar';
let AppRoot = class AppRoot extends LitElement {
    constructor() {
        super(...arguments);
        this.currentValue = 37;
    }
    render() {
        return html `
      <scrubber-bar
        sectionMarkerPercentages="[0, 10, 11, 25, 30, 50, 75, 100]"
        .value=${this.currentValue}
        @valuechange=${this.valueChange}
      >
      </scrubber-bar>
      <span id="bar-value">${this.currentValue}</span>%
    `;
    }
    valueChange(e) {
        this.currentValue = e.detail.value.toString();
    }
    firstUpdated() {
        setInterval(() => {
            this.currentValue = parseFloat((Math.random() * 100).toFixed(0));
        }, 2000);
    }
};
__decorate([
    query('#bar-value')
], AppRoot.prototype, "value", void 0);
__decorate([
    state()
], AppRoot.prototype, "currentValue", void 0);
AppRoot = __decorate([
    customElement('app-root')
], AppRoot);
export { AppRoot };
//# sourceMappingURL=app-root.js.map