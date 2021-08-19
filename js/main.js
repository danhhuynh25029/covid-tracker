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
function Country(id,code,date,name,confirmed,death){
    this.id = id;
    this.code = code;
    this.name = name;
    this.confirmed = confirmed;
    this.death = death;
    this.date = new Date(date);
    this.showInfor = function(){
        // return `<tr>
        //             <td>${this.id}</td>
        //             <td>${this.name}</td>
        //             <td>${this.confirmed}</td>
        //             <td>${this.death}</td>
        //         </tr>`
        return `
        <div class="card" style="width: 17rem;">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <img src = "https://www.countryflags.io/${this.code}/flat/64.png" >
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"> <h7><b>Date</b></h7> : ${this.date}</li>
            <li class="list-group-item"> <h7><b>TotalConfirmed</b></h7> : ${this.confirmed}</li>
            <li class="list-group-item"> <h7><b>TotalDeaths</b></h7> : ${this.death}</li>
          </ul>
        </div>`
    }
}

var str = '';
var listCountry = [];
var nameCountry = [];

// var countryCode = [];
var length = 0;
function Display(json) {
    var GLOBAL = `
        <li><h7><b>GLOBAL</b></h7></li>
        <li><b>TotalConfirmed</b> : ${json["Global"]["TotalConfirmed"]}</li>
        <li><b>TotalDeaths</b> : ${json["Global"]["TotalDeaths"]}</li>
    `
    length = json["Countries"]["length"];
    for(var i = 0 ; i < length ; i++){
        var Name = json["Countries"][i]["Country"];
        var Confirmed = json["Countries"][i]["TotalConfirmed"];
        var Death = json["Countries"][i]["TotalDeaths"];
        var code = json["Countries"][i]["CountryCode"];
        var date = json["Countries"][i]["Date"];
        listCountry.push(new Country(i+1,code,date,Name,Confirmed,Death));
        nameCountry.push(Name);
        // countryCode.push(json["Countries"][i]["CountryCode"]);
    }
    var listOption = "";
    for(var i = 0 ; i < length;i++){
        str = str + listCountry[i].showInfor();
        listOption = listOption + `<option>${nameCountry[i]}</option>`
    }
    document.getElementById("item").innerHTML = listOption;
    document.getElementById("global").innerHTML = GLOBAL;
    document.getElementById("content").innerHTML= str;
    console.log(json["Global"]);
   
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
                                <td><img src = "https://www.countryflags.io/${listCountry[i].code}/flat/32.png" ></td>
                                <td>${listCountry[i].name}</td>
                                <td>${listCountry[i].confirmed}</td>
                                <td>${listCountry[i].death}</td>
                               </tr>`;
            break;
        }
    }
    document.getElementById("choose").innerHTML = choose;
}