import { useEffect, useState } from 'react';
import type { Data } from './Chart';

// svg viewBox prop is like width/height but allows it to be responsive rather than fixed dimensions. think of it like an aspect ratio
// all pixel values inside the svg (height, width, padding etc) are now based on the viewbox, not the actual pixel size
const width = 400;
const padding = 20;
const domainPadding = 10;
const barHeight = 35;
export const BarChart = ({ data }: { data: Data }) => {
  const validData = data.filter(({ value }) => value > 0);
  const height = validData.length * 50 + padding * 2;
  const [scaleX, setScaleX] = useState(0.1);
  useEffect(() => {
    setScaleX(1);
  }, []);

  const maxData = Math.max(...data.map((datum) => datum.value));

  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <Axis height={height} />
        <g>
          <AxisLabels height={height} maxData={maxData} />
        </g>
        <BarsWithLabels data={validData} maxData={maxData} scaleX={scaleX} />
      </svg>
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

  // cheat to get an array of ascending integers starting from 1

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
  scaleX,
}: {
  data: Data;
  maxData: number;
  scaleX: number;
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
          style={{
            transition: 'all 500ms ease-out',
            transform: `scaleX(${scaleX})`,
            transformOrigin: '25px 25px',
          }}
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
