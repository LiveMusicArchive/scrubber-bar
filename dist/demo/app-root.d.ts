import { LitElement } from 'lit';
import '../src/scrubber-bar';
export declare class AppRoot extends LitElement {
    value: HTMLSpanElement;
    currentValue: number;
    render(): import("lit").TemplateResult<1>;
    valueChange(e: CustomEvent): void;
    firstUpdated(): void;
}
