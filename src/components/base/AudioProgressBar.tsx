import { Slider } from '@mui/material';
import React from 'react';

interface RangeInputProps {
  progressPercentage: number;
  handleRangeChange: any;
}

const AudioProgressBar: React.FC<RangeInputProps> = ({ progressPercentage, handleRangeChange }) => {
  return (
       <Slider aria-label="Volume" value={progressPercentage} onChange={handleRangeChange} 
               size='medium' defaultValue={0} color='success' className='mx-5'/>
  );
};

export default AudioProgressBar;
