// // Chart
// let chartData = {
//     labels: [],
//     datasets: [
//         // {
//         //     label: 'Gas Value MQ4',
//         //     data: [],
//         //     borderColor: '#1e90ff',
//         //     backgroundColor: 'rgba(0, 102, 204, 0.2)',
//         //     fill: true,
//         //     tension: 0.5,
//         // },
//         {
//             label: 'Propane/Butane Value',
//             data: [],
//             borderColor: '#ab1111',
//             backgroundColor: 'rgba(153, 0, 51, 0.2)',
//             fill: true,
//             tension: 0.5,
//         },
//         {
//             label: 'Hydrogen Value',
//             data: [],
//             borderColor: '#32cd32',
//             backgroundColor: 'rgba(0, 153, 76, 0.2)',
//             fill: true,
//             tension: 0.5,
//         }
//     ]
// };

// const canvas = document.getElementById('gasChart');
// const parent = canvas.parentElement;

// const ctx = document.getElementById('gasChart').getContext('2d');
// const gasChart = new Chart(ctx, {
//     type: 'line',
//     data: chartData,
//     options: {
//         responsive: true,
//         maintainAspectRatio: true, // Tambahkan ini
//         plugins: {
//             legend: {
//                 display: true,
//                 labels: { color: '#ffffff' }
//             }
//         },
//         scales: {
//             x: {
//                 ticks: { color: '#ffffff' }
//             },
//             y: {
//                 ticks: { color: '#ffffff' },
//                 beginAtZero: true
//             }
//         },
//         layout: {
//             backgroundColor: 'rgba(0, 0, 0, 0)'
//         }
//     }
// });

// parent.style.alignItems = "center";
// parent.style.justifyContent = "center";
// parent.style.overflow = "hidden";

// document.getElementById('gasChart').style.backgroundColor = '#343a40';

// const roomSelect   = document.getElementById('room-select');
// const deviceSelect = document.getElementById('device-select');
// let interval;

// // Reset dan redraw chart kosong
// function clearChart() {
//     gasChart.data.labels = [];
//     gasChart.data.datasets.forEach(ds => ds.data = []);
//     gasChart.update();
// }

// // Fetch & update chart berdasarkan room+device terpilih
// function updateChart() {
//     const roomId   = roomSelect.value;
//     const deviceId = deviceSelect.value;

//     // Jangan fetch kalau salah satu dropdown belum dipilih
//     if (!roomId || !deviceId) return;

//     fetch(`/api/sensor?room_name=${roomId}&device_id=${deviceId}`)
//         .then(res => res.json())
//         .then(data => {
//             const labels = [];
//             const mq6_values = [];
//             const mq8_values = [];

//             data.forEach(sensor => {
//                 const d = new Date(sensor.created_at);
//                 labels.push(d.toLocaleString("id-ID", {
//                     year: "numeric",
//                     month: "2-digit",
//                     day: "2-digit",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     second: "2-digit"
//                 }));
//                 mq6_values.push(sensor.mq6_value);
//                 mq8_values.push(sensor.mq8_value);
//             });

//             gasChart.data.labels              = labels;
//             gasChart.data.datasets[0].data    = mq6_values;
//             gasChart.data.datasets[1].data    = mq8_values;
//             gasChart.update();
//         })
//         .catch(err => console.error('Error fetching data:', err));
// }

// document.getElementById('room-select').addEventListener('change', function() {
//     var roomName = this.value;
//     fetch(`/devices/by-room?room_name=${roomName}`)
//         .then(response => response.json())
//         .then(data => {
//             var deviceSelect = document.getElementById('device-select');
//             deviceSelect.innerHTML = '<option value="">Semua Perangkat</option>';
//             data.forEach(function(device) {
//                 var option = document.createElement('option');
//                 option.value = device.id;
//                 option.text = device.name;
//                 deviceSelect.appendChild(option);
//             });
//         });
// });

// // $(document).ready(function() {
// //     $('#room_name').change(function() {
// //         var roomName = $(this).val();

