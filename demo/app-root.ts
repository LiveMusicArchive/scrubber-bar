import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '../src/scrubber-bar';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('#bar-value') value!: HTMLSpanElement;

  @state() currentValue = 37;

  render() {
    return html`
      <scrubber-bar
        sectionMarkerPercentages="[0, 10, 11, 25, 30, 50, 75, 100]"
        .value=${this.currentValue}
        @valuechange=${this.valueChange}
      >
      </scrubber-bar>
      <span id="bar-value">${this.currentValue}</span>%
    `;
  }

  valueChange(e: CustomEvent) {
    this.currentValue = e.detail.value.toString();
  }

  firstUpdated(): void {
    setInterval(() => {
      this.currentValue = parseFloat((Math.random() * 100).toFixed(0));
    }, 2000);
  }
}
