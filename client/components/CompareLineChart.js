import React,{Component} from 'react';

class CompareLineChart extends Component {
  constructor(props){
    super();
    this.drawChart = this.drawChart.bind(this);
    this.createDataRow = this.createDataRow.bind(this);
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps != this.props) {
      google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(this.drawChart);
    }
    return true;
  }
  createDataRow(){
    var rows = new Array();
    this.props.playerRate.map((rate,idx)=>{
      var row = new Array();
      row.push(new Date(rate.time));
      row.push(rate.rate);
      row.push(0);
      rows.push(row);
    });
    var newRows = new Array();
    for(let index = 0; index < rows.length; index++){
      var outterDate = rows[index][0];
      this.props.comparedPlayerRate.map((rate,idx)=>{
        var innerDate = new Date(rate.time);
        if(outterDate.valueOf() == innerDate.valueOf()) {
          rows[index][2] = rate.rate;
        } else {
          // var newRow = new Array();
          // newRow.push(innerDate);
          // newRow.push(rows[index][1]);
          // newRow.push(rate.rate);
          // newRows.push(newRow);
        }
      });
    }
    return rows;
  }
  drawChart(){
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', this.props.player.playerName);
    data.addColumn('number', this.props.comparedWith.playerName);
    var rows = this.createDataRow();
    data.addRows(rows);
    var options = {
      height: 240
    };
    let id = this.props.player._id;
    var chart = new google.charts.Line(document.getElementById(id));
    chart.draw(data, google.charts.Line.convertOptions(options));
  }
  render(){
    return(
      <div className="compare-line-chart" id={this.props.player._id}>
      {this.props.comparedWith.playerName}
      </div>
    )
  }
}

module.exports = CompareLineChart;
