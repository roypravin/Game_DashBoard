import React,{Component} from 'react';
import { Link } from 'react-router';
import Footer from './Footer';

class Sidebar extends Component {
  constructor(props){
    super();
  }
  componentDidMount(){
    var sidebarDom = document.getElementsByClassName('sidebar');
    var height = window.innerHeight - 60;
    sidebarDom[0].style.height = height + 'px';
    window.addEventListener("resize", ()=>{
      var sidebarDom = document.getElementsByClassName('sidebar');
      var height = window.innerHeight - 60;
      sidebarDom[0].style.height = height + 'px';
    });
  }
  render(){
    return(
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <Link to='/matches'><i className="fa fa-trophy" aria-hidden="true"></i> All Matches</Link>
          </li>
          <li className="sidebar-nav-item">
            <Link to='/players'><i className="fa fa-child" aria-hidden="true"></i> All Participants</Link>
          </li>
        </ul>
        <Footer />
      </div>
    )
  }
}

module.exports = Sidebar;
