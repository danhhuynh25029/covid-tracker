var xmlhttp = new XMLHttpRequest();
var url = "https://api.covid19api.com/summary";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        myFunction(json);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
var str = `<tr>
    <th>Country</th>
    <th>TotalConfirmed</th>
    <th>TotalDeaths</th>
  </tr>`;
function myFunction(json) {
    var length = json["Countries"]["length"];
    console.log(length);
    for(var i = 0 ; i < length ; i++){
        var Country = json["Countries"][i]["Country"];
        var Confirmed = json["Countries"][i]["TotalConfirmed"];
        var Death = json["Countries"][i]["TotalDeaths"];
        str = str +  `<tr><td>${Country}</td><td>${Confirmed}</td><td>${Death}</td></tr>`;
        document.getElementById("content").innerHTML=str;
    }
}