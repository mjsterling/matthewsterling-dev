import { useEffect, useMemo, useState } from 'react';
import { Data } from './Chart';

export const PieChart = ({ data }: { data: Data }) => {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    setScale(1);
  }, []);

  const width = 400;
  const height = 280;
  const radius = 100;

  const cx = width / 2 - 60;
  const cy = height / 2;

  const extractValues = (array: Data) => array.map((datum) => datum.value);

  const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

  const percentageToAngle = (percentage: number) => percentage * 360;

  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const polarToCartesianCoords = (radius: number, angle: number) => ({
    x: radius * Math.cos(degreesToRadians(angle - 90)) + cx,
    y: radius * Math.sin(degreesToRadians(angle - 90)) + cy,
  });

  console.log(data);

  const dataValues = extractValues(data);

  const sumDataValues = sum(dataValues);

  const valueToPercentage = (value: number) =>
    sumDataValues === 0 ? 0 : value / sumDataValues;

  const datapointsWithPolarCoords = data.map((datum, index) => {
    const startPercentage = valueToPercentage(sum(dataValues.slice(0, index)));
    const startAngle = percentageToAngle(startPercentage);
    const endPercentage = valueToPercentage(
      sum(dataValues.slice(0, index + 1))
    );
    const endAngle = percentageToAngle(endPercentage);

    return {
      ...datum,
      circleStart: polarToCartesianCoords(radius, startAngle),
      circleEnd: polarToCartesianCoords(radius, endAngle),
      startPercentage,
      endPercentage,
    };
  });

  const filteredDatapoints = datapointsWithPolarCoords.filter(
    (datum) => datum.value !== 0
  );

  const PieSegments = () => (
    <>
      {datapointsWithPolarCoords.map((datum, index) => {
        console.table({ ...datum, sumDataValues });
        return filteredDatapoints.length === 1 ? (
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill={filteredDatapoints[0].color}
            stroke="white"
            strokeWidth={1.5}
          />
        ) : (
          <>
            <path
              d={[
                `M ${cx} ${cy}`,
                `L ${datum.circleStart.x} ${datum.circleStart.y}`,
                `A ${radius} ${radius} 0  ${
                  datum.value / sumDataValues > 0.5 ||
                  filteredDatapoints.length === 1
                    ? 1
                    : 0
                } 1 ${datum.circleEnd.x} ${datum.circleEnd.y}`,
                `Z`,
              ].join(' ')}
              fill={datum.color}
              stroke="white"
              strokeWidth={1.5}
            />
          </>
        );
      })}
    </>
  );

  const legendSize = 25;
  const legendGap = 20;

  const Legend = () => (
    <>
      {filteredDatapoints.map((datum, index) => {
        const indexMidpoint = (filteredDatapoints.length - 1) / 2;
        const y =
          cy -
          indexMidpoint * (legendSize + legendGap) +
          (legendSize + legendGap) * index;
        return datum.value ? (
          <>
            <rect
              rx={3}
              fill={datum.color}
              y={y - legendSize / 2}
              x={300}
              width={legendSize}
              height={legendSize}
            />
            <text
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="white"
              x={350}
              y={y + 2}
              fontSize={20}
            >
              {datum.label}
            </text>
          </>
        ) : null;
      })}
    </>
  );

  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {filteredDatapoints.length ? (
          <g
            style={{
              transform: `scale(${scale})`,
              transition: 'all 500ms ease-in-out',
              transformOrigin: `${cx}px ${cy}px`,
            }}
          >
            <PieSegments />
          </g>
        ) : null}
        <Legend />
      </svg>
    </>
  );
};
