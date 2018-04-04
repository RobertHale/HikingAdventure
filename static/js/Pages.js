// App.jsx
import React from "react";
import {
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
 } from 'reactstrap';
import { Link } from "react-router-dom";

export default class Pages extends React.Component {
  constructor(){
    super();
    this.state = {
      filler: []
    }
  }
  render () {
    // Grab tota/current page information, url as well
    var totalPages = this.props.pagedata.pagecount;
    var currentPage= this.props.pagedata.cpage;
    var url = this.props.pagedata.url;

    // adjusted url for corresponding pagination button
    var aurl = '';

    // array that we loop through to generate page buttons
    var pages = [];
    // 0 means no pagiation is needed, 1 otherwise
    var exists = 0;
    // holds pagination number buttons i.e. 1,2,3,4,5
    let items = "";
    // holds pagination prev/next button
    let prev = "";
    let next = "";

    // by default prev/next buttons are not disabled
    aurl = url
    aurl += (currentPage - 1);
    prev =  <PaginationItem>
            <Link className="page-link" to={aurl}>
            {"«"}
            </Link>
            </PaginationItem>

    aurl = url
    aurl += (currentPage + 1);
    next =  <PaginationItem>
            <Link className="page-link" to={aurl}>
            {"»"}
            </Link>
            </PaginationItem>

    // check if prev/next should be disabled
    if (currentPage == 1){
      prev =  <PaginationItem disabled>
              <Link className="page-link" to="">
              {"«"}
              </Link>
              </PaginationItem>
    }
    else if (currentPage == totalPages){
      next =  <PaginationItem disabled>
              <Link className="page-link" to="">
              {"»"}
              </Link>
              </PaginationItem>
    }

    // loading pagination in sets of 5, handle case if less than 5
    if(totalPages < 5){
      for(var x = 0; x < totalPages; x++){
        pages.push(x+1);
      }
    }
    // handles creating pagination when near total pages
    else if((currentPage + 2) >= totalPages){
      var length = totalPages - 4;
      for(length; length <= totalPages; length++){
        pages.push(length);
      }
    }
    // handles creating pagination when near first page
    else if((currentPage - 2) <= 0){
      pages = [1,2,3,4,5];
    }
    else{
      pages = [currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2];
    }
    // generate pagination number buttons
    if(pages){
      exists = 1
      items = pages.map(page => {
        aurl = url;
        aurl += page;
        if(currentPage == page){
          return(
            <PaginationItem disabled key={page}>
            <Link className="page-link" to={aurl}>
            {page}
            </Link>
            </PaginationItem>
          );
        }
        else{
          return(
            <PaginationItem key={page}>
            <Link className="page-link" to={aurl}>
            {page}
            </Link>
            </PaginationItem>
          );
        }
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
