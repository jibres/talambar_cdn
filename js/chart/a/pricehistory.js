function myChart()
{
  if($("#chartdiv").length == 1){myChartProductPrice();}
}
myChart();




//-------------------------------------------------------------------------------------------------------
function myChartProductPrice()
{

  Highcharts.chart('chartdiv',
  {

    title:
    {
      text: $("#charttitle").text()
    },
     xAxis:
    [{
        categories: $.parseJSON($("#chartcategory").text()),
        crosshair: true
    }],

    yAxis: [{ // Primary yAxis
      title: {
        text: $("#charttitleprice").text(),
        useHTML: Highcharts.hasBidiBug,
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      }
    }],

    series: $.parseJSON($("#chartseries").text()),

  });
}