// //         if (roomName !== "") {
// //             $.ajax({
// //                 url: '/devices/by-room',
// //                 type: 'GET',
// //                 data: { room_name: roomName },
// //                 success: function(data) {
// //                     var deviceSelect = $('#device_id');
// //                     deviceSelect.empty();
// //                     deviceSelect.append('<option value="">Pilih Perangkat</option>');

// //                     data.forEach(function(device) {
// //                         deviceSelect.append('<option value="' + device.id + '">' + device.name + '</option>');
// //                     });
// //                 },
// //                 error: function(xhr) {
// //                     console.error("Gagal mengambil perangkat", xhr);
// //                 }
// //             });
// //         } else {
// //             $('#device_id').empty().append('<option value="">Pilih Perangkat</option>');
// //         }
// //     });
// // });


// // Ketika ganti Ruangan → reset chart, hentikan interval, kosongkan device-select dan fetch opsi baru
// roomSelect.addEventListener('change', () => {
//     clearChart();
//     if (interval) clearInterval(interval);

//     // kosongkan pilihan perangkat
//     deviceSelect.innerHTML = '<option value="">Pilih Perangkat</option>';

//     const roomId = roomSelect.value;
//     if (!roomId) return;

//     // fetch device by room
//     fetch(`/devices/by-room/${roomId}`)
//         .then(res => res.json())
//         .then(json => {
//             json.devices.forEach(dev => {
//                 const opt = document.createElement('option');
//                 opt.value       = dev.id;
//                 opt.textContent = dev.name;
//                 deviceSelect.appendChild(opt);
//             });
//         })
//         .catch(err => console.error(err));
// });

// // Ketika ganti Device → reset chart, hentikan interval, lalu mulai fetch+interval
// deviceSelect.addEventListener('change', () => {
//     clearChart();
//     if (interval) clearInterval(interval);

//     // langsung satu kali, lalu interval tiap 5 detik
//     updateChart();
//     interval = setInterval(updateChart, 5000);
// });

// // Resize Chart otomatis
// window.addEventListener("resize", () => gasChart.resize());



// // let currentDeviceId = null;
// // let interval = null;

// // function updateChart(deviceId) {
// //     if (!deviceId || deviceId !== currentDeviceId) return;

// //     fetch(`/api/sensor?device_id=${deviceId}`)
// //         .then(response => response.json())
// //         .then(data => {
// //             let labels = [];
// //             // let mq4_values = [];
// //             let mq6_values = [];
// //             let mq8_values = [];

// //             data.forEach(sensor => {
// //                 let date = new Date(sensor.created_at);
// //                 let formattedDate = date.toLocaleString("id-ID", {
// //                     year: "numeric",
// //                     month: "2-digit",
// //                     day: "2-digit",
// //                     hour: "2-digit",
// //                     minute: "2-digit",
// //                     second: "2-digit"
// //                 });

// //                 labels.push(formattedDate);
// //                 // mq4_values.push(sensor.mq4_value);
// //                 mq6_values.push(sensor.mq6_value);
// //                 mq8_values.push(sensor.mq8_value);
// //             });

// //             gasChart.data.labels = labels;
// //             // gasChart.data.datasets[0].data = mq4_values;
// //             gasChart.data.datasets[0].data = mq6_values;
// //             gasChart.data.datasets[1].data = mq8_values;
// //             gasChart.update();
// //         })
// //         .catch(error => console.error('Error fetching data:', error));
// // }

// // let deviceSelect = document.getElementById('device-select');
// // deviceSelect.addEventListener('change', function () {
// //     let deviceId = this.value;
// //     currentDeviceId = deviceId;

// //     gasChart.data.labels = [];
// //     gasChart.data.datasets.forEach(dataset => dataset.data = []);
// //     gasChart.update();

// //     if (interval) clearInterval(interval);

// //     updateChart(deviceId);

// //     interval = setInterval(() => {
// //         updateChart(deviceId);
// //     }, 5000);
// // });

// // updateChart(currentDeviceId);

// // window.addEventListener("resize", function () {
// //     gasChart.resize();
// // });

