import React,{Component} from 'react';
import {scoreTimeCalculator,gameDurationCaculator} from '../utils/DateHelper';

class ScoreLineChart extends Component {
  constructor(props){
    super();
    this.drawChart = this.drawChart.bind(this);
  }
  componentDidMount(){
    google.charts.load('current', {'packages':['timeline']});
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart() {
    let container = document.getElementById(this.props.id);
    let chart = new google.visualization.Timeline(container);
    let dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'ScorePlayer' });
    dataTable.addColumn({ type: 'date', id: 'ScoreTimeStart' });
    dataTable.addColumn({ type: 'date', id: 'ScoreTimeEnd' });

    let records = new Array();
    let gameStartAt = new Date(this.props.startTime);
    let gameEndAt = gameDurationCaculator(gameStartAt,30*60*1000);
    records.push(['Game Duration',gameStartAt,gameEndAt])
    this.props.scoreRecord.map((record,idx)=>{
      let player = record.scorePlayer.playerName;
      let scoreDuration = record.scoreTime + 10;
      let timeRecord = scoreTimeCalculator(gameStartAt,record.scoreTime,scoreDuration);
      let recordItem = new Array();
      recordItem.push(player);
      recordItem.push(timeRecord.scoreStart);
      recordItem.push(timeRecord.scoreEnd);
      records.push(recordItem);
    })
    dataTable.addRows(records);
    chart.draw(dataTable);
  }
  render(){
    var record = this.props.scoreRecord;
    return (
      <div className="score-line-chart" id={this.props.id}>
      </div>
    )
  }
}

module.exports = ScoreLineChart;
