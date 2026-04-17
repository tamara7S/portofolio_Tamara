// =============================================
// DATA
// =============================================
const ships = [
  { id: "KPL-001", name: "KRI Nusantara", type: "Kapal Perang", captain: "Kol. Hendra S.", lat: -5.4, lng: 105.2, status: "Operasional", speed: "18 knot", update: "2 mnt lalu", fuel: 82, condition: 91 },
  { id: "KPL-002", name: "MV Sinar Bahari", type: "Kapal Kargo", captain: "Kpt. Andi W.", lat: -6.1, lng: 106.8, status: "Operasional", speed: "14 knot", update: "5 mnt lalu", fuel: 67, condition: 85 },
  { id: "KPL-003", name: "KM Segara Jaya", type: "Kapal Tanker", captain: "Kpt. Budi S.", lat: -7.2, lng: 112.7, status: "Maintenance", speed: "0 knot", update: "1 jam lalu", fuel: 45, condition: 62 },
  { id: "KPL-004", name: "RV Samudra Riset", type: "Kapal Riset", captain: "Dr. Siti R.", lat: -8.5, lng: 115.2, status: "Operasional", speed: "10 knot", update: "8 mnt lalu", fuel: 78, condition: 88 },
  { id: "KPL-005", name: "KRI Macan Tutul", type: "Kapal Patroli", captain: "Kol. Reza F.", lat: -3.8, lng: 128.2, status: "Operasional", speed: "22 knot", update: "1 mnt lalu", fuel: 55, condition: 94 },
  { id: "KPL-006", name: "MV Karya Bangsa", type: "Kapal Kargo", captain: "Kpt. Doni P.", lat: -0.9, lng: 131.3, status: "Berlabuh", speed: "0 knot", update: "3 jam lalu", fuel: 90, condition: 79 },
  { id: "KPL-007", name: "KM Cakrawala", type: "Kapal Feri", captain: "Kpt. Nina L.", lat: -8.7, lng: 121.6, status: "Operasional", speed: "16 knot", update: "4 mnt lalu", fuel: 61, condition: 87 },
  { id: "KPL-008", name: "KRI Diponegoro", type: "Kapal Perang", captain: "Kol. Wahyu A.", lat: -6.9, lng: 108.4, status: "Maintenance", speed: "0 knot", update: "2 jam lalu", fuel: 38, condition: 55 },
  { id: "KPL-009", name: "KM Bahari Jaya", type: "Kapal Feri", captain: "Kpt. Irwan M.", lat: -5.1, lng: 119.4, status: "Operasional", speed: "15 knot", update: "12 mnt lalu", fuel: 72, condition: 83 },
  { id: "KPL-010", name: "MV Timur Agung", type: "Kapal Kargo", captain: "Kpt. Hasan R.", lat: -3.2, lng: 114.6, status: "Berlabuh", speed: "0 knot", update: "5 jam lalu", fuel: 95, condition: 76 },
  { id: "KPL-011", name: "KRI Rencong", type: "Kapal Patroli", captain: "Kol. Dewi A.", lat: 1.2, lng: 104.5, status: "Operasional", speed: "20 knot", update: "3 mnt lalu", fuel: 48, condition: 92 },
  { id: "KPL-012", name: "KM Muria", type: "Kapal Tanker", captain: "Kpt. Yanto S.", lat: -7.8, lng: 110.2, status: "Maintenance", speed: "0 knot", update: "4 jam lalu", fuel: 30, condition: 58 },
];

const logs = [
  { dot: "green", text: "KRI Nusantara meninggalkan Pelabuhan Tanjung Priok menuju Laut Natuna", time: "10:42 WIB" },
  { dot: "amber", text: "KM Segara Jaya masuk jadwal maintenance rutin di Dok PT PAL Surabaya", time: "09:15 WIB" },
  { dot: "teal", text: "MV Karya Bangsa telah berlabuh di Pelabuhan Sorong, Papua Barat", time: "08:30 WIB" },
  { dot: "green", text: "KRI Macan Tutul berhasil menyelesaikan misi patroli Laut Maluku", time: "07:55 WIB" },
  { dot: "red", text: "KRI Diponegoro melaporkan kerusakan sistem navigasi, menunggu teknisi", time: "06:20 WIB" },
];

