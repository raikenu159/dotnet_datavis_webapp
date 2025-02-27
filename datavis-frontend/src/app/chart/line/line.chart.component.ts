import { afterNextRender, AfterViewInit, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line.chart.component.html',
  styleUrl: './line.chart.component.css'
})

export class LineChartComponent  implements AfterViewInit{
  @Input() chartData: ChartData<'line'> = 
    {
      labels: [],
      datasets: [{
        label: '',
        data: [],
      }]
    };
  @ViewChild('chartCanvas') private chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  public chartObj!: Chart;


  // suggestion to initialize chartObj in constructor with afterNextRender from: 
  // https://developer.chrome.com/blog/angular-dom-safety-ssr
  // but doesn't fix the error: ERROR TypeError: Cannot set properties of undefined (setting 'data')
  // at line 48

  // constructor() {
  //   afterNextRender(() => {
  //     this.chartObj = new Chart(
  //       this.chartCanvasRef.nativeElement,
  //     {
  //       type: 'line',
  //       data: {
  //         datasets: []
  //       }
  //     })
  //   } 
  //   )
  //  }


  ngAfterViewInit(): void {
    this.chartObj = this.CreateLineChartObj(this.chartCanvasRef, this.chartData);
    this.chartObj.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update chart on chart data changes after first change
    if (changes['chartData'] && !changes['chartData'].firstChange ) {
      this.chartObj.data = this.chartData;
      this.chartObj.update();
    }
  }


  private CreateLineChartObj(chartCanvasRef: ElementRef<HTMLCanvasElement>, lineChartData: ChartData<'line'>): Chart<'line'>{
    const chartCanvasHtml = chartCanvasRef.nativeElement;

    if (!chartCanvasHtml){
      throw new Error("failed to get canvas context")
    }

    let chartObj = new Chart<'line'>(
      chartCanvasHtml,
      {
        type: 'line',
        data: lineChartData,
        options:
        {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: "Crop yields in tonnes per hectare"
            }
          }
        },
      }
    )
    
    return chartObj;
  }
}