// //Card
// function updateCards(deviceId) {
//     if (!deviceId || deviceId !== currentDeviceId) return;

//     fetch(`/api/sensor?device_id=${deviceId}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.length > 0) {
//                 let latestData = data[data.length - 1]; // Ambil data terbaru

//                 // document.getElementById("mq4-value").textContent = latestData.mq4_value;
//                 document.getElementById("mq6-value").textContent = latestData.mq6_value;
//                 document.getElementById("mq8-value").textContent = latestData.mq8_value;
//             }
//         })
//         .catch(error => console.error("Error fetching data:", error));
// }

// document.addEventListener("DOMContentLoaded", function () {
//     function updateCards(deviceId) {
//         if (!deviceId || deviceId !== currentDeviceId) return;

//         fetch(`/api/sensor?device_id=${deviceId}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.length > 0) {
//                     let latestData = data[data.length - 1]; // Ambil data terbaru

//                     // let mq4 = document.getElementById("mq4-value");
//                     let mq6 = document.getElementById("mq6-value");
//                     let mq8 = document.getElementById("mq8-value");

//                     if (/*mq4 &&*/ mq6 && mq8) {
//                         // mq4.textContent = latestData.mq4_value;
//                         mq6.textContent = latestData.mq6_value;
//                         mq8.textContent = latestData.mq8_value;
//                     } else {
//                         console.error("Elemen card tidak ditemukan!");
//                     }
//                 }
//             })
//             .catch(error => console.error("Error fetching data:", error));
//     }

//     updateCards(currentDeviceId);
// });


// deviceSelect.addEventListener("change", function () {
//     let deviceId = this.value;
//     currentDeviceId = deviceId;

//     if (interval) clearInterval(interval);

//     // Update chart & card setiap 5 detik
//     updateChart(deviceId);
//     updateCards(deviceId);

//     interval = setInterval(() => {
//         updateChart(deviceId);
//         updateCards(deviceId);
//     }, 5000);
// });

// // Jalankan saat halaman pertama kali dibuka
// updateCards(currentDeviceId);


let alertHistory = [];

let chartData = {
    labels: [],
    datasets: [
        {
            label: 'Propane/Butane Value',
            data: [],
            borderColor: '#ab1111',
            backgroundColor: 'rgba(153, 0, 51, 0.2)',
            fill: true,
            tension: 0.5,
        },
        {
            label: 'Hydrogen Value',
            data: [],
            borderColor: '#32cd32',
            backgroundColor: 'rgba(0, 153, 76, 0.2)',
            fill: true,
            tension: 0.5,
        }
    ]
};

const ctx = document.getElementById('gasChart').getContext('2d');
const gasChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                labels: { color: '#ffffff' }
            }
        },
        scales: {
            x: {
                ticks: { color: '#ffffff' }
            },
            y: {
                ticks: { color: '#ffffff' },
                beginAtZero: true
            }
        }
    }
});

document.getElementById('gasChart').style.backgroundColor = '#343a40';

const roomSelect   = document.getElementById('room-select');
const deviceSelect = document.getElementById('device-select');
let currentDeviceId = null;
let interval = null;

function clearChart() {
    gasChart.data.labels = [];
    gasChart.data.datasets.forEach(ds => ds.data = []);
    gasChart.update();
}

function updateChart() {
    const roomId   = roomSelect.value;
    const deviceId = deviceSelect.value;

    if (!roomId || !deviceId) return;

    fetch(`/api/sensor?room_name=${roomId}&device_id=${deviceId}`)
        .then(res => res.json())
        .then(data => {

            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            const labels = [];
            const mq6_values = [];
            const mq8_values = [];

            data.forEach(sensor => {
                const d = new Date(sensor.created_at);
                labels.push(d.toLocaleString("id-ID"));
                mq6_values.push(sensor.mq6_value);
                mq8_values.push(sensor.mq8_value);
            });

            gasChart.data.labels = labels.reverse();
            gasChart.data.datasets[0].data = mq6_values.reverse();
            gasChart.data.datasets[1].data = mq8_values.reverse();
            gasChart.update();

            // === Update Sensor Cards (ambil data terakhir) ===
            if (data.length > 0) {
                const latest = data[0];
                document.getElementById("mq6-value").textContent = latest.mq6_value;
                document.getElementById("mq8-value").textContent = latest.mq8_value;
            }
        })
        .catch(err => console.error('Error fetching data:', err));
}