const maintenanceData = [
  { id: "KPL-003", name: "KM Segara Jaya", type: "Kapal Tanker", issue: "Overhaul mesin utama", priority: "Tinggi", startDate: "10 Apr 2025", estFinish: "25 Apr 2025", progress: 60, technician: "Tim Mesin A" },
  { id: "KPL-008", name: "KRI Diponegoro", type: "Kapal Perang", issue: "Perbaikan sistem navigasi & radar", priority: "Kritis", startDate: "14 Apr 2025", estFinish: "18 Apr 2025", progress: 30, technician: "Tim Elektronik B" },
  { id: "KPL-012", name: "KM Muria", type: "Kapal Tanker", issue: "Penggantian pompa bahan bakar", priority: "Sedang", startDate: "8 Apr 2025", estFinish: "20 Apr 2025", progress: 80, technician: "Tim Mesin C" },
  { id: "KPL-005", name: "KRI Macan Tutul", type: "Kapal Patroli", issue: "Pemeriksaan lambung & cat ulang", priority: "Rendah", startDate: "20 Apr 2025", estFinish: "30 Apr 2025", progress: 5, technician: "Tim Lambung A" },
  { id: "KPL-009", name: "KM Bahari Jaya", type: "Kapal Feri", issue: "Servis rutin 6 bulanan", priority: "Sedang", startDate: "16 Apr 2025", estFinish: "19 Apr 2025", progress: 50, technician: "Tim Servis B" },
];

// =============================================
// STATE
// =============================================
let mapInstance = null;
let statusChartInstance = null;
let laporanChartInstance = null;
let currentPage = "dashboard";

// =============================================
// DATETIME
// =============================================
function updateTime() {
  const el = document.getElementById("datetime");
  if (!el) return;
  const now = new Date();
  el.textContent =
    now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) +
    " — " + now.toLocaleTimeString("id-ID");
}
updateTime();
setInterval(updateTime, 1000);

// =============================================
// NAVIGATION
// =============================================
function navigate(page) {
  currentPage = page;

  // Update active nav
  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle("active", el.dataset.page === page);
  });

  // Render page
  const main = document.querySelector(".main");
  main.innerHTML = "";
  main.appendChild(renderTopbar(page));

  const content = document.createElement("div");
  content.id = "page-content";

  switch (page) {
    case "dashboard": renderDashboard(content); break;
    case "armada": renderArmada(content); break;
    case "peta": renderPeta(content); break;
    case "maintenance": renderMaintenance(content); break;
    case "laporan": renderLaporan(content); break;
    case "pengaturan": renderPengaturan(content); break;
  }

  main.appendChild(content);
}

function renderTopbar(page) {
  const titles = {
    dashboard: { title: "Dashboard Armada", sub: "Monitoring real-time armada kapal PT. PAL Indonesia" },
    armada: { title: "Data Armada", sub: "Daftar lengkap seluruh armada kapal PT. PAL Indonesia" },
    peta: { title: "Peta Armada", sub: "Visualisasi posisi real-time seluruh armada di perairan Indonesia" },
    maintenance: { title: "Maintenance", sub: "Jadwal dan status perawatan armada kapal" },
    laporan: { title: "Laporan", sub: "Ringkasan performa dan aktivitas armada bulanan" },
    pengaturan: { title: "Pengaturan", sub: "Konfigurasi akun dan sistem monitoring" },
  };
  const t = titles[page];
  const header = document.createElement("header");
  header.className = "topbar";
  header.innerHTML = `
    <div>
      <h1 class="page-title">${t.title}</h1>
      <p class="page-sub">${t.sub}</p>
    </div>
    <div class="topbar-right">
      <div class="live-badge">🟢 Live</div>
      <div class="date-time" id="datetime"></div>
    </div>`;
  updateTime();
  setTimeout(updateTime, 100);
  return header;
}

