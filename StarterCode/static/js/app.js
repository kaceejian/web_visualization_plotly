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
        (yScale(dataPoint.otu_id) + padding / 2) -
        (yScale.bandwidth() - padding)
    )
    .attr("width", (dataPoint) => xScale(dataPoint.sample_value))
    .attr("height", yScale.bandwith() - padding)
    .style("fill", "steelblue");

  var xAxisBars = svg
    .append("g")
    .attr("id", "x-axis-bars")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  var yAxisBars = svg
    .append("g")
    .attr("id", "y-axis-bars")
    .call(d3.axisLeft(yScale));
}

function drawBubbleGraph(index) {
  const margin = { top: 50, right: 50, bottom: 50, left: 60 },
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const sampleData = parseSampleData(index);

  const colorScheme = d3.scaleOrdinal(d3.schemeCategory10);

  var xScale = d3
    .scaleLinera()
    .domain([
      -sampleData[0].sample_value,
      Math.max(...sampleData.map((dataPoint) => dataPoint.otu_id)) +
        sampleData[0].sample_value,
    ])
    .range([0, width]);
  var yscale = d3
    .scaleLinear()
    .domain([0, sampleData[0].sample_value + sampleData[0].sample_value / 2])
    .range([height, 0]);

  d3.select("#bubble").select("svg").remove();
  var svg = d3
    .select("#bubble")
    .append("svg")
    .attr("width, width + margin.left + margin.right")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bubbleContainer = svg.append("g").attr("id", "bubbles");
  var bubbles = bubbleContainer
    .selectAll()
    .data(sampleData)
    .enter()
    .append("circle")
    .attr("cx", (dataPoint) => xScale(dataPoint.otu_id))
    .attr("cy", (dataPoint) => yScale(dataPoint.sample_value))
    .attr("r", (dataPoint) => dataPoint.sample_value)
    .style("fill", (dataPoint) => {
      const color = d3.color(colorScheme(dataPoint.otu_id));
      color.opacity = 0.7;
      return color;
    });
}

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
