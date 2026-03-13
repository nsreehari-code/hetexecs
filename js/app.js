/* hetexecs — rendering + navigation */

let DATA = { courses: [], versions: [], batches: [], funding: [] };

async function loadData() {
  const base = getBasePath();
  const [courses, versions, batches, funding] = await Promise.all([
    fetch(base + 'data/courses.json').then(r => r.json()),
    fetch(base + 'data/versions.json').then(r => r.json()),
    fetch(base + 'data/batches.json').then(r => r.json()),
    fetch(base + 'data/funding-adapters.json').then(r => r.json()),
  ]);
  DATA = { courses, versions, batches, funding };
}

function getBasePath() {
  const path = location.pathname;
  if (path.includes('/views/')) return '../';
  return './';
}

/* ── Router ── */

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function nav(page, params) {
  const base = getBasePath();
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  location.href = base + page + qs;
}

/* ── Helpers ── */

function healthDot(h) {
  const cls = h === 'red' ? 'health-red' : h === 'amber' ? 'health-amber' : 'health-green';
  return `<span class="health ${cls}"></span>`;
}

function fundingChips(fundingArr) {
  return fundingArr.map(f => {
    const cls = f.source === 'Govt' ? 'chip-govt' : f.source === 'CSR' ? 'chip-csr' : 'chip-paid';
    return `<span class="chip ${cls}">${f.source} ${f.share}%</span>`;
  }).join('');
}

function breadcrumb(items) {
  // items: [{label, href?}, ...]
  return '<nav class="breadcrumb">' +
    items.map((it, i) => {
      const last = i === items.length - 1;
      if (last) return `<span>${it.label}</span>`;
      return `<a href="${it.href}">${it.label}</a><span class="sep">›</span>`;
    }).join('') +
    '</nav>';
}

/* ── Portfolio view (index.html) ── */

function renderPortfolio() {
  const el = document.getElementById('app');

  const totalCourses = DATA.courses.length;
  const totalVersions = DATA.versions.filter(v => v.status === 'active').length;
  const totalBatches = DATA.batches.length;
  const fundingMix = {};
  DATA.batches.forEach(b => b.funding.forEach(f => {
    fundingMix[f.source] = (fundingMix[f.source] || 0) + 1;
  }));

  let html = breadcrumb([{ label: 'Portfolio' }]);

  html += `<h1>HET Skilling Portfolio</h1>`;
  html += `<p class="subtitle">CEO Map — Course families, versions, and batches at a glance</p>`;

  // Stats
  html += `<div class="stats">`;
  html += `<div class="stat-box"><div class="stat-num">${totalCourses}</div><div class="stat-label">Courses</div></div>`;
  html += `<div class="stat-box"><div class="stat-num">${totalVersions}</div><div class="stat-label">Active Versions</div></div>`;
  html += `<div class="stat-box"><div class="stat-num">${totalBatches}</div><div class="stat-label">Batches</div></div>`;
  Object.entries(fundingMix).forEach(([src, cnt]) => {
    html += `<div class="stat-box"><div class="stat-num">${cnt}</div><div class="stat-label">${src} Batches</div></div>`;
  });
  html += `</div>`;

  // Course cards
  html += `<h2>Course Families</h2>`;
  html += `<div class="card-grid">`;
  DATA.courses.forEach(c => {
    const vers = DATA.versions.filter(v => v.courseId === c.id);
    const bats = DATA.batches.filter(b => b.courseId === c.id);
    const activeVers = vers.filter(v => v.status === 'active').length;
    const healths = bats.map(b => b.health);
    const worstHealth = healths.includes('red') ? 'red' : healths.includes('amber') ? 'amber' : 'green';

    html += `<div class="card" onclick="nav('views/course.html', {id:'${c.id}'})">`;
    html += `<div class="card-title"><span class="icon">${c.icon}</span>${c.short}</div>`;
    html += `<div class="card-meta">${healthDot(worstHealth)} ${activeVers} version${activeVers !== 1 ? 's' : ''} · ${bats.length} batch${bats.length !== 1 ? 'es' : ''}</div>`;
    html += `<div class="card-desc">${c.intent}</div>`;

    // Funding chips across all batches
    const allFunding = {};
    bats.forEach(b => b.funding.forEach(f => allFunding[f.source] = true));
    html += `<div class="funding-chips">`;
    Object.keys(allFunding).forEach(src => {
      const cls = src === 'Govt' ? 'chip-govt' : src === 'CSR' ? 'chip-csr' : 'chip-paid';
      html += `<span class="chip ${cls}">${src}</span>`;
    });
    html += `</div>`;
    html += `</div>`;
  });
  html += `</div>`;

  el.innerHTML = html;
}