// =============================================
// PAGE: DASHBOARD
// =============================================
function renderDashboard(el) {
  el.innerHTML = `
    <!-- Stat Cards -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">🚢</div>
        <div class="stat-info"><div class="stat-value">24</div><div class="stat-label">Total Kapal</div></div>
        <div class="stat-trend up">+2 bulan ini</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">✅</div>
        <div class="stat-info"><div class="stat-value">16</div><div class="stat-label">Operasional</div></div>
        <div class="stat-trend up">67%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber">⚙️</div>
        <div class="stat-info"><div class="stat-value">5</div><div class="stat-label">Maintenance</div></div>
        <div class="stat-trend down">21%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">⚓</div>
        <div class="stat-info"><div class="stat-value">3</div><div class="stat-label">Berlabuh</div></div>
        <div class="stat-trend neutral">12%</div>
      </div>
    </section>

    <!-- Map + Chart -->
    <section class="row-2col">
      <div class="card map-card">
        <div class="card-header">
          <h2 class="card-title">Peta Posisi Armada</h2>
          <span class="badge blue">Real-time</span>
        </div>
        <div id="map"></div>
      </div>
      <div class="card chart-card">
        <div class="card-header"><h2 class="card-title">Status Armada</h2></div>
        <div class="chart-wrap"><canvas id="statusChart"></canvas></div>
        <div class="chart-legend">
          <span class="legend-item"><span class="dot green"></span>Operasional</span>
          <span class="legend-item"><span class="dot amber"></span>Maintenance</span>
          <span class="legend-item"><span class="dot navy"></span>Berlabuh</span>
        </div>
      </div>
    </section>

    <!-- Table -->
    <section class="card table-card">
      <div class="card-header">
        <h2 class="card-title">Daftar Armada Kapal</h2>
        <div class="table-actions">
          <input class="search-input" type="text" id="searchInput" placeholder="Cari kapal..."/>
          <select class="filter-select" id="filterStatus">
            <option value="">Semua Status</option>
            <option value="Operasional">Operasional</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Berlabuh">Berlabuh</option>
          </select>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>ID Kapal</th><th>Nama Kapal</th><th>Jenis</th><th>Kapten</th>
            <th>Lokasi</th><th>Status</th><th>Kecepatan</th><th>Update</th>
          </tr></thead>
          <tbody id="shipTableBody"></tbody>
        </table>
      </div>
    </section>

    <!-- Log -->
    <section class="card log-card">
      <div class="card-header"><h2 class="card-title">Log Aktivitas Terbaru</h2></div>
      <ul class="log-list" id="logList"></ul>
    </section>`;

  // Init map
  setTimeout(() => {
    initMap("map");
    initStatusChart();
    renderTable(ships);
    renderLog();
    document.getElementById("searchInput").addEventListener("input", filterTable);
    document.getElementById("filterStatus").addEventListener("change", filterTable);
  }, 50);
}

