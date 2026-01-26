import { LitElement, TemplateResult, CSSResultGroup } from 'lit';
declare enum SectionMarkerMode {
    left = "left",
    right = "right",
    both = "both",
    neither = "neither"
}
declare class SectionMarker extends LitElement {
    markerMode: SectionMarkerMode;
    render(): TemplateResult;
    static get styles(): CSSResultGroup;
}
export { SectionMarkerMode, SectionMarker };
