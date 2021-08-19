var xmlhttp = new XMLHttpRequest();
var url = "https://api.covid19api.com/summary";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        Display(json);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
function Country(id,name,confirmed,death){
    this.id = id;
    this.name = name;
    this.confirmed = confirmed;
    this.death = death;
    this.showInfor = function(){
        // return `<tr>
        //             <td>${this.id}</td>
        //             <td>${this.name}</td>
        //             <td>${this.confirmed}</td>
        //             <td>${this.death}</td>
        //         </tr>`
        return `
        <div class="card" style="width: 15rem;">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${this.id}</li>
            <li class="list-group-item">${this.confirmed}</li>
            <li class="list-group-item">${this.death}</li>
          </ul>
        </div>

            `
    }
}
// var str = `<tr>
//     <th>#</th>
//         <th>Country</th>
//         <th>TotalConfirmed</th>
//         <th>TotalDeaths</th>
//     </tr>`;
var str = '';
var listCountry = [];
var nameCountry = [];
var length = 0;
function Display(json) {
    length = json["Countries"]["length"];
    for(var i = 0 ; i < length ; i++){
        var Name = json["Countries"][i]["Country"];
        var Confirmed = json["Countries"][i]["TotalConfirmed"];
        var Death = json["Countries"][i]["TotalDeaths"];
        listCountry.push(new Country(i+1,Name,Confirmed,Death));
        nameCountry.push(Name);
    }
    var listOption = "";
    for(var i = 0 ; i < length;i++){
        str = str + listCountry[i].showInfor();
        listOption = listOption + `<option>${nameCountry[i]}</option>`
    }
    document.getElementById("item").innerHTML = listOption;
    document.getElementById("content").innerHTML=str;
   
}
function getValue(){
    var choose =  `<th>#</th>
                <th>Country</th>
                <th>TotalConfirmed</th>
                <th>TotalDeaths</th>
            </tr>`
    var select = document.getElementById("item");
    var value = select.options[select.selectedIndex].value;
    for(var i = 0 ; i < length ; i++){
        if(listCountry[i].name == value){
            choose = choose + `<tr>
                                <td>${listCountry[i].id}</td>
                                <td>${listCountry[i].name}</td>
                                <td>${listCountry[i].confirmed}</td>
                                <td>${listCountry[i].death}</td>
                               </tr>`;
        }
    }
    document.getElementById("choose").innerHTML = choose;
}