function initMap(containerId) {
  if (mapInstance) { mapInstance.remove(); mapInstance = null; }
  mapInstance = L.map(containerId, { zoomControl: true }).setView([-5.0, 118.0], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(mapInstance);
  const iconColors = { "Operasional": "#22c55e", "Maintenance": "#f59e0b", "Berlabuh": "#0ea5c9" };
  ships.forEach(s => {
    const color = iconColors[s.status];
    const icon = L.divIcon({
      className: "",
      html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 0 0 3px ${color}44;"></div>`,
      iconSize: [14, 14], iconAnchor: [7, 7]
    });
    L.marker([s.lat, s.lng], { icon }).addTo(mapInstance)
      .bindPopup(`<b>${s.name}</b><br/>Jenis: ${s.type}<br/>Kapten: ${s.captain}<br/>Status: <span style="color:${color};font-weight:bold">${s.status}</span><br/>Kecepatan: ${s.speed}`);
  });
}

function initStatusChart() {
  if (statusChartInstance) { statusChartInstance.destroy(); statusChartInstance = null; }
  const ctx = document.getElementById("statusChart");
  if (!ctx) return;
  statusChartInstance = new Chart(ctx.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: ["Operasional", "Maintenance", "Berlabuh"],
      datasets: [{ data: [16, 5, 3], backgroundColor: ["#22c55e", "#f59e0b", "#0ea5c9"], borderColor: "#112240", borderWidth: 3, hoverOffset: 8 }]
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} kapal` } }
      }
    }
  });
}

function renderTable(data) {
  const tbody = document.getElementById("shipTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  data.forEach(s => {
    const cls = s.status === "Operasional" ? "op" : s.status === "Maintenance" ? "maint" : "dock";
    const dot = s.status === "Operasional" ? "🟢" : s.status === "Maintenance" ? "🟡" : "🔵";
    tbody.innerHTML += `
      <tr>
        <td><code style="color:#38bdf8;font-size:12px">${s.id}</code></td>
        <td><b>${s.name}</b></td>
        <td style="color:#94a3b8">${s.type}</td>
        <td>${s.captain}</td>
        <td style="color:#94a3b8">${s.lat.toFixed(1)}°, ${s.lng.toFixed(1)}°</td>
        <td><span class="status-badge ${cls}">${dot} ${s.status}</span></td>
        <td>${s.speed}</td>
        <td style="color:#94a3b8;font-size:12px">${s.update}</td>
      </tr>`;
  });
}

function filterTable() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const f = document.getElementById("filterStatus").value;
  renderTable(ships.filter(s =>
    (s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)) && (f === "" || s.status === f)
  ));
}

function renderLog() {
  const logList = document.getElementById("logList");
  if (!logList) return;
  logs.forEach(l => {
    logList.innerHTML += `
      <li class="log-item">
        <span class="log-dot ${l.dot}"></span>
        <div><div>${l.text}</div><div class="log-time">${l.time}</div></div>
      </li>`;
  });
}

// =============================================
// PAGE: ARMADA
// =============================================
function renderArmada(el) {
  el.innerHTML = `
    <section class="card" style="margin-bottom:20px">
      <div class="card-header">
        <h2 class="card-title">Seluruh Armada Kapal</h2>
        <div class="table-actions">
          <input class="search-input" type="text" id="armadaSearch" placeholder="Cari kapal..."/>
          <select class="filter-select" id="armadaFilter">
            <option value="">Semua Status</option>
            <option value="Operasional">Operasional</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Berlabuh">Berlabuh</option>
          </select>
        </div>
      </div>
      <div class="armada-grid" id="armadaGrid"></div>
    </section>`;

  requestAnimationFrame(() => {
    renderArmadaCards(ships);

  document.getElementById("armadaSearch").addEventListener("input", filterArmada);
  document.getElementById("armadaFilter").addEventListener("change", filterArmada);
});
}

function renderArmadaCards(data) {
  const grid = document.getElementById("armadaGrid");
  if (!grid) return;
  grid.innerHTML = "";
  if (data.length === 0) {
    grid.innerHTML = `<div style="text-align:center;padding:40px;color:#94a3b8">Tidak ada kapal ditemukan.</div>`;
    return;
  }
  data.forEach(s => {
    const cls = s.status === "Operasional" ? "op" : s.status === "Maintenance" ? "maint" : "dock";
    const dot = s.status === "Operasional" ? "🟢" : s.status === "Maintenance" ? "🟡" : "🔵";
    const fuelColor = s.fuel >= 70 ? "#22c55e" : s.fuel >= 40 ? "#f59e0b" : "#ef4444";
    const condColor = s.condition >= 75 ? "#22c55e" : s.condition >= 55 ? "#f59e0b" : "#ef4444";
    grid.innerHTML += `
      <div class="armada-card">
        <div class="armada-card-header">
          <div>
            <div class="armada-ship-name">${s.name}</div>
            <div class="armada-ship-type">${s.type}</div>
          </div>
          <span class="status-badge ${cls}">${dot} ${s.status}</span>
        </div>
        <div class="armada-detail">
          <div class="armada-row"><span class="armada-key">ID</span><span class="armada-val" style="color:#38bdf8">${s.id}</span></div>
          <div class="armada-row"><span class="armada-key">Kapten</span><span class="armada-val">${s.captain}</span></div>
          <div class="armada-row"><span class="armada-key">Kecepatan</span><span class="armada-val">${s.speed}</span></div>
          <div class="armada-row"><span class="armada-key">Koordinat</span><span class="armada-val">${s.lat.toFixed(1)}°, ${s.lng.toFixed(1)}°</span></div>
          <div class="armada-row"><span class="armada-key">Update</span><span class="armada-val" style="color:#94a3b8">${s.update}</span></div>
        </div>
        <div class="armada-bars">
          <div class="bar-row">
            <span class="bar-label">BBM</span>
            <div class="bar-track"><div class="bar-fill" style="width:${s.fuel}%;background:${fuelColor}"></div></div>
            <span class="bar-val">${s.fuel}%</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">Kondisi</span>
            <div class="bar-track"><div class="bar-fill" style="width:${s.condition}%;background:${condColor}"></div></div>
            <span class="bar-val">${s.condition}%</span>
          </div>
        </div>
      </div>`;
  });
}

function filterArmada() {
  const q = document.getElementById("armadaSearch").value.toLowerCase();
  const f = document.getElementById("armadaFilter").value;
  renderArmadaCards(ships.filter(s =>
    (s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)) && (f === "" || s.status === f)
  ));
}

// =============================================
// PAGE: PETA
// =============================================
function renderPeta(el) {
  el.innerHTML = `
    <section class="card" style="margin-bottom:20px">
      <div class="card-header">
        <h2 class="card-title">Peta Posisi Armada</h2>
        <div class="table-actions">
          <select class="filter-select" id="petaFilter">
            <option value="">Semua Status</option>
            <option value="Operasional">Operasional</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Berlabuh">Berlabuh</option>
          </select>
        </div>
      </div>
      <div class="peta-legend">
        <span class="legend-item"><span class="dot green"></span>Operasional</span>
        <span class="legend-item"><span class="dot amber"></span>Maintenance</span>
        <span class="legend-item"><span class="dot navy"></span>Berlabuh</span>
      </div>
      <div id="mapFull" style="height:520px;border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);"></div>
    </section>`;

  setTimeout(() => {
    if (mapInstance) { mapInstance.remove(); mapInstance = null; }
    mapInstance = L.map("mapFull", { zoomControl: true }).setView([-5.0, 118.0], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(mapInstance);

    const iconColors = { "Operasional": "#22c55e", "Maintenance": "#f59e0b", "Berlabuh": "#0ea5c9" };
    let markers = [];

    function drawMarkers(filter) {
      markers.forEach(m => mapInstance.removeLayer(m));
      markers = [];
      ships.filter(s => !filter || s.status === filter).forEach(s => {
        const color = iconColors[s.status];
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:2.5px solid white;box-shadow:0 0 0 4px ${color}44;"></div>`,
          iconSize: [16, 16], iconAnchor: [8, 8]
        });
        const m = L.marker([s.lat, s.lng], { icon }).addTo(mapInstance)
          .bindPopup(`<b>${s.name}</b><br/>Jenis: ${s.type}<br/>Kapten: ${s.captain}<br/>Status: <span style="color:${color};font-weight:bold">${s.status}</span><br/>Kecepatan: ${s.speed}<br/>Update: ${s.update}`);
        markers.push(m);
      });
    }

    drawMarkers("");
    document.getElementById("petaFilter").addEventListener("change", e => drawMarkers(e.target.value));
  }, 50);
}

