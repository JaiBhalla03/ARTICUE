import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const options = {
            xAxis: {
                type: 'category',
                name: 'Time',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: {
                    show: true,
                    interval: 0, // Show all labels
                    rotate: 0, // Rotate labels if needed
                    margin: 8, // Margin between label and axis
                },
            },
            yAxis: {
                type: 'value',
                name: 'Orders', // Y-axis label
                axisLabel: {
                    formatter: '{value}', // Format the label as needed
                },
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    itemStyle:{
                        color: '#212731',
                    }
                },
            ],
        };

        myChart.setOption(options);

        return () => {
            // Dispose of the chart when the component is unmounted
            myChart.dispose();
        };
    }, []); // The empty dependency array ensures this effect runs once after the initial render

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;
