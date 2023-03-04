import { useMemo, useState } from 'react';

// svg viewBox prop is like width/height but allows it to be responsive rather than fixed dimensions. think of it like an aspect ratio
// all pixel values inside the svg (height, width, padding etc) are now based on the viewbox, not the actual pixel size
const width = 400;
const padding = 20;
const domainPadding = 10;
const barHeight = 35;
export const BarChart = () => {
  const [data, setData] = useState<Data>([
    { label: 'A', value: 3, color: '' },
    { label: 'B', value: 6, color: '' },
    { label: 'C', value: 7, color: '' },
    { label: 'D', value: 2.4, color: '' },
  ]);
  const height = data.length * 60;

  const maxData = useMemo(
    () =>
      data
        .map((datum) => datum.value)
        .sort()
        .pop(),
    [data]
  );
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id="bar">
          <stop offset="0" stopColor="skyblue" />
          <stop offset="100%" stopColor="#b664ed" />
        </linearGradient>
      </defs>
      <Axis height={height} />
      <AxisLabels height={height} />
      <BarsWithLabels data={data} maxData={maxData} />
      <Inputs data={data} setData={setData} />
    </svg>
  );
};

const Axis = ({ height }: { height: number }) => (
  <path
    stroke="white"
    fill="none"
    strokeWidth="2"
    // svg paths are pretty easy.
    // Did you ever do the turtle programming thing in school?
    d={[
      // M: place the turtle at X Y with a sharpie up its ass
      `M${padding},${padding}`,
      // L: turtle walks in a straight line to X Y
      `L${padding},${height - padding}`,
      `L${width - padding},${height - padding}`,
    ].join(' ')}
  />
);

const AxisLabels = ({ height }: { height: number }) => {
  // cheat to get an array of ascending integers starting from 1
  const indices = Array.from(new Array(maxData || 0 + 1).keys()).slice(1);

  return (
    <>
      {indices.map((i) => (
        <text
          fontSize="16"
          stroke="white"
          fontWeight="300"
          fontFamily="Comfortaa"
          y={height - padding + 20}
          x={
            padding + ((width - padding * 2) * i) / (maxData || 1)
            // percentage of width
          }
          fill="white"
          textAnchor="middle"
        >
          {i}
        </text>
      ))}
    </>
  );
};

const BarsWithLabels = ({
  data,
  maxData,
}: {
  data: Data;
  maxData: number | undefined;
}) => (
  <>
    {data.map((datum, i) => (
      <>
        <rect
          rx={3}
          height={barHeight}
          width={
            (width - padding * 2 - domainPadding) *
            // percentage of total width
            (datum.value / (maxData || 1))
          }
          fill={datum.color}
          stroke="white"
          strokeWidth="1"
          x={padding + domainPadding}
          y={padding + i * 50}
        />
        <text
          fontSize="16"
          fontWeight="300"
          stroke="white"
          fontFamily="Comfortaa"
          x={padding - domainPadding * 2}
          y={padding + barHeight / 2 + 4 + i * 50}
          textAnchor="left"
        >
          {datum.label}
        </text>
      </>
    ))}
  </>
);

const Inputs = ({ data }: { data: Data }) => (
  <div className="w-full flex gap-2">
    {data.map((datum) => (
      <div className="flex gap-2">
        <input />
      </div>
    ))}
  </div>
);

type Data = {
  color: string;
  value: number;
  label: string;
}[];