// =============================================
// PAGE: MAINTENANCE
// =============================================
function renderMaintenance(el) {
  const kritis = maintenanceData.filter(m => m.priority === "Kritis").length;
  const tinggi = maintenanceData.filter(m => m.priority === "Tinggi").length;

  el.innerHTML = `
    <section class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="stat-card">
        <div class="stat-icon amber">🔧</div>
        <div class="stat-info"><div class="stat-value">${maintenanceData.length}</div><div class="stat-label">Dalam Perbaikan</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">🚨</div>
        <div class="stat-info"><div class="stat-value">${kritis}</div><div class="stat-label">Prioritas Kritis</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber">⚠️</div>
        <div class="stat-info"><div class="stat-value">${tinggi}</div><div class="stat-label">Prioritas Tinggi</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">✅</div>
        <div class="stat-info"><div class="stat-value">7</div><div class="stat-label">Selesai Bulan Ini</div></div>
      </div>
    </section>

    <section class="card">
      <div class="card-header"><h2 class="card-title">Jadwal Maintenance Aktif</h2></div>
      <div class="maint-list" id="maintList"></div>
    </section>`;

requestAnimationFrame(() => {
    const list = document.getElementById("maintList");
    if (!list) return;

    list.innerHTML = "";

    maintenanceData.forEach(m => {
      const pCls =
        m.priority === "Kritis" ? "maint-p-kritis" :
        m.priority === "Tinggi" ? "maint-p-tinggi" :
        m.priority === "Sedang" ? "maint-p-sedang" :
        "maint-p-rendah";

      const barColor =
        m.progress >= 70 ? "#22c55e" :
        m.progress >= 40 ? "#0ea5c9" :
        "#f59e0b";

      list.innerHTML += `
        <div class="maint-item">
          <div class="maint-top">
            <div>
              <div class="maint-name">${m.name}
                <span style="color:#38bdf8;font-size:12px;margin-left:6px">${m.id}</span>
              </div>
              <div class="maint-issue">🔧 ${m.issue}</div>
            </div>
            <span class="maint-priority ${pCls}">${m.priority}</span>
          </div>

          <div class="maint-meta">
            <span>👤 ${m.technician}</span>
            <span>📅 Mulai: ${m.startDate}</span>
            <span>🏁 Est. Selesai: ${m.estFinish}</span>
          </div>

          <div class="maint-progress-row">
            <div class="bar-track" style="flex:1">
              <div class="bar-fill" style="width:${m.progress}%;background:${barColor};height:8px;border-radius:4px"></div>
            </div>
            <span class="bar-val">${m.progress}%</span>
          </div>
        </div>`;
    });
  });
}

