class View {
    static barItem = document.querySelector('#myBarChart');
    static doughnutItem = document.querySelector('#myDoughnutChart');
    static lineItem = document.querySelector('#locationChart');
    static fiveLeadsTable = document.querySelector('table');

    constructor() {

        this.doughnutChart;
        this.barChart;
        this.locationChart;
    }

    getHello() {
        this.onHello();
    }

    getBarChart() {
        const config = {
            type: 'bar',
            data: {
                labels: ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                datasets: [{
                    label: 'Total de visitas al día',
                    data: [0, 0, 0, 0, 0],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
        this.barChart = new Chart(View.barItem, config);
        //this.barChartUpdate(this.barChart);
    }

    getDoughnutChart() {
        const data = {
            labels: [
                'Android',
                'iOS',
                'Other'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [50, 50, 50],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(94, 200, 235)'
                ],
                hoverOffset: 4
            }]
        };
        const config = {
            type: 'doughnut',
            data: data,
        };

        this.doughnutChart = new Chart(View.doughnutItem, config);
        //this.doughnutChartUpdate(this.doughnutChart);
    }

    getLocationChart() {
        const labels = ['Pance', 'Ciudad Jardín', 'Pereira'];
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: [1, 1, 1],
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data: data,
        };
        this.locationChart = new Chart(View.lineItem, config);
    }

    updateTable(newData) {
        View.fiveLeadsTable.innerHTML = '';
        //console.table(newData);
        newData.forEach(element => {
            let row = document.createElement('tr');
            row.innerHTML =
                `<td>${element.name}</td>
             <td>${element.email}</td>
             <td>${element.date}</td>
             `
            View.fiveLeadsTable.appendChild(row);
        });
    }

    updateBarChart(newDataset) {
        //console.log(this.barChart);
        //console.log('Hey within Update barChart');
        this.barChart.data.datasets[0].data = newDataset.splice(2);
        //this.barChart.data.labels = newDataset.labels;
        this.barChart.update();
    }

    // [pance: number, ciudad-jardin: number, pereira: number]
    updateLocationChart(newDataset) {
        this.locationChart.data.datasets[0].data = newDataset;
        this.locationChart.update();
    }

    updateDoughnutChart(newDataset) {
        //console.log(this.doughnutChart);
        //console.log('Hey within Update doughnutChart');
        console.log('Previous dataset', this.doughnutChart.data.datasets[0].data);
        console.log('New dataset', newDataset);
        this.doughnutChart.data.datasets[0].data = newDataset;
        //this.doughnutChart.data.labels = ;
        this.doughnutChart.update();
    }

    render() {

        this.getBarChart();
        this.getDoughnutChart();
        this.getLocationChart();

    }

}