import React, {Component} from 'react';
import CanvasJSReact from '../lib/canvasjs.react';
import "./css/Chart.css";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Chart extends Component {
  constructor(props){
    super(props);

    this.state = {
      width: 0,
      height: 0,

      data: [ ]
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      var e = this._main.parentElement;
      console.log(e);
      var height = e.clientHeight;
      var width = e.clientWidth;

      console.log(height, width);

      this.setState({height, width});
    }, 500);
  }

  addDataPoint(label, value){
    this.setState((state)=>{
      data: state.data.push({label, y:value});
    })
  }

  reset(){
    this.setState({data: [ ]});
  }

	render() {
    const options = {
      title: {
        text: "Classification Points"
      },
      data: [{
          type: "column",
          dataPoints: this.state.data
       }],
       width: this.state.width,
       height: this.state.height
   }


		return <div className="chart-div-main">
      <div className="chart-div" ref={(e)=>{this._main=e;}}>
  			<CanvasJSChart options = {options}
  				/* onRef={ref => this.chart = ref} */
  			/>
  			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
  		</div>
    </div>;
	}
}

export default Chart;
