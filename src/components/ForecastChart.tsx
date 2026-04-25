import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ForecastChartProps {
  data: any;
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Use CSS variables for colors to support theme switching seamlessly
    // or hardcode subtle colors for now
    
    // Get root styles for colors
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#94a3b8' : '#64748b'; // slate-400 or slate-500
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    const gradientBlue = ctx.createLinearGradient(0, 0, 0, 200);
    gradientBlue.addColorStop(0, 'rgba(14, 165, 233, 0.4)'); // sky-500
    gradientBlue.addColorStop(1, 'rgba(14, 165, 233, 0.0)');

    let labels = ['+4h', '+8h', '+12h', '+16h', '+20h', '+24h'];
    let airData = [145, 155, 160, 150, 130, 110];
    let hujanData = [20, 45, 15, 5, 0, 0];

    if (data && data['24h']) {
      labels = data['24h'].labels;
      airData = data['24h'].water_level;
      hujanData = data['24h'].rainfall;
    }

    Chart.defaults.font.family = "'Inter', sans-serif";

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Air (cm)',
            data: airData,
            borderColor: '#0ea5e9', // sky-500
            backgroundColor: gradientBlue,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true,
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: 'Hujan (mm)',
            data: hujanData,
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: 2,
            yAxisID: 'y1',
            barThickness: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.9)',
            titleColor: isDark ? '#f8fafc' : '#0f172a',
            bodyColor: isDark ? '#94a3b8' : '#64748b',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            padding: 8,
            boxPadding: 4,
            usePointStyle: true,
          }
        },
        scales: {
          y: {
            type: 'linear', display: true, position: 'left',
            grid: { color: gridColor, drawBorder: false },
            ticks: { color: textColor, font: { size: 10 } }
          },
          y1: {
            type: 'linear', display: false, position: 'right',
            grid: { drawOnChartArea: false },
            min: 0, max: 100
          },
          x: { 
            grid: { display: false },
            ticks: { color: textColor, font: { size: 10 } }
          }
        }
      }
    });

  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default ForecastChart;
