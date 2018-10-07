import React,{Component} from 'react';
import { Link } from 'react-router';

class Header extends Component {
  constructor(props){
    super();
  }
  render(){
    return(
      <header className="header">
        <div id="home-img">
          <Link className="home" to="/">
            <img alt="Terem" src={"http://www.terem.com.au/wp-content/themes/teram/images/terem-logov2.png"} />
          </Link>
        </div>
      </header>
    )
  }
}

module.exports = Header;