/* ── Course view ── */

function renderCourse() {
  const el = document.getElementById('app');
  const courseId = getParam('id');
  const course = DATA.courses.find(c => c.id === courseId);
  if (!course) { el.innerHTML = '<p class="empty">Course not found</p>'; return; }

  const vers = DATA.versions.filter(v => v.courseId === courseId);
  const bats = DATA.batches.filter(b => b.courseId === courseId);

  const base = getBasePath();
  let html = breadcrumb([
    { label: 'Portfolio', href: base + 'index.html' },
    { label: course.short },
  ]);

  html += `<h1><span class="icon">${course.icon}</span>${course.name}</h1>`;
  html += `<p class="subtitle">${course.intent}</p>`;

  // Versions
  html += `<h2>Blueprint Versions</h2>`;
  html += `<div class="card-grid">`;
  vers.forEach(v => {
    const vBats = bats.filter(b => b.versionId === v.id);
    html += `<div class="card" onclick="nav('views/version.html', {id:'${v.id}'})">`;
    html += `<div class="card-title">${v.version} — ${v.label}</div>`;
    html += `<div class="card-meta">${v.totalHours} hrs · ${v.delivery} · NSQF L${v.nsqfLevel} · <strong>${v.status}</strong></div>`;
    html += `<div class="card-desc">${vBats.length} batch${vBats.length !== 1 ? 'es' : ''}</div>`;
    html += `</div>`;
  });
  html += `</div>`;

  // All batches for this course
  html += `<h2>All Batches</h2>`;
  html += renderBatchTable(bats);

  el.innerHTML = html;
}

/* ── Version view ── */

function renderVersion() {
  const el = document.getElementById('app');
  const versionId = getParam('id');
  const ver = DATA.versions.find(v => v.id === versionId);
  if (!ver) { el.innerHTML = '<p class="empty">Version not found</p>'; return; }

  const course = DATA.courses.find(c => c.id === ver.courseId);
  const bats = DATA.batches.filter(b => b.versionId === versionId);

  const base = getBasePath();
  let html = breadcrumb([
    { label: 'Portfolio', href: base + 'index.html' },
    { label: course.short, href: 'course.html?id=' + course.id },
    { label: ver.version },
  ]);

  html += `<h1><span class="icon">${course.icon}</span>${course.short} ${ver.version}</h1>`;
  html += `<p class="subtitle">${ver.label}</p>`;

  // Blueprint details
  html += `<div class="detail-section">`;
  html += `<h3>Blueprint</h3>`;
  html += `<div class="detail-row"><span class="detail-label">Duration</span><span class="detail-value">${ver.duration}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Rhythm</span><span class="detail-value">${ver.rhythm}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Total Hours</span><span class="detail-value">${ver.totalHours}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Delivery</span><span class="detail-value">${ver.delivery}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">NSQF Level</span><span class="detail-value">${ver.nsqfLevel}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Assessment</span><span class="detail-value">${ver.assessment}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${ver.status}</span></div>`;
  html += `</div>`;

  // Evidence spine
  html += `<div class="detail-section">`;
  html += `<h3>Evidence Spine</h3>`;
  html += `<ul class="evidence-list">`;
  ver.evidenceSpine.forEach(e => {
    html += `<li>${e}</li>`;
  });
  html += `</ul></div>`;

  // Batches
  html += `<h2>Batches</h2>`;
  if (bats.length === 0) {
    html += `<p class="empty">No batches yet</p>`;
  } else {
    html += renderBatchTable(bats);
  }

  el.innerHTML = html;
}

