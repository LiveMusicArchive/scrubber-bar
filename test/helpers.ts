import { render, type TemplateResult } from 'lit';

export { html } from 'lit';

const holders: HTMLElement[] = [];

/**
 * Render a Lit template into a container attached to the document, wait for the
 * top-level element's first update, and return it.
 */
export async function fixture<T extends Element>(
  template: TemplateResult,
): Promise<T> {
  const holder = document.createElement('div');
  document.body.append(holder);
  holders.push(holder);
  render(template, holder);
  const el = holder.firstElementChild as T;
  await (el as unknown as { updateComplete?: Promise<unknown> }).updateComplete;
  return el;
}

/** Remove everything fixture() has rendered so far. Call between tests. */
export function fixtureCleanup(): void {
  for (const holder of holders.splice(0)) holder.remove();
}

/** Resolve with the next event of the given type dispatched on target. */
export function oneEvent<T extends Event = CustomEvent>(
  target: EventTarget,
  type: string,
): Promise<T> {
  return new Promise(resolve => {
    target.addEventListener(type, event => resolve(event as T), { once: true });
  });
}
