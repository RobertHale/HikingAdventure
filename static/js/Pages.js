// App.jsx
import React from "react";
import {
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
 } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";

export default class Pages extends React.Component {
  constructor(){
    super();
    this.state = {
      filler: []
    }
  }
  render () {
    var pages = [];
    var exists = 0;
    let items = "";
    let prev = "";
    let current = "";
    let next = "";
    // these variables help resolve prev/next values
    let min = 0;
    let max = 0;
    let disablep = true;
    let disablen = true;

    // loading pagination in sets of 5, handle case if less than 5
    if(this.props.pagedata.pagecount < 5){
      var length = this.props.pagedata.pagecount;
      for(var x = 0; x < length; x++){
        pages.push(x+1);
      }
    }
    // handles creating pages when near limit
    else if((this.props.pagedata.cpage + 2) >= this.props.pagedata.pagecount){
      //next button disabled,
      disablep = false;
      var limit = this.props.pagedata.pagecount;
      var length = limit - 4;
      for(length; length <= limit; length++){
        pages.push(length);
      }
    }
    else if((this.props.pagedata.cpage -2) <= 0){
      disablen = false;
      pages = [1,2,3,4,5];
    }
    else{
      disablep = false;
      disablen = false;
      var length = this.props.pagedata.cpage;
      var a = length - 2;
      var b = length - 1;
      var c = length;
      var d = length + 1;
      var e = length + 2;
      pages = [a, b, c, d, e];
    }

    if(!disablep){
      var temp = this.props.pagedata.url;
      temp += (this.props.pagedata.cpage - 1);
      prev =  <PaginationItem>
              <PaginationLink previous href={temp} />
              </PaginationItem>
    }
    else{
      prev =  <PaginationItem disabled>
              <PaginationLink previous href="" />
              </PaginationItem>
    }
    if(!disablen){
      var temp = this.props.pagedata.url;
      temp += (this.props.pagedata.cpage + 1);
      next =  <PaginationItem>
              <PaginationLink next href={temp} />
              </PaginationItem>
    }
    else{
      next =  <PaginationItem disabled>
              <PaginationLink next href="" />
              </PaginationItem>
    }
    if(pages){
      exists = 1
      items = pages.map(page => {
        var link = this.props.pagedata.url;
        link += page;
        return(
          <PaginationItem>
          <Link className="page-link" to={link}>
          {page}
          </Link>
          </PaginationItem>
        );
      })
    }

    return (
      <div>
      {exists == 1 ?
        <Pagination>
        {prev}
        {items}
        {next}
        </Pagination>

         : null}

      </div>
      );
  }
}

// <ReactPaginate
// pageCount={this.state.pagecount}
// breakLabel={""}
// previousLabel={"prev"}
// nextLabel={"next"}
// pageRangeDisplayed={3}
// marginPagesDisplayed={1}
// containerClassName={"react-paginate"}
// onPageChange={this.handlePageClick}
// />
