import { html, fixture, expect } from '@open-wc/testing';
import '../index';
/* eslint-disable no-unused-expressions */
describe('SectionMarker', () => {
    it('marker mode defaults to `neither`', async () => {
        const el = (await fixture(html `
      <section-marker></section-marker>
    `));
        expect(el.markerMode).to.equal('neither');
    });
});
//# sourceMappingURL=section-marker.test.js.map