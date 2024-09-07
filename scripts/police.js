var ctx = document.getElementById('stats-chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie', 
            data: {
                labels: ['Speeding', 'Drunk Driving', 'Distracted Driving', 'Weather Conditions', 'Other'],
                datasets: [{
                    label: 'Accident Causes',
                    data: [25, 15, 20, 10, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });



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
        {id: "FIR596232", status: "Open"},
        {id: "FIR596245", status: "Under Investigation"},
        {id: "FIR596564", status: "Closed"}
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
            // Ensure the path here points to the correct FIR details page
            window.open(`fir-details.html?firId=${firId}`, '_blank');
        });
    });
}    

document.addEventListener('DOMContentLoaded', function() {
    populateCaseStatusTable();
    // ... (other initialization code)
});