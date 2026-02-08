import React from 'react';
import { colors } from '@/styles/colors';

interface WorkInProgressProps {
  title?: string;
}

const WorkInProgress: React.FC<WorkInProgressProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="text-center">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: colors.primary }}
        >
          Trabajando
        </h1>
        {title && (
          <p
            className="text-xl"
            style={{ color: colors.textSecondary }}
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkInProgress;