// =============================================
// PAGE: LAPORAN
// =============================================
function renderLaporan(el) {
  el.innerHTML = `
    <section class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="stat-card">
        <div class="stat-icon green">📈</div>
        <div class="stat-info"><div class="stat-value">94.2%</div><div class="stat-label">Uptime Armada</div></div>
        <div class="stat-trend up">+1.8%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue">⛽</div>
        <div class="stat-info"><div class="stat-value">18.4K</div><div class="stat-label">Liter BBM (bulan ini)</div></div>
        <div class="stat-trend down">-3.1%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber">🚢</div>
        <div class="stat-info"><div class="stat-value">1.240</div><div class="stat-label">Total Jam Pelayaran</div></div>
        <div class="stat-trend up">+5.2%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">🔧</div>
        <div class="stat-info"><div class="stat-value">Rp 2.1M</div><div class="stat-label">Biaya Maintenance</div></div>
        <div class="stat-trend neutral">Bulan ini</div>
      </div>
    </section>

    <section class="row-2col">
      <div class="card">
        <div class="card-header"><h2 class="card-title">Tren Operasional Kapal (6 Bulan)</h2></div>
        <div style="height:260px"><canvas id="laporanChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header"><h2 class="card-title">Distribusi Jenis Kapal</h2></div>
        <div style="height:260px;display:flex;align-items:center;justify-content:center"><canvas id="jenisChart"></canvas></div>
      </div>
    </section>

    <section class="card">
      <div class="card-header"><h2 class="card-title">Ringkasan Aktivitas Bulan Ini</h2></div>
      <div class="laporan-table-wrap">
        <table>
          <thead><tr><th>Kapal</th><th>Jam Operasi</th><th>Jarak Tempuh</th><th>BBM Terpakai</th><th>Insiden</th><th>Status Akhir</th></tr></thead>
          <tbody>
            <tr><td><b>KRI Nusantara</b></td><td>312 jam</td><td>4.200 nm</td><td>2.800 L</td><td style="color:#22c55e">0</td><td><span class="status-badge op">🟢 Operasional</span></td></tr>
            <tr><td><b>MV Sinar Bahari</b></td><td>280 jam</td><td>3.800 nm</td><td>3.100 L</td><td style="color:#22c55e">0</td><td><span class="status-badge op">🟢 Operasional</span></td></tr>
            <tr><td><b>KM Segara Jaya</b></td><td>120 jam</td><td>1.200 nm</td><td>1.100 L</td><td style="color:#ef4444">1</td><td><span class="status-badge maint">🟡 Maintenance</span></td></tr>
            <tr><td><b>KRI Macan Tutul</b></td><td>330 jam</td><td>5.100 nm</td><td>2.400 L</td><td style="color:#22c55e">0</td><td><span class="status-badge op">🟢 Operasional</span></td></tr>
            <tr><td><b>MV Karya Bangsa</b></td><td>190 jam</td><td>2.900 nm</td><td>2.200 L</td><td style="color:#22c55e">0</td><td><span class="status-badge dock">🔵 Berlabuh</span></td></tr>
          </tbody>
        </table>
      </div>
    </section>`;

  setTimeout(() => {
    // Tren chart
    const ctx1 = document.getElementById("laporanChart");
    if (ctx1) {
      new Chart(ctx1.getContext("2d"), {
        type: "line",
        data: {
          labels: ["Nov", "Des", "Jan", "Feb", "Mar", "Apr"],
          datasets: [
            { label: "Operasional", data: [14, 15, 13, 16, 15, 16], borderColor: "#22c55e", backgroundColor: "rgba(34,197,94,0.08)", tension: 0.4, fill: true },
            { label: "Maintenance", data: [4, 3, 6, 4, 5, 5], borderColor: "#f59e0b", backgroundColor: "rgba(245,158,11,0.08)", tension: 0.4, fill: true },
            { label: "Berlabuh", data: [3, 3, 2, 1, 3, 3], borderColor: "#0ea5c9", backgroundColor: "rgba(14,165,201,0.08)", tension: 0.4, fill: true },
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { labels: { color: "#94a3b8", font: { size: 12 } } } },
          scales: {
            x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.05)" } },
            y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.05)" }, min: 0, max: 20 }
          }
        }
      });
    }
    // Jenis chart
    const ctx2 = document.getElementById("jenisChart");
    if (ctx2) {
      new Chart(ctx2.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: ["Kapal Perang", "Kapal Kargo", "Kapal Tanker", "Kapal Feri", "Kapal Riset", "Kapal Patroli"],
          datasets: [{ data: [4, 6, 4, 4, 3, 3], backgroundColor: ["#0ea5c9","#22c55e","#f59e0b","#8b5cf6","#ef4444","#38bdf8"], borderColor: "#112240", borderWidth: 3 }]
        },
        options: {
          cutout: "60%",
          plugins: { legend: { position: "right", labels: { color: "#94a3b8", font: { size: 11 }, boxWidth: 12 } } }
        }
      });
    }
  }, 50);
}

