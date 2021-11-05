let cachedData = {};

function parseSampleData(index) {
  var sample = cachedData.samples[index];
  var sampleData = sample.otu_ids
    .map(function (otu_id, index) {
      return {
        otu_id: otu_id,
        sample_value: sample.sample_values[index],
        otu_label: sample.otu_labels[index],
      };
    })
    .sort(function (otuA, otuB) {
      return otuB.sample_value - otuA.sample_values;
    });
  return sampleData;
}

function drawBarGraph(index) {
  const margin = { top: 50, right: 50, bottom: 50, left: 60 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const sampleData = parseSampleData(index)
    .map((dataPoint) => ({ ...dataPoint, otu_id: "OTU" + dataPoint.otu_id }))
    .slice(0, 10);

  var xScale = d3
    .scaleLinear()
    .domain([0, sampleData[0].sample_value])
    .range([0, width]);
  var yScale = d3
    .scaleBand()
    .domain(
      sampleData.map(function (otu) {
        return otu.otu_id;
      })
    )
    .range([height, 0]);

d3.select("#bar").select("svg").remove();

var svg = d3
  .select("#bar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var barContainer = svg.append("g").attr("id", "bars");

var padding = yScale.bandwidth() * 0.25;
var bars = barContainer
  .selectAll()
  .data(sampleData)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr(
    "y",
    (dataPoint) =>
      height -
      (yScale(dataPoint.otu_id))
  )











//   d3.json("./samples.json").then(function (data) {
//     var sample = data.samples[0];
//     var sampleData = sample.otu.ids.map((otu_id, index) => {
//       return {
//         otu_id: otu_id,
//         sample_value: sample.sample_values[index],
//         otu_label: sample.otu_labels[index],
//       };
//     });
//     console.log(sampleData);

//   var xScale = d3.scaleLinear().domain([0, Math.max(...sample.sample_values)]);
//   var yScale = d3.

//   var svg = d3
//     .select("#bar")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);
// });
