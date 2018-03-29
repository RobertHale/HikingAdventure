// App.jsx
import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  FormGroup,
  input
} from 'reactstrap';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    return (
      <div>
      <Navbar color="faded form-inline" style={{backgroundColor: "#212121"}} expand="md">
      <NavbarBrand href="http://hikingadventures.me">Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
      <Nav className="mr-auto" navbar>
      <NavItem>
      <NavLink href="http://hikingadventures.me/resorts">Resorts</NavLink>
      </NavItem>
      <NavItem>
      <NavLink href="http://hikingadventures.me/trails">Trails</NavLink>
      </NavItem>
      <NavItem>
      <NavLink href="http://hikingadventures.me/photos">Photos</NavLink>
      </NavItem>
      <NavItem>
      <NavLink href="http://hikingadventures.me/about">About</NavLink>
      </NavItem>
      </Nav>
      </Collapse>
      <FormGroup className="form-inline ml-auto" expand="md">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <Button outline color="primary" type="submit">Search</Button>
      </FormGroup>
      </Navbar>
      </div>
    );
  }
}



// <nav class="navbar navbar-toggleable-md sticky-top navbar-inverse" style="background-color: #212121;">
//   <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
//   <a class="navbar-brand" href="http://hikingadventures.me">Home</a>
//   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//     <div class="navbar-nav">
//       <a class="nav-item nav-link" href="http://hikingadventures.me/resorts">Resorts<span class="sr-only">(current)</span></a>
//       <a class="nav-item nav-link" href="http://hikingadventures.me/trails">Trails</a>
//       <a class="nav-item nav-link" href="http://hikingadventures.me/photos">Photos</a>
//       <a class="nav-item nav-link" href="http://hikingadventures.me/about">About</a>
//     </div>
//   </div>
//   <form class="form-inline my-2 my-sm-0 w-40">
//     <div class="input-group">
//       <input class="form-control mr-sm-0" type="text" placeholder="">
//       <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
//     </div>
//   </form>
// </nav>
