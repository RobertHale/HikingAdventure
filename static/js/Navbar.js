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
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import {withRouter} from 'react-router-dom'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      sInput: ""
    };
    this.toggle = this.toggle.bind(this);
    this.newInput = this.newInput.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  newInput(e){
    this.setState({sInput: e.target.value});
  }
  submitSearch(e){
    e.preventDefault()
    //console.log(this.state.sInput);
    var destination = this.state.sInput;
    this.props.history.push("/search/" + destination);
  }

  render () {
    return (
      <div>
      <Navbar className="form-inline" style={{backgroundColor: "#212121"}} dark expand="md">
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
      <Form className="commentForm" onSubmit={this.submitSearch}>
      <FormGroup className="form-inline ml-auto" expand="md">
      <Input className="form-control mr-sm-2" type="search" placeholder="Search" value={this.state.sInput} onChange={this.newInput} aria-label="Search" />
      <Button outline color="light" type="submit">Search</Button>
      </FormGroup>
      </Form>
      </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