// =============================================
// PAGE: PENGATURAN
// =============================================
function renderPengaturan(el) {
  el.innerHTML = `
    <div class="settings-grid">
      <!-- Profil -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Profil Pengguna</h2></div>
        <div class="profile-section">
          <div class="profile-avatar">TR</div>
          <div>
            <div class="profile-name">Tamara Rani Meilita</div>
            <div class="profile-role">Fleet Officer — PT. PAL Indonesia</div>
            <div class="profile-email">tamara.rani@pal.co.id</div>
          </div>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label class="form-label">Nama Lengkap</label>
            <input class="form-input" type="text" value="Tamara Rani Meilita"/>
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" value="tamara.rani@pal.co.id"/>
          </div>
          <div class="form-group">
            <label class="form-label">Jabatan</label>
            <input class="form-input" type="text" value="Fleet Officer"/>
          </div>
          <button class="btn-save" onclick="showToast('Profil berhasil disimpan!')">💾 Simpan Perubahan</button>
        </div>
      </div>

      <!-- Sistem -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Pengaturan Sistem</h2></div>
        <div class="settings-form">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Notifikasi Real-time</div>
              <div class="toggle-desc">Terima alert untuk status kapal kritis</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked/>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Auto Refresh Peta</div>
              <div class="toggle-desc">Perbarui posisi kapal setiap 30 detik</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked/>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Alert Maintenance</div>
              <div class="toggle-desc">Notifikasi jadwal maintenance mendekati</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox"/>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Email Report Mingguan</div>
              <div class="toggle-desc">Kirim laporan otomatis setiap Senin</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked/>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="form-group" style="margin-top:16px">
            <label class="form-label">Interval Refresh (detik)</label>
            <select class="form-input">
              <option>15</option><option selected>30</option><option>60</option><option>120</option>
            </select>
          </div>
          <button class="btn-save" onclick="showToast('Pengaturan sistem disimpan!')">💾 Simpan Pengaturan</button>
        </div>
      </div>

      <!-- Info sistem -->
      <div class="card" style="grid-column:1/-1">
        <div class="card-header"><h2 class="card-title">Informasi Sistem</h2></div>
        <div class="sysinfo-grid">
          <div class="sysinfo-item"><span class="sysinfo-key">Versi Aplikasi</span><span class="sysinfo-val">FleetWatch v2.4.1</span></div>
          <div class="sysinfo-item"><span class="sysinfo-key">Database</span><span class="sysinfo-val" style="color:#22c55e">● Terhubung</span></div>
          <div class="sysinfo-item"><span class="sysinfo-key">API Status</span><span class="sysinfo-val" style="color:#22c55e">● Online</span></div>
          <div class="sysinfo-item"><span class="sysinfo-key">Last Sync</span><span class="sysinfo-val">16 April 2025, 10:42 WIB</span></div>
          <div class="sysinfo-item"><span class="sysinfo-key">Dikembangkan oleh</span><span class="sysinfo-val">Tamara Rani Meilita</span></div>
          <div class="sysinfo-item"><span class="sysinfo-key">Institusi</span><span class="sysinfo-val">Universitas Negeri Malang</span></div>
        </div>
      </div>
    </div>

    <div id="toast" class="toast hidden"></div>`;
}

function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = "✅ " + msg;
  t.classList.remove("hidden");
  t.classList.add("show");
  setTimeout(() => { t.classList.remove("show"); t.classList.add("hidden"); }, 2800);
}

// =============================================
// INIT
// =============================================
document.querySelectorAll(".nav-item").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    navigate(el.dataset.page);
  });
});

// Init dashboard on load
navigate("dashboard");