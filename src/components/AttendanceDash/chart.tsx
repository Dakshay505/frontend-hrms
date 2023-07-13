import  { Component } from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';
// import "../../leaves.css"

interface DataPoint {
  x: number;
  y: number;
}

interface Props {}

interface State {
  dataPoints: DataPoint[];
}

// const CanvasJS = CanvasJSReact.CanvasJS;
// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component<Props, State> {
  state: State = {
    dataPoints: [
      { x: 1, y: 0 },
      { x: 2, y: 28 },
      { x: 3, y: 36 },
      { x: 4, y: 59 },
      { x: 5, y: 72 },
      { x: 6, y: 82},
      { x: 7, y: 92 }
    ]
  };

  // componentDidMount() {
  //   CanvasJS.addColorSet("customColorSet", [ //colorSet Array
  //     "#4661EE",
  //     "#EC5657",
  //     "#1BCDD1",
  //     "#8FAABB",
  //     "#B08BEB",
  //     "#3EA0DD",
  //     "#F5A52A",
  //     "#23BFAA",
  //     "#FAA586",
  //     "#EB8CC6",
  //   ]);
  // }

  render() {
    // const options = {
    //   colorSet: "customColorSet",
    //   animationEnabled: true,
      
    //   axisX: {
    //     valueFormatString: "DDD",
    //     interval: 1,
    //     intervalType: "day",
    //     labelFormatter: (e: { value: number }) => {
    //       return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][e.value - 1];
    //     }
    //   },
    //   axisY: {
    //     suffix: "%",
    //     minimum: 0,
    //     maximum: 100,
    //     interval: 25
    //   },
    //   data: [
    //     {
    //       yValueFormatString: "#,###%",
    //       xValueFormatString: "DDD",
    //       type: "spline",
    //       dataPoints: this.state.dataPoints
    //     }
    //   ]
    // };

    return (
      <div></div>
      //  <CanvasJSChart options={options} />
    );
  }
}

export default LineChart;
