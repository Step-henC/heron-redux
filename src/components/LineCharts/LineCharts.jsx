import {
  VictoryLine,
  VictoryChart,
  VictoryLegend,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryContainer,
  VictoryLabel,
  VictoryErrorBar,
} from "victory";

import regression from "regression";
export default function LineCharts({
  peptideName,
  dataForLineGraph,
  showData,
  showErrorX,
  showErrorY,
}) {
  const arr = [];
  dataForLineGraph.forEach((rep) => {
    let tempArr = [rep.y, rep.x];
    arr.push(tempArr);
  });
  const xy = regression.linear(arr, { precision: 15 });

  return (
    <VictoryChart
      width={700}
      height={400}
      theme={VictoryTheme.material}
      containerComponent={<VictoryContainer responsive={false} />}
    >
      <VictoryLegend
        standalone={"false"}
        x={50}
        y={20}
        title={[peptideName, `${xy.string}`, `R2: ${xy.r2}`]}
        titleComponent={
          <VictoryLabel
            style={[{ fontSize: 20 }, { fontSize: 15 }, { fontSize: 15 }]}
          />
        }
        centerTitle
        borderPadding={{ left: -3 }}
        orientation="horizontal"
        gutter={20}
        style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
        data={[
          { name: "STD", symbol: { fill: "tomato", type: "circle" } },
          {
            name: "Unknown",
            symbol: {
              fill: "white",
              stroke: "blue",
              type: "triangleUp",
              strokeWidth: 2,
            },
          },
        ]}
      />
      <VictoryScatter
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "labels",
                    mutation: (props) => {
                      return props.text === props.datum.Replicate
                        ? null
                        : { text: props?.datum?.Replicate };
                    },
                  },
                ];
              },
            },
          },
        ]}
        standalone={false}
        symbol={({ datum }) =>
          datum?.Replicate.match(/(std)/gi) ? "circle" : "triangleUp"
        }
        labels={({ datum }) =>
          showData
            ? [
                `y: ${Math.round((datum.y + Number.EPSILON) * 100) / 100}`,
                `x: ${Math.round((datum.x + Number.EPSILON) * 100) / 100}`,
              ]
            : ""
        }
        data={dataForLineGraph}
        size={5}
        style={{
          data: {
            fill: ({ datum }) =>
              datum?.Replicate.match(/(std)/gi) ? "tomato" : "white",
            stroke: ({ datum }) =>
              datum?.Replicate.match(/(std)/gi) ? "tomato" : "blue",
            strokeWidth: 2,
          },
        }}
      />
      <VictoryErrorBar
        errorY={(datum) => (showErrorY ? datum.QSTDEV : 0)}
        errorX={(datum) => (showErrorX ? datum.RSTDEV : 0)}
        data={dataForLineGraph}
        style={{
          data: {
            strokeWidth: 2,
          },
        }}
      />
      <VictoryLine
        standalone={false}
        size={5}
        style={{ data: { fill: "tomato" } }}
        data={dataForLineGraph}
        x="RatioAvg"
        y="QuantAvg"
      />
      <VictoryAxis
        dependentAxis
        label={"Light:Heavy Peak Area Ratio"}
        axisLabelComponent={<VictoryLabel textAnchor="start" dy={-30} />}
      />
      <VictoryAxis
        label={`Analyte Concentration (${dataForLineGraph
          .at(0)
          ?.Quantification.split(" ")
          .at(1)})`} //get unit from quantification name
        axisLabelComponent={<VictoryLabel textAnchor="start" dy={20} />}
      />
    </VictoryChart>
  );
}