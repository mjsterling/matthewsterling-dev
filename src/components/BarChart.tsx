import { useMemo, useState } from 'react';

// svg viewBox prop is like width/height but allows it to be responsive rather than fixed dimensions. think of it like an aspect ratio
// all pixel values inside the svg (height, width, padding etc) are now based on the viewbox, not the actual pixel size
const width = 400;
const padding = 20;
const domainPadding = 10;
const barHeight = 35;
export const BarChart = () => {
  const [data, setData] = useState<Data>([
    { label: 'A', value: 2, color: '#beb0ff' },
    { label: 'B', value: 4, color: '#9c81ff' },
    { label: 'C', value: 6, color: '#8750ff' },
    { label: 'D', value: 8, color: '#7f28ff' },
  ]);
  const validData = data.filter(({ value }) => value > 0);
  const height = validData.length * 50 + padding * 2;

  const maxData = Math.max(...data.map((datum) => datum.value));

  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <Axis height={height} />
        <g>
          <AxisLabels height={height} maxData={maxData} />
        </g>
        <BarsWithLabels data={validData} maxData={maxData} />
      </svg>
      <Inputs data={data} setData={setData} />
    </>
  );
};

const Axis = ({ height }: { height: number }) =>
  height > 70 ? (
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
  ) : null;

const AxisLabels = ({
  height,
  maxData,
}: {
  height: number;
  maxData: number | undefined;
}) => {
  if (!maxData) return null;
  // cheat to get an array of ascending integers starting from 1
  const step =
    maxData < 10
      ? 1
      : maxData < 50
      ? 5
      : maxData < 100
      ? 10
      : maxData < 500
      ? 50
      : 10 ** Math.floor(Math.log10(maxData));
  const indices = Array.from(new Array(10).keys())
    .map((n) => n * step)
    .slice(1);

  return (
    <>
      {indices.map((i) => {
        // percentage of width
        const x = padding + ((width - padding * 2) * i) / maxData;
        return (
          <text
            fontSize="16"
            stroke="white"
            fontWeight="300"
            fontFamily="Comfortaa"
            y={height - padding + 20}
            x={x}
            fill="white"
            textAnchor="middle"
            style={{ opacity: x > width - 40 ? 0 : 1 }}
          >
            {i >= 1000
              ? `${String(i).slice(0, 1)}e${Math.floor(Math.log10(i))}`
              : i}
          </text>
        );
      })}
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
          style={{ transition: 'width 500ms ease-out' }}
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

const Inputs = ({
  data,
  setData,
}: {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}) => (
  <div className="flex flex-col w-full p-2 gap-4">
    <div className="w-full flex justify-between">
      {data.map((datum, i) => (
        <div className="flex gap-2">
          <p className="text-white text-base font-sans">{datum.label}:</p>
          <input
            value={datum.value}
            className="text-secondary-500 pl-1 w-10 rounded-sm border border-white bg-transparent"
            onChange={(e) => {
              setData([
                ...data.slice(0, i),
                {
                  ...data[i],
                  value: Number(e.currentTarget.value.replace(/\D/g, '')),
                },
                ...data.slice(i + 1),
              ]);
            }}
          />
        </div>
      ))}
    </div>
    <p className="animate-bounce text-white text-xs w-full text-center">
      Change me!
    </p>
  </div>
);

type Data = {
  color: string;
  value: number;
  label: string;
}[];
