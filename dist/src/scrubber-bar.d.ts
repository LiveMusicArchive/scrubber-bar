import { LitElement, PropertyValues, TemplateResult, CSSResultGroup } from 'lit';
export declare class ScrubberBar extends LitElement {
    value: number;
    min: number;
    max: number;
    step: number;
    sectionMarkerPercentages: number[];
    expandSectionMarkers: boolean;
    rangeSlider: HTMLInputElement;
    webkitStyle: HTMLStyleElement;
    private userIsInteracting;
    private _value;
    get percentage(): number;
    render(): TemplateResult;
    updated(changedProperties: PropertyValues): void;
    firstUpdated(): void;
    private handleSlide;
    private interactionStarted;
    private interactionEnded;
    private get webkitSliderStyle();
    private emitChangeEvent;
    private get sortedMarkers();
    private updateMarkerFlags;
    static get styles(): CSSResultGroup;
}