// function updateCards(deviceId) {
//     if (!deviceId) return;

//     fetch(`/api/sensor?device_id=${deviceId}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.length > 0) {
//                 let latestData = data[data.length - 1];
//                 document.getElementById("mq6-value").textContent = latestData.mq6_value;
//                 document.getElementById("mq8-value").textContent = latestData.mq8_value;
//             }
//         })
//         .catch(error => console.error("Error fetching data:", error));
// }

roomSelect.addEventListener("change", () => {
    clearChart();
    if (interval) clearInterval(interval);

    deviceSelect.innerHTML = '<option value="">Pilih Perangkat</option>';

    const roomId = roomSelect.value;
    if (!roomId) return;

    fetch(`/devices/by-room?room_name=${roomId}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(device => {
                const opt = document.createElement('option');
                opt.value = device.id;
                opt.textContent = device.name;
                deviceSelect.appendChild(opt);
            });
        })
        .catch(err => console.error(err));
});

deviceSelect.addEventListener("change", () => {
    clearChart();
    if (interval) clearInterval(interval);

    currentDeviceId = deviceSelect.value;

    updateChart();
    // updateCards(currentDeviceId);

    interval = setInterval(() => {
        updateChart();
        // updateCards(currentDeviceId);
    }, 5000);
});


// Function to periodically check gas levels
function checkGasAlerts() {
    fetch('/api/check-gas-alerts')
        .then(response => response.json())
        .then(data => {
            // Push notification panel
            updatePushNotificationPanel(data.alerts || []);

            // Gas popup
            if (data.alertTriggered) {
                const timestamp = new Date().toLocaleString('id-ID');
                const alertMessage = `🚨 [${timestamp}] MQ6: ${data.mq6_value} ppm, MQ8: ${data.mq8_value} ppm`;

                // Add to alert history
                alertHistory.push(alertMessage);

                // Optionally save in localStorage (optional)
                localStorage.setItem("alertHistory", JSON.stringify(alertHistory));

                // Show popup
                showGasAlertPopup(data.mq6_value, data.mq8_value);
            }
        })
        .catch(error => console.error('Error checking gas level:', error));
}



// Function to show the popup
function showGasAlertPopup(mq6Value, mq8Value) {
    const message = `
        ⚠️ Gas Level Alert! ⚠️
        Propane/Butane Gas (MQ6): ${mq6Value} ppm
        Hydrogen Gas (MQ8): ${mq8Value} ppm
        Please take appropriate action. 🚨
    `;
    let proceed = confirm(message);

}

function updatePushNotificationPanel(alerts) {
    const badge = document.getElementById('alert-badge-count');
    const list = document.getElementById('alert-list');
    list.innerHTML = '';

    // Get dismissed alert messages from localStorage
    const dismissedAlerts = JSON.parse(localStorage.getItem("dismissedAlerts")) || [];

    const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.message));

    if (activeAlerts.length === 0) {
        badge.style.display = 'none';
        list.innerHTML = '<div class="text-sm text-muted">No active alerts</div>';
        return;
    }

    badge.textContent = activeAlerts.length;
    badge.style.display = 'inline';
  
    activeAlerts.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.className = 'dropdown-item text-danger alert-item';
        alertItem.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${alert.message}`;
        
        // Add click handler to dismiss alert
        alertItem.addEventListener("click", () => {
            dismissedAlerts.push(alert.message);
            localStorage.setItem("dismissedAlerts", JSON.stringify(dismissedAlerts));
            updatePushNotificationPanel(alerts); // re-render
        });



        list.appendChild(alertItem);
    });
  }

// Check gas level periodically (every 5 seconds)
setInterval(checkGasAlerts, 5000);  // 5 seconds interval


window.addEventListener("resize", () => gasChart.resize());
