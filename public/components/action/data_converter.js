var plot_graph = require('./plot_graph');
//function to convert the raw data from weather app to actual data used by d3 graphs
function rawtoactualdataconverter(tempjson){
  var date_array = [];
    var data_array =[];
    var count_array= [];
    var dateTime_array= [];
    var max_temp_array =[];
    var min_temp_array =[];
    var temp_json = tempjson;
    for(var i=0;i<temp_json.list.length;i++){

      var d = new Date(temp_json.list[i].dt_txt.split(' ')[0]);
      var new_date = d.toLocaleDateString("en-US");
      var index = date_array.indexOf(new_date);
      var counter = 0;
      if(index===-1){
        date_array.push(new_date);
        data_array.push(parseInt(temp_json.list[i].main.temp));
        min_temp_array.push(parseInt(temp_json.list[i].main.temp_min));
        max_temp_array.push(parseInt(temp_json.list[i].main.temp_max));
        dateTime_array.push(temp_json.list[i].dt_txt);
        counter = counter + 1;
        count_array.push(1);
      }else{
        data_array[index]=data_array[index]+parseInt(temp_json.list[i].main.temp);
        min_temp_array[index]=min_temp_array[index]+parseInt(temp_json.list[i].main.temp_min);
        max_temp_array[index]=max_temp_array[index]+parseInt(temp_json.list[i].main.temp_max);
        dateTime_array[counter]= temp_json.list[i].dt_txt;
        counter = counter + 1;
        count_array[index]= count_array[index]+1;
      }
    }

    var final_data = [];
    for(var k=0;k<date_array.length;k++){
      var obj={};
      obj["date"]=date_array[k];
      obj["temp"] = parseInt(data_array[k]/count_array[k])-273.15;
      obj["temp_min"] = parseInt(min_temp_array[k]/count_array[k])-273.15;
      obj["temp_max"] = parseInt(max_temp_array[k]/count_array[k])-273.15;
      obj["full_date"] = dateTime_array[k];
      final_data.push(obj);
    }
  dateConvertor(final_data);
  }

  function dateConvertor(final_data){
    var dCount = final_data.length;
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
    var date;
    var day;
    var monthIndex;
    var year;
    for(var i=0; i<=dCount-1 ; i++){

      date = new Date(final_data[i].date);
      day = date.getDate();
      monthIndex = date.getMonth();
      year = date.getFullYear();
      year = year.toString().slice(2,4);
      final_data[i].date = day + "-" + monthNames[monthIndex] + "-" + year;
    }
    plot_graph(final_data);
  }

module.exports = rawtoactualdataconverter;
