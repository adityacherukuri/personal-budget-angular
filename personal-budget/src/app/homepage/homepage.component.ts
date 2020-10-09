import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  private svg;
  private margin = 50;
  private width = 400;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  private chartData;
  private iterator = -1;

  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#CD5C5C',
          '#00CED1',
          '#5F9EA0',
          '#FFE4C4',
          '#FF7F50',
          '#E9967A',
          '#808080',
        ],
      },
    ],

    labels: [],
  };

  // private createSvg(): void {
  //   this.svg = d3
  //     .select('#D3JSChart')
  //     .append('svg')
  //     .attr('width', this.width)
  //     .attr('height', this.height)
  //     .append('g')
  //     .attr(
  //       'transform',
  //       'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
  //     );
  // }

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit(): void {
    console.log(this.dataService.getCharData);
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();

      this.createSvg();
      this.createColors();
      this.drawChart();
    });
  }

  createChart() {
    // var ctx = document.getElementById('myChart').getContext('2d');
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  private createSvg(): void {
    this.svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(): void {
    this.chartData = this.dataSource.labels.map((label) => {
      this.iterator++;
      return {
        label: label,
        value: this.dataSource.datasets[0].data[this.iterator],
      };
    });

    console.log(this.chartData);
    this.colors = d3
      .scaleOrdinal()
      .domain(this.chartData)
      .range([
        '#CD5C5C',
        '#00CED1',
        '#5F9EA0',
        '#FFE4C4',
        '#FF7F50',
        '#E9967A',
        '#808080',
      ]);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.value));
    const angleGen = d3.pie();
    const angles = angleGen(this.dataSource.datasets[0].data);

    this.svg
      .selectAll('pieces')
      .data(pie(angles))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d, i) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.chartData))
      .enter()
      .append('text')
      .text((d) => d.data.label)
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size');
  }
}
