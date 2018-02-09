<<<<<<< HEAD
=======
// document.querySelector('.name').addEventListener('input', function(event){
//   document.querySelector('.jsValue').innerHTML = document.querySelector('.name').value;
// }, false);

var rater = "0";

// document.addEventListener("click", function(){
//     document.body.style.backgroundColor = "Silver";
// });


function myFunction(){
	document.getElementById('num').innerHTML = document.getElementById('name').value;
}

function enterRate(rating){
	if (rater === "0") {
		rater = rating
	}else{
		rater += "," + rating;
	}
}

//creates a new row
function createRow(){
	//get table and entered values`
	var table    = document.getElementById('table');
	var tagDrop  = document.getElementById('tag');
	//create row
	var row      = document.createElement("tr");
	//create elements
	var toolHead = document.createElement("td");
	var toolTag  = document.createElement("td");
	var toolRate = document.createElement("td");
	var toolRev  = document.createElement("td");
	//get text for elements
	var toolText = document.createTextNode(document.getElementById('tool').value);
	var tagText  = document.createTextNode(tagDrop.options[tagDrop.selectedIndex].value);
	var rateText = document.createTextNode(rater);
	var revText  = document.createTextNode(document.getElementById('review').value);
	//append text
	toolHead.appendChild(toolText);
	toolTag.appendChild(tagText);
	toolRate.appendChild(rateText);
	toolRev.appendChild(revText);
	//append elements
	row.appendChild(toolHead);
	row.appendChild(toolTag);
	row.appendChild(toolRate);
	row.appendChild(toolRev);
	//append row
	table.appendChild(row);
	rater = "0";
}

function update(){
	var have = parseInt(document.getElementById('have').value);
	var need = parseInt(document.getElementById('need').value);
	var days = parseInt(document.getElementById('days').value); 
	if (days == 0) {
		return;
	}
	var daily  = (need - have) / days;
	var energy = daily * 25 / 6.9;
	document.getElementById('output').innerHTML = "You need to get " + daily + " a day for the next " + days + " days.\nAverage of " + energy + " a day";
}

function setBG(){
	var bgdrop = document.getElementById('bgcolor');
	document.body.style.backgroundColor = bgdrop.options[bgdrop.selectedIndex].value;
}

function tableToJson() {
  var data=[];
  var headers=[];
  var table = document.getElementById('table');
  document.getElementById('output').innerHTML = "";
  for (var i=0;
  i < table.rows[0].cells.length;
  i++) {
    headers[i]=table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
  }
  for (var i=1;
  i < table.rows.length;
  i++) {
    var tableRow=table.rows[i];
    var rowData= {}
    ;
    for (var j=0;
    j < tableRow.cells.length;
    j++) {
      rowData[headers[j]]=tableRow.cells[j].innerHTML;
    }
    data.push(rowData);
  }
  for (var i = data.length - 1; i >= 0; i--) {
  	document.getElementById('output').innerHTML += "{" + data[i][headers[0]];
  	for(var j = 1; j < headers.length; j++){
  		document.getElementById('output').innerHTML += ", " + data[i][headers[j]];
  	}
  	document.getElementById('output').innerHTML += "}\n";
  }
}
>>>>>>> 40eaf500064aceec6501e8a04a002c36a1c8db28
