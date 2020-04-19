function myChart()
{

  if($("#chartdivdomain").length == 1){chartdivdomain();}
  if($("#chartdiv").length == 1){chartdiv();}

}

$(document).ready(function(){
  myChart();
});









function chartdivdomain()
{

  Highcharts.chart('chartdivdomain',
  {
    title: { text: $("#chartdomaintitle").text() },
    xAxis: [{
      categories: $.parseJSON($("#chartdomaincategory").text()),
      crosshair: true
    }],
    yAxis: [{ title: false }],
    series:
    [
      {
        name: $("#charttitleregister").text(),
        data: $.parseJSON($("#chartdomaincountregister").text()),
        type: 'line',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' '+ $("#charttitlecount").text()
        }
      },
       {
        name: $("#charttitlerenew").text(),
        data: $.parseJSON($("#chartdomaincountrenew").text()),
        type: 'line',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' '+ $("#charttitlecount").text()
        }
      },
       {
        name: $("#charttitletransfer").text(),
        data: $.parseJSON($("#chartdomaincounttransfer").text()),
        type: 'line',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' '+ $("#charttitlecount").text()
        }
      }

    ]
  });
}











function chartdiv()
{

  Highcharts.chart('chartdiv',
  {
    title: { text: $("#chartlogtitle").text() },
    xAxis: [{
      categories: $.parseJSON($("#chartlogcategory").text()),
      crosshair: true
    }],
    yAxis: [{ title: false }],
    series:
    [
      {
        name: $("#charttitlelog").text(),
        data: $.parseJSON($("#chartlogcount").text()),
        type: 'area',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' ' + $("#charttitlecount").text()
        }
      }
    ]
  });
}



