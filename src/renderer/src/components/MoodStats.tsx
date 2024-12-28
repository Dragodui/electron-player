import { FC, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Emotion, emotionSong } from 'src/types';
import { Laugh, Smile, Meh, Annoyed, Frown } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MoodStatsProps {
  history: emotionSong[];
}

const MoodStats: FC<MoodStatsProps> = ({ history }): JSX.Element => {
  const [averageMood, setAverageMood] = useState<number>(0);
  useEffect(() => {
    const moodIndexes = history.map((song) => {
      switch (song.emotion) {
        case 'happy':
          return 5;
        case 'good':
          return 4;
        case 'neutral':
          return 3;
        case 'annoyed':
          return 2;
        case 'sad':
          return 1;
        default:
          return 0;
      }
    });

    let sum: number = 0;
    let length: number = 0;
    for (let i = 0; i < moodIndexes.length; i++) {
      if (moodIndexes[i] !== 0) {
        sum += moodIndexes[i];
        length++;
      }
    }
    if (length === 0) {
      setAverageMood(0);
      return;
    }
    const averageIndex = Math.round(sum / length);

    setAverageMood(averageIndex);
  }, []);

  const emotions: Emotion[] = [
    {
      icon: <Frown color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'sad'
    },
    {
      icon: <Annoyed color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'annoyed'
    },
    {
      icon: <Meh color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'neutral'
    },
    {
      icon: <Smile color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'good'
    },
    {
      icon: <Laugh color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'happy'
    }
  ];

  const chartData = {
    labels: history.map((song) => song.song.metaData.common.title || 'Unknown Title'),

    datasets: [
      {
        label: 'Mood Changes',
        data: history.map((song) => {
          switch (song.emotion) {
            case 'happy':
              return 5;
            case 'good':
              return 4;
            case 'neutral':
              return 3;
            case 'annoyed':
              return 2;
            case 'sad':
              return 1;
          }
        }),
        borderColor: 'rgba(76, 179, 207, 1)',
        backgroundColor: 'rgba(76, 179, 207, 0.2)',
        tension: 0.2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)'
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 0
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      y: {
        min: 0,
        max: 6,
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          stepSize: 1,
          callback: function (tickValue: string | number) {
            switch (tickValue) {
              case 1:
                return 'Sad';
              case 2:
                return 'Annoyed';
              case 3:
                return 'Neutral';
              case 4:
                return 'Good';
              case 5:
                return 'Happy';
            }
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      }
    }
  };
  return (
    <div>
      <Line data={chartData} options={chartOptions} />
     <div className='mt-4 flex items-center gap-2'>
     <h2 className="text-2xl font-medium">
        {averageMood !== 0
          ? `Your average mood: ${emotions[averageMood].name}`
          : 'not enough data'}
      </h2>
      {averageMood !== 0 ? <p className='relative top-[3px]'>{emotions[averageMood].icon}</p> : ''}
     </div>
    </div>
  );
};

export default MoodStats;
