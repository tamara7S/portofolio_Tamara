let dataset = [];
let chartObj = null;

const colorPalette = [
    '#4361ee', '#4cc9f0', '#f72585', '#7209b7', '#ffbe0b', 
    '#fb5607', '#2ecc71', '#3498db', '#9b59b6', '#e67e22'
];

// 1. FUNGSI LOADING FILE
document.getElementById('uploadFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                // Mengonversi excel ke JSON
                dataset = XLSX.utils.sheet_to_json(worksheet);
                initApp();
            } catch (err) {
                alert("Gagal membaca file Excel. Pastikan file tidak diproteksi.");
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (res) => {
                dataset = res.data;
                initApp();
            }
        });
    }
});

// 2. INISIALISASI DAFTAR KOLOM (BADGE)
function initApp() {
    if (dataset.length === 0) return;

    // Aktifkan tombol generate
    document.getElementById('btnGenerate').disabled = false;
    
    // Ambil daftar kolom
    const allCols = Object.keys(dataset[0]);
    
    // Filter kolom ID (opsional, agar lebih bersih)
    const filteredCols = allCols.filter(col => {
        const c = col.toLowerCase();
        return !c.endsWith('id') && !c.includes('id_') && !c.startsWith('id');
    });

    const colListDiv = document.getElementById('colList');
    colListDiv.innerHTML = "<p class='small fw-bold mb-1 mt-2 text-primary text-uppercase'>Sumbu Kolom:</p>";
    
    // Memasukkan badge kolom ke HTML
    filteredCols.forEach(c => {
        colListDiv.innerHTML += `<span class="badge-col" onclick="setColumn('${c}')">${c}</span>`;
    });

    // Set default value di input jika ada primaryGenreName
    const defCol = filteredCols.find(c => c.toLowerCase().includes('primarygenre'));
    if(defCol) {
        document.getElementById('inputManual').value = defCol;
        // Langsung generate grafik pertama kali
        setColumn(defCol);
    }

    alert("GenreAxis: Data Berhasil Dimuat!");
}

// Fungsi shortcut saat badge diklik
function setColumn(name) {
    document.getElementById('inputManual').value = name;
    // Trigger klik tombol generate
    generateVisualisasi();
}

// 3. LOGIKA MEMPROSES GRAFIK
document.getElementById('btnGenerate').addEventListener('click', generateVisualisasi);

function generateVisualisasi() {
    const userInput = document.getElementById('inputManual').value.trim();
    const type = document.getElementById('chartType').value;

    if (dataset.length === 0) return alert("Silakan unggah file terlebih dahulu!");

    // Cari nama kolom asli (case-insensitive)
    const actualKey = Object.keys(dataset[0]).find(k => k.toLowerCase() === userInput.toLowerCase());

    if (!actualKey) {
        alert("Kolom '" + userInput + "' tidak ditemukan. Silakan pilih dari daftar kolom yang muncul.");
        return;
    }

    // Hitung Frekuensi Data
    let counts = {};
    dataset.forEach(row => {
        let val = row[actualKey];
        if (val === null || val === undefined || val === "") val = "Lainnya";
        counts[val] = (counts[val] || 0) + 1;
    });

    // Sorting Descending
    let sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    
    let finalLabels = [];
    let fullLabels = [];
    let finalValues = [];
    let limit = 15; 

    let displayData = sorted.slice(0, limit);
    displayData.forEach(item => {
        let text = String(item[0]);
        fullLabels.push(text);
        let truncated = text.length > 20 ? text.substring(0, 20) + "..." : text;
        finalLabels.push(truncated);
        finalValues.push(item[1]);
    });

    // Gabungkan sisa data jika lebih dari limit
    if (sorted.length > limit) {
        let othersSum = sorted.slice(limit).reduce((acc, curr) => acc + curr[1], 0);
        finalLabels.push("Lain-lain");
        fullLabels.push("Sisa kategori lainnya");
        finalValues.push(othersSum);
    }

    drawChart(finalLabels, finalValues, fullLabels, actualKey, type);
}

// 4. MENGGAMBAR KE CANVAS
function drawChart(labels, values, fullLabels, labelTitle, type) {
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    
    if (chartObj) chartObj.destroy();

    const isLine = type === 'line';

    chartObj = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Muncul',
                data: values,
                backgroundColor: isLine ? 'rgba(59, 130, 246, 0.2)' : colorPalette,
                borderColor: '#3b82f6',
                borderWidth: isLine ? 3 : 1,
                fill: isLine,
                tension: 0.4,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    display: type === 'pie' || type === 'doughnut', 
                    position: 'right' 
                },
                tooltip: {
                    callbacks: {
                        title: (context) => fullLabels[context[0].dataIndex]
                    }
                }
            },
            scales: isLine || type === 'bar' ? {
                x: { ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } } },
                y: { beginAtZero: true }
            } : {}
        }
    });

    generateInterpretation(fullLabels, values, labelTitle);
}

function generateInterpretation(labels, values, title) {
    const top = labels[0];
    const topVal = values[0];
    const total = values.reduce((a, b) => a + b, 0);

    document.getElementById('resultText').innerHTML = `
        <p class="mb-1 text-uppercase small fw-bold text-secondary">Analisis Sumbu: ${title}</p>
        <ul class="small mb-0">
            <li>Kategori paling dominan: <strong>${top}</strong> (${topVal} data).</li>
            <li>Total data yang diproses: <strong>${total} baris</strong>.</li>
        </ul>
    `;
}