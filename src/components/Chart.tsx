import { useState } from 'react';
import { BarChart } from './BarChart';
import { PieChart } from './PieChart';
import BarChartIcon from '../assets/BarChartIcon.svg';
import PieChartIcon from '../assets/PieChartIcon.svg';

export const Chart = () => {
  const [view, setView] = useState<'Bar' | 'Pie'>('Bar');
  const [data, setData] = useState<Data>([
    { label: 'A', value: 2, color: '#beb0ff' },
    { label: 'B', value: 4, color: '#9c81ff' },
    { label: 'C', value: 6, color: '#8750ff' },
    { label: 'D', value: 8, color: '#7f28ff' },
  ]);

  return (
    <div className="flex flex-col gap-4 justify-between items-center w-full h-full">
      <div className="w-full p-2 flex justify-center items-center gap-2">
        <button
          className="h-8 w-8 bg-cover transition-all"
          onClick={() => setView('Bar')}
          style={{
            backgroundImage: `url(${BarChartIcon})`,
            opacity: view === 'Bar' ? 1 : 0.5,
          }}
        />
        <button
          className="h-8 w-8 bg-cover transition-all"
          onClick={() => setView('Pie')}
          style={{
            backgroundImage: `url(${PieChartIcon})`,
            opacity: view === 'Pie' ? 1 : 0.5,
          }}
        />
      </div>
      {view === 'Bar' ? (
        <BarChart data={data} setData={setData} />
      ) : (
        <PieChart data={data} setData={setData} />
      )}
      <Inputs data={data} setData={setData} />
    </div>
  );
};

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

export type Data = {
  color: string;
  value: number;
  label: string;
}[];
