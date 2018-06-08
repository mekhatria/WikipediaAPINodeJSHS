var rp = require('request-promise');
var Highcharts = require('highcharts');

console.log(rp);
var options = {
  method: 'GET',
  uri: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/International_Space_Station/daily/2017070100/2018060300',
  json: true,

};

rp(options)
  .then((parseBody) => {
    var parseBodyJSON = JSON.stringify(parseBody);
    var arrData = [];
    var year, month, day;

    for (i = 0; i < parseBody.items.length; i++) {
      year = parseBody.items[i].timestamp.slice(0, 4);
      month = parseBody.items[i].timestamp.slice(4, 6);
      day = parseBody.items[i].timestamp.slice(6, 8);

      arrData.push([new Date(year + '-' + month + '-' + day).toDateString(), parseBody.items[i].views]);
    }


    year = parseBody.items[0].timestamp.slice(0, 4);
    month = parseBody.items[0].timestamp.slice(4, 6);
    day = parseBody.items[0].timestamp.slice(6, 8);


    // Create the chart    
    Highcharts.chart('container', {

      title: {
        text: 'Views of the International Space Station (Wikipedia webpage)'
      },

      subtitle: {
        useHTML: true,
        text: 'Source: <a href="https://www.mediawiki.org/wiki/API:Main_page">Wikipedia</a>'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%y/%b/%e'
        }
      },

      yAxis: {
        title: {
          text: 'Number of views'
        }
      },

      series: [{
        name: 'views',
        data: arrData,
        pointStart: Date.UTC(year, month, day),
        pointInterval: 24 * 3600 * 1000 // one day
      }]

    });
  });
