import { html, fixture, expect } from '@open-wc/testing';

import '../index';
import { SectionMarker } from '../src/section-marker';

/* eslint-disable no-unused-expressions */

describe('SectionMarker', () => {
  it('marker mode defaults to `neither`', async () => {
    const el = (await fixture(html`
      <section-marker></section-marker>
    `)) as SectionMarker;

    expect(el.markerMode).to.equal('neither');
  });
});
