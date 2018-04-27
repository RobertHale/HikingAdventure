// App.jsx
import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink
 } from 'reactstrap';

export default class SearchResultPages extends React.Component {
  constructor(){
    super();
    this.state = {
      filler: []
    };
    this.updatePage = this.updatePage.bind(this);
  }
  updatePage(e){
    //console.log(e.currentTarget.id);
    const newPage = parseInt(e.currentTarget.id, 10);
    this.props.changePage(newPage);
  }
  render () {
    // Grab tota/current page information, url as well
    const totalPages = this.props.pageCount;
    const currentPage = this.props.cPage;
    // console.log('the current page is '+ currentPage);
    // console.log('the total page count is '+ totalPages);
    // array that we loop through to generate page buttons
    let pages = [];
    // 0 means no pagiation is needed, 1 otherwise
    let exists = 0;
    // holds pagination number buttons i.e. 1,2,3,4,5
    let items = "";
    // holds pagination prev/next button
    let prev;
    let next;
    // first and last pagination buttons
    let first;
    let last;

    // by default prev/next buttons are not disabled
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    prev =  <PaginationItem>
            <PaginationLink className="spagination" previous id={prevPage} onClick={this.updatePage}></PaginationLink>
            </PaginationItem>;

    next =  <PaginationItem>
            <PaginationLink className="spagination" next id={nextPage} onClick={this.updatePage}></PaginationLink>
            </PaginationItem>;
    first = <PaginationItem>
            <PaginationLink className="spagination" id={1} onClick={this.updatePage}>{"First"}</PaginationLink>
            </PaginationItem>;
    last = <PaginationItem>
            <PaginationLink className="spagination" id={totalPages} onClick={this.updatePage}>{"Last"}</PaginationLink>
            </PaginationItem>;

    // check if prev/next should be disabled
    if (currentPage === 1){
      //console.log('prev disabled')
      prev =  <PaginationItem disabled>
              <PaginationLink className="spagination" previous></PaginationLink>
              </PaginationItem>;
      first = <PaginationItem disabled>
              <PaginationLink className="spagination">{"First"}</PaginationLink>
              </PaginationItem>
    }
    if (currentPage === totalPages){
      //console.log('next enabled')
      next =  <PaginationItem disabled>
              <PaginationLink className="spagination" next></PaginationLink>
              </PaginationItem>;
      last =  <PaginationItem disabled>
              <PaginationLink className="spagination" >{"Last"}</PaginationLink>
              </PaginationItem>
    }
    // loading pagination in sets of 5, handle case if less than 5
    if(totalPages < 5){
      for(let x = 0; x < totalPages; x++){
        pages.push(x+1);
      }
    }
    // handles creating pagination when near total pages
    else if((currentPage + 2) >= totalPages){
      let length = totalPages - 4;
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
    if(pages.length !== 0){
      exists = 1;
      items = pages.map(page => {
        if(currentPage === page){
          return(
            <PaginationItem disabled key={page}>
            <PaginationLink className="spagination" disabled>{page}</PaginationLink>
            </PaginationItem>
          );
        }
        else{
          return(
            <PaginationItem key={page}>
            <PaginationLink className="spagination" id={page} onClick={this.updatePage}>{page}</PaginationLink>
            </PaginationItem>
          );
        }
      })
    }

    return (
      <div>
      {exists === 1 ?
        <Pagination>
        {first}
        {prev}
        {items}
        {next}
        {last}
        </Pagination>
         : null}
      </div>
      );
  }
}
