import React,{Component} from 'react';
import { Link } from 'react-router';
import Sidebar from './shared/Sidebar';
import Header from './shared/Header';

class Main extends Component {
  constructor(props){
    super();
  }
  componentDidMount(){
    var sidebarDom = document.getElementsByClassName('content');
    var height = window.innerHeight - 60;
    var width = window.innerWidth - 250;
    sidebarDom[0].style.height = height + 'px';
    sidebarDom[0].style.width = width + 'px';
    window.addEventListener("resize", ()=>{
      var sidebarDom = document.getElementsByClassName('content');
      var height = window.innerHeight - 60;
      var width = window.innerWidth - 250;
      sidebarDom[0].style.height = height + 'px';
      sidebarDom[0].style.width = width + 'px';
    });
  }
  render(){
    return(
      <div className="main">
        <Header />
        <Sidebar />
        <div className="content">
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
}

module.exports = Main;
