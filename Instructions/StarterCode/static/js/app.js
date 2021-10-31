d3.json("./samples.json").then(function (data) {
  var sample = data.samples[0];
  var sampleData = sample.otu.ids.map((otu_id, index) => {
    return {
      otu_id: otu_id,
      sample_value: sample.sample_values[index],
      otu_label: sample.otu_labels[index],
    };
  });
  console.log(sampleData);

  // var xScale = d3.scaleLinear().domain([0, Math.max(...sample.sample_values)]);
  // var yScale = d3.

  // var svg = d3
  //   .select("#bar")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height);
});