/* ── Batch view ── */

function renderBatch() {
  const el = document.getElementById('app');
  const batchId = getParam('id');
  const batch = DATA.batches.find(b => b.id === batchId);
  if (!batch) { el.innerHTML = '<p class="empty">Batch not found</p>'; return; }

  const ver = DATA.versions.find(v => v.id === batch.versionId);
  const course = DATA.courses.find(c => c.id === batch.courseId);

  const base = getBasePath();
  let html = breadcrumb([
    { label: 'Portfolio', href: base + 'index.html' },
    { label: course.short, href: 'course.html?id=' + course.id },
    { label: ver.version, href: 'version.html?id=' + ver.id },
    { label: batch.id },
  ]);

  html += `<h1>${healthDot(batch.health)} ${batch.id}</h1>`;
  html += `<p class="subtitle">${course.name} · ${ver.label} · ${batch.location}</p>`;

  // Batch details
  html += `<div class="detail-section">`;
  html += `<h3>Batch Details</h3>`;
  html += `<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${batch.status}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Location</span><span class="detail-value">${batch.location}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Start</span><span class="detail-value">${batch.startDate}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">End</span><span class="detail-value">${batch.endDate}</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Week</span><span class="detail-value">${batch.week}</span></div>`;
  html += `</div>`;

  // Cohort
  html += `<div class="detail-section">`;
  html += `<h3>Cohort</h3>`;
  html += `<div class="detail-row"><span class="detail-label">Size</span><span class="detail-value">${batch.cohort.size} learners</span></div>`;
  html += `<div class="detail-row"><span class="detail-label">Profile</span><span class="detail-value">${batch.cohort.profile}</span></div>`;
  html += `</div>`;

  // Funding
  html += `<div class="detail-section">`;
  html += `<h3>Funding Mix</h3>`;
  batch.funding.forEach(f => {
    const adapter = DATA.funding.find(a => a.id === f.source.toLowerCase());
    const cls = f.source === 'Govt' ? 'chip-govt' : f.source === 'CSR' ? 'chip-csr' : 'chip-paid';
    html += `<div style="margin-bottom:0.75rem">`;
    html += `<span class="chip ${cls}">${f.source} ${f.share}%</span> <span style="font-size:0.85rem;color:#555">${f.sponsor}</span>`;
    if (adapter) {
      html += `<div style="font-size:0.8rem;color:#888;margin-top:0.25rem">`;
      html += `Compliance: ${adapter.compliance}<br>`;
      html += `Proof: ${adapter.proof}`;
      html += `</div>`;
    }
    html += `</div>`;
  });
  html += `</div>`;

  // Evidence spine from version
  html += `<div class="detail-section">`;
  html += `<h3>Evidence Spine (from ${ver.version})</h3>`;
  html += `<ul class="evidence-list">`;
  ver.evidenceSpine.forEach(e => {
    html += `<li>${e}</li>`;
  });
  html += `</ul></div>`;

  el.innerHTML = html;
}

/* ── Shared: batch table ── */

function renderBatchTable(bats) {
  let html = `<table class="batch-list">`;
  html += `<tr><th>Health</th><th>Batch</th><th>Location</th><th>Start</th><th>Status</th><th>Funding</th></tr>`;
  bats.forEach(b => {
    html += `<tr onclick="nav('views/batch.html', {id:'${b.id}'})">`;
    html += `<td>${healthDot(b.health)}</td>`;
    html += `<td>${b.id}</td>`;
    html += `<td>${b.location}</td>`;
    html += `<td>${b.startDate}</td>`;
    html += `<td>${b.status}</td>`;
    html += `<td>${fundingChips(b.funding)}</td>`;
    html += `</tr>`;
  });
  html += `</table>`;
  return html;
}
