/* HET Skilling OS — Client-side MD rendering + navigation */

/**
 * Fetch a markdown file and render it into a target element using marked.js.
 * Usage: <div class="md-content" data-md="path/to/file.md"></div>
 */
async function renderMarkdown(element) {
  const src = element.getAttribute('data-md');
  if (!src) return;
  try {
    const res = await fetch(src);
    if (!res.ok) {
      element.innerHTML = '<p style="color:#999">Content not yet written.</p>';
      return;
    }
    const text = await res.text();
    element.innerHTML = marked.parse(text);
  } catch (e) {
    element.innerHTML = '<p style="color:#999">Could not load content.</p>';
  }
}

/** Auto-render all elements with data-md attribute */
function renderAllMarkdown() {
  document.querySelectorAll('[data-md]').forEach(renderMarkdown);
}

/** Highlight active nav link based on current path */
function highlightNav() {
  const path = window.location.pathname;
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.endsWith(href.replace('./', ''))) {
      a.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAllMarkdown();
  highlightNav();
});
