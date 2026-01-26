import { __decorate } from "tslib";
import { LitElement, html, css, } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SectionMarkerMode } from './section-marker';
let ScrubberBar = class ScrubberBar extends LitElement {
    constructor() {
        super(...arguments);
        this.value = 0;
        this.min = 0;
        this.max = 100;
        this.step = 0.1;
        this.sectionMarkerPercentages = [];
        this.expandSectionMarkers = false;
        this.userIsInteracting = false;
        // This is the canonical source for the current value. Since the value can be updated by either the consumer
        // or the user, we need a single place for the actual value. It is non-reactive so we can update it in either
        // scenario without causing a loop of `value` updates.
        this._value = 0;
    }
    get percentage() {
        const delta = this.max - this.min;
        const minOffset = this._value - this.min;
        return (minOffset / delta) * 100;
    }
    render() {
        return html `
      <div class="container">
        <div class="color-fill"></div>

        <div class="marker-container">
          ${this.sectionMarkerPercentages.map((markerPercent) => {
            return html `
              <section-marker
                data-location=${markerPercent}
                style="left: ${markerPercent}%"
              >
              </section-marker>
            `;
        })}
        </div>

        <input
          id="slider"
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${this._value}
          @mousedown=${this.interactionStarted}
          @mouseup=${this.interactionEnded}
          @touchstart=${this.interactionStarted}
          @touchend=${this.interactionEnded}
          @input=${this.handleSlide}
          @change=${this.handleSlide}
        />

        <div id="webkit-range-input-style">${this.webkitSliderStyle}</div>
      </div>
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has('value') && !this.userIsInteracting) {
            this._value = this.value;
            this.updateMarkerFlags();
        }
    }
    firstUpdated() {
        this.updateMarkerFlags();
    }
    handleSlide(e) {
        const newValue = e.target.value;
        this._value = parseFloat(newValue);
        this.updateMarkerFlags();
        this.emitChangeEvent();
    }
    interactionStarted() {
        this.userIsInteracting = true;
        this.dispatchEvent(new Event('userInteractionStarted'));
    }
    interactionEnded() {
        this.userIsInteracting = false;
        this.dispatchEvent(new Event('userInteractionEnded'));
    }
    get webkitSliderStyle() {
        return html `
      <style>
        .color-fill {
          background: linear-gradient(
            to right,
            var(--trackFillColor, #3272b6) 0%,
            var(--trackFillColor, #3272b6) ${this.percentage}%,
            var(--trackColor, rgba(0, 0, 0, 0.1)) ${this.percentage}%,
            var(--trackColor, rgba(0, 0, 0, 0.1)) 100%
          );
        }
      </style>
    `;
    }
    emitChangeEvent() {
        const event = new CustomEvent('valuechange', {
            detail: { value: this._value },
        });
        this.dispatchEvent(event);
    }
    get sortedMarkers() {
        return this.sectionMarkerPercentages.sort();
    }
    updateMarkerFlags() {
        if (!this.expandSectionMarkers) {
            return;
        }
        const currentValue = this._value;
        const percentsGreaterThanValue = this.sortedMarkers.filter(value => value > currentValue);
        const closestUpper = Math.min(...percentsGreaterThanValue);
        const percentsLessThanValue = this.sortedMarkers.filter(value => value <= currentValue);
        const closestLower = Math.max(...percentsLessThanValue);
        this.sectionMarkerPercentages.forEach(value => {
            var _a;
            const marker = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`section-marker[data-location="${value}"]`);
            if (!marker)
                return;
            switch (value) {
                case closestUpper:
                    marker.markerMode = SectionMarkerMode.left;
                    break;
                case closestLower:
                    marker.markerMode = SectionMarkerMode.right;
                    break;
                default:
                    marker.markerMode = SectionMarkerMode.neither;
            }
        });
    }
    static get styles() {
        const markerInset = css `var(--markerInset, 10px)`;
        const scrubberBarHeight = css `var(--scrubberBarHeight, 20px)`;
        const thumbDiameter = css `var(--thumbDiameter, 20px)`;
        const thumbBorderRadius = css `var(--thumbBorderRadius, 50%)`;
        const thumbBorder = css `var(--thumbBorder, 1px solid black)`;
        const thumbColor = css `var(--thumbColor, white)`;
        const trackHeight = css `var(--trackHeight, 10px)`;
        const trackBorderRadius = css `var(--trackBorderRadius, 5px)`;
        const trackBorder = css `var(--trackBorder, 1px solid white)`;
        const trackFillColor = css `var(--trackFillColor, #3272b6)`;
        const webkitThumbTopMargin = css `var(--webkitThumbTopMargin, -6px)`;
        const commonThumbDefinitions = css `
      background-color: ${thumbColor};
      height: ${thumbDiameter};
      width: ${thumbDiameter};
      border-radius: ${thumbBorderRadius};
      border: ${thumbBorder};
      cursor: pointer;
    `;
        const trackSizeDefinitions = css `
      height: ${trackHeight};
      border-radius: ${trackBorderRadius};
    `;
        const commonTrackDefinitions = css `
      border: ${trackBorder};
      ${trackSizeDefinitions};
    `;
        return css `
      .container {
        position: relative;
        height: 20px;
      }

      .color-fill {
        height: 10px;
        border-radius: 1em;
        position: absolute;
        bottom: 7px;
        left: 2px;
        right: -2px;
      }

      .marker-container {
        position: absolute;
        left: ${markerInset};
        right: ${markerInset};
        height: 100%;
      }

      section-marker {
        position: absolute;
        width: 2rem;
        height: ${trackHeight};
        bottom: 7px;
        /*
          we set the left side of the marker to the spot where we want it, but the marker line is in
          the center of the marker so we need to shift it to the left by half its width so this transform
          is doing that
         */
        transform: translateX(-50%);
      }

      input[type='range'] {
        -webkit-appearance: none;
        height: ${scrubberBarHeight};
        padding: 0;
        width: 100%;
        background: none;
        outline: none;
        position: absolute;
        bottom: 0;
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        box-sizing: content-box;
        margin-top: ${webkitThumbTopMargin};
        ${commonThumbDefinitions}
      }

      input[type='range']::-moz-range-thumb {
        ${commonThumbDefinitions}
      }

      input[type='range']::-ms-thumb {
        /* should come after -webkit- */
        ${commonThumbDefinitions}
        margin-top: 0;
      }

      input[type='range']::-webkit-slider-runnable-track {
        ${commonTrackDefinitions}
      }

      input[type='range']::-moz-range-track {
        ${commonTrackDefinitions}
      }

      input[type='range']::-moz-range-progress {
        ${trackSizeDefinitions};
      }

      input[type='range']::-ms-track {
        /* should come after -webkit- */
        border-color: transparent;
        color: transparent;
        ${commonTrackDefinitions}
      }

      input[type='range']::-ms-fill-lower {
        background-color: ${trackFillColor};
        ${trackSizeDefinitions};
      }

      input[type='range']::-ms-tooltip {
        display: none;
      }
    `;
    }
};
__decorate([
    property({ type: Number })
], ScrubberBar.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], ScrubberBar.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], ScrubberBar.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], ScrubberBar.prototype, "step", void 0);
__decorate([
    property({ type: Array })
], ScrubberBar.prototype, "sectionMarkerPercentages", void 0);
__decorate([
    property({ type: Boolean })
], ScrubberBar.prototype, "expandSectionMarkers", void 0);
__decorate([
    query('#rangeSlider')
], ScrubberBar.prototype, "rangeSlider", void 0);
__decorate([
    query('#webkit-range-input-style')
], ScrubberBar.prototype, "webkitStyle", void 0);
__decorate([
    state()
], ScrubberBar.prototype, "userIsInteracting", void 0);
__decorate([
    state()
], ScrubberBar.prototype, "_value", void 0);
ScrubberBar = __decorate([
    customElement('scrubber-bar')
], ScrubberBar);
export { ScrubberBar };
//# sourceMappingURL=scrubber-bar.js.map