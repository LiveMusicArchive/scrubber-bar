import { html, fixture, expect } from '@open-wc/testing';

// Side-effect import registers <section-marker>; the class below is type-only
// and would otherwise be elided by esbuild, dropping the registration.
import '../src/section-marker';
import type { SectionMarker } from '../src/section-marker';

describe('SectionMarker', () => {
  it('marker mode defaults to `neither`', async () => {
    const el = (await fixture(html`
      <section-marker></section-marker>
    `)) as SectionMarker;

    expect(el.markerMode).to.equal('neither');
  });
});
