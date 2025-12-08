// Simple polling dashboard to show intersection counts and provide manual override
const API = 'http://127.0.0.1:5000/api/status';
const OVERRIDE_API = 'http://127.0.0.1:5000/api/override';

async function fetchStatus() {
  try {
    const res = await fetch(API);
    const j = await res.json();
    render(j.store);
  } catch (e) {
    document.getElementById('intersections').innerHTML = '<p style="color:red">Backend not available. Start backend/app.py</p>';
  }
}

function render(store) {
  const container = document.getElementById('intersections');
  container.innerHTML = '';
  if (!store || Object.keys(store).length === 0) {
    container.innerHTML = '<p>No data yet. Start the edge simulator.</p>';
    return;
  }
  for (const k of Object.keys(store)) {
    const s = store[k];
    const card = document.createElement('div');
    card.className = 'card';
    const last = s.data ? (s.data.count || '-') : '-';
    const ts = s.ts ? new Date(s.ts*1000).toLocaleTimeString() : '-';
    card.innerHTML = `<h3>Intersection ${k}</h3>
                      <p><b>Vehicles:</b> ${last}</p>
                      <p><b>Last update:</b> ${ts}</p>`;
    const btn = document.createElement('button');
    btn.innerText = 'Create Diversion';
    btn.onclick = async () => {
      await fetch(OVERRIDE_API, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({intersection:k, action:'divert', notes:'demo'})});
      alert('Override sent for ' + k);
    };
    card.appendChild(btn);
    container.appendChild(card);
  }
}

setInterval(fetchStatus, 2000);
fetchStatus();
