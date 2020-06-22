new Chart(document.getElementById("bar-chart-horizontal"), {
    type: 'bar',
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "Billable Hours",
          backgroundColor: "#1cc88a",
          data: [4.52,6.85,5.92,7.21,5.2, 1.5, 2.4]
        }, 
        {
          label: "Non-Billable Hours",
          backgroundColor: "#e74a3b",
          data: [3.52, 1.21, 3.32, 2.65, 4.31, 3.4, 2.5]
        }
      ]
    },
    options: {
      legend: { display: false },
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
    }
});