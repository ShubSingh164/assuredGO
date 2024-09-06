        document.addEventListener('DOMContentLoaded', function() {
            var map = L.map('map', {
                scrollWheelZoom: false,
                touchZoom: true
            }).setView([30.7688, 76.5754], 13);
        
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
        
            function updateMap(lat, lon) {
                map.setView([lat, lon], 13);
                L.marker([lat, lon]).addTo(map)
                    .bindPopup('Current Location')
                    .openPopup();
            }
        
            async function fetchLocation() {
                try {
                    let response = await fetch('/location');
                    let data = await response.json();
                    updateMap(data.lat, data.lon);
                } catch (error) {
                    console.error('Error fetching location:', error);
                }
            }
        
            setInterval(fetchLocation, 10000);
        
            map.touchZoom.enable();
            map.scrollWheelZoom.disable();
        });
        




function populateCaseStatusTable() {
    const tbody = document.getElementById('case-status-tbody');
    const cases = [
        {id: "HOS1234", status: "Open"},
        {id: "HOS2343", status: "Under Investigation"},
        {id: "HOS4567", status: "Closed"}
    ];

    const latestFIR = JSON.parse(localStorage.getItem('latestFIR'));
    if (latestFIR) {
        cases.unshift(latestFIR);
        localStorage.removeItem('latestFIR');
    }

    tbody.innerHTML = '';

    cases.forEach(case_ => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = case_.id;
        row.insertCell(1).textContent = case_.status;
        const actionsCell = row.insertCell(2);
        actionsCell.innerHTML = `
            <button class="btn btn-sm  view-fir-btn" data-id="${case_.id}" style="color:white; background-color: #0C5FCD;">View</button>
            <button class="btn btn-sm " style="background-color: #D0E4FF">Edit</button>`;
    });

    document.querySelectorAll('.view-fir-btn').forEach(button => {
        button.addEventListener('click', function() {
            const firId = this.getAttribute('data-id');
            window.open(`hospital_view.html?firId=${firId}`, '_blank');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    populateCaseStatusTable();
    // ... (other initialization code)
});