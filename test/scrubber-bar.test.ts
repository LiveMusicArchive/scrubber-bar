import { describe, it, expect } from 'vitest';
import { html, fixture, oneEvent } from './helpers';

// Side-effect import registers <scrubber-bar> (and, transitively, <section-marker>).
// Without it, esbuild elides the type-only class imports below and the element never registers.
import '../src/scrubber-bar';
import type { ScrubberBar } from '../src/scrubber-bar';
import type { SectionMarker } from '../src/section-marker';

describe('ScrubberBar', () => {
  it('defaults value to 0', async () => {
    const el = (await fixture(html`
      <scrubber-bar></scrubber-bar>
    `)) as ScrubberBar;

    expect(el.value).toBe(0);
  });

  it('dispatches userInteractionStarted event on user mousedown', async () => {
    const el = (await fixture(html`
      <scrubber-bar></scrubber-bar>
    `)) as ScrubberBar;

    const rangeSlider = el.shadowRoot?.getElementById('slider');
    const event = new MouseEvent('mousedown');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider?.dispatchEvent(event);
    });
    const response = await oneEvent(el, 'userInteractionStarted');
    expect(response).toBeTruthy();
  });

  it('dispatches userInteractionEnded event on user mouseup', async () => {
    const el = (await fixture(html`
      <scrubber-bar></scrubber-bar>
    `)) as ScrubberBar;

    const rangeSlider = el.shadowRoot?.getElementById('slider');
    const event = new MouseEvent('mouseup');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider?.dispatchEvent(event);
    });
    const response = await oneEvent(el, 'userInteractionEnded');
    expect(response).toBeTruthy();
  });

  it('dispatches userInteractionStarted event on user touchstart', async () => {
    const el = (await fixture(html`
      <scrubber-bar></scrubber-bar>
    `)) as ScrubberBar;

    const rangeSlider = el.shadowRoot?.getElementById('slider');
    const event = new Event('touchstart');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider?.dispatchEvent(event);
    });
    const response = await oneEvent(el, 'userInteractionStarted');
    expect(response).toBeTruthy();
  });

  it('dispatches userInteractionEnded event on user touchend', async () => {
    const el = (await fixture(html`
      <scrubber-bar></scrubber-bar>
    `)) as ScrubberBar;

    const rangeSlider = el.shadowRoot?.getElementById('slider');
    const event = new Event('touchend');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider?.dispatchEvent(event);
    });
    const response = await oneEvent(el, 'userInteractionEnded');
    expect(response).toBeTruthy();
  });

  it('dispatches valuechange event when input occurs on slider', async () => {
    const el = (await fixture(html`
      <scrubber-bar></scrubber-bar>
    `)) as ScrubberBar;

    const rangeSlider = el.shadowRoot?.getElementById('slider');
    const inputEvent = new Event('input');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider?.dispatchEvent(inputEvent);
    });

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).toBe(0);
  });

  it('dispatches the proper value after an input change event', async () => {
    const el = (await fixture(html`
      <scrubber-bar></scrubber-bar>
    `)) as ScrubberBar;

    const rangeSlider = el.shadowRoot?.getElementById(
      'slider',
    ) as HTMLInputElement;
    if (rangeSlider) rangeSlider.value = '20';
    const inputEvent = new Event('input');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(inputEvent);
    });

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).toBe(20);
  });

  it('calculates the proper percentage for the given value and range', async () => {
    const el = (await fixture(html`
      <scrubber-bar min="10" max="50"></scrubber-bar>
    `)) as ScrubberBar;

    const inputEvent = new Event('input');
    const rangeSlider = el.shadowRoot?.getElementById(
      'slider',
    ) as HTMLInputElement;

    if (rangeSlider) rangeSlider.value = '10';
    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(inputEvent);
    });

    let response = await oneEvent(el, 'valuechange');
    expect(response.detail.value).toBe(10);
    expect(el.percentage).toBe(0);

    rangeSlider.value = '20';
    setTimeout(() => {
      rangeSlider.dispatchEvent(inputEvent);
    });

    response = await oneEvent(el, 'valuechange');
    expect(response.detail.value).toBe(20);
    expect(el.percentage).toBe(25);
  });

  it('does not update the slider field value if the user is interacting', async () => {
    const el = (await fixture(html`
      <scrubber-bar></scrubber-bar>
    `)) as ScrubberBar;

    expect(el.value).toBe(0);

    const event = new MouseEvent('mousedown');
    const rangeSlider = el.shadowRoot?.getElementById(
      'slider',
    ) as HTMLInputElement;

    setTimeout(() => {
      rangeSlider?.dispatchEvent(event);
    });
    await oneEvent(el, 'userInteractionStarted');

    el.value = 20;

    expect(rangeSlider.value).toBe('0');
  });

  it('properly lays out section markers', async () => {
    const el = (await fixture(html`
      <scrubber-bar .sectionMarkerPercentages=${[10, 11, 25, 30, 50, 75]}>
      </scrubber-bar>
    `)) as ScrubberBar;

    const sectionMarkers = el.shadowRoot?.querySelectorAll('section-marker');
    expect(sectionMarkers?.length).toBe(6);

    const testMarker = sectionMarkers ? sectionMarkers[1] : '';
    expect((testMarker as SectionMarker).style.left).toBe('11%');
  });

  it('sets the marker flag values properly', async () => {
    const el = (await fixture(html`
      <scrubber-bar
        .sectionMarkerPercentages=${[10, 11, 25, 30, 50, 75]}
        value="37"
        ?expandSectionMarkers=${true}
      >
      </scrubber-bar>
    `)) as ScrubberBar;

    const sectionMarkers = el.shadowRoot?.querySelectorAll('section-marker');
    const prevMarker = sectionMarkers![2] as SectionMarker;
    const leftMarker = sectionMarkers![3] as SectionMarker;
    const rightMarker = sectionMarkers![4] as SectionMarker;
    const nextMarker = sectionMarkers![5] as SectionMarker;
    expect(prevMarker.markerMode).toBe('neither');
    expect(leftMarker.markerMode).toBe('right');
    expect(rightMarker.markerMode).toBe('left');
    expect(nextMarker.markerMode).toBe('neither');
  });

  it('sets does not set the section markers if `expandSectionMarkers` is `false`', async () => {
    const el = (await fixture(html`
      <scrubber-bar
        .sectionMarkerPercentages=${[10, 11, 25, 30, 50, 75]}
        value="37"
      >
      </scrubber-bar>
    `)) as ScrubberBar;

    const sectionMarkers = el.shadowRoot!.querySelectorAll('section-marker');
    const prevMarker = sectionMarkers[2] as SectionMarker;
    const leftMarker = sectionMarkers[3] as SectionMarker;
    const rightMarker = sectionMarkers[4] as SectionMarker;
    const nextMarker = sectionMarkers[5] as SectionMarker;
    expect(prevMarker.markerMode).toBe('neither');
    expect(leftMarker.markerMode).toBe('neither');
    expect(rightMarker.markerMode).toBe('neither');
    expect(nextMarker.markerMode).toBe('neither');
  });
});
