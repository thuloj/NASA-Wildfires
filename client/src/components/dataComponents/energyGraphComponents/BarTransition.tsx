import React from 'react';
import { useState } from "react";
import { Barplot } from "./Barplot";
import COLORS from "../../../assets/Theme";
import styled from "styled-components";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Box
} from '@chakra-ui/react'

const BUTTONS_HEIGHT = 50;

type BarplotDatasetTransitionProps = {
  width: number;
  height: number;
  data: {
    [year: number]: {
      Month: string;
      thousandMegawatthours: number;
    }[];
  };
};


export const BarTransition = ({
  width,
  height,
  data,
}: BarplotDatasetTransitionProps) => {
  const [selectedData, setSelectedData] = useState(Object.values(data)[0]);

  const [sliderValue, setSliderValue] = React.useState(5)
  const [showTooltip, setShowTooltip] = React.useState(false)
  const ids = Object.keys(data).map(Number);
  

  return (
    <GraphContainer>
      <ButtonTitle>Select a year to see specific information on that year</ButtonTitle>
      <SliderContainer>
        <Slider
        id='slider'
        defaultValue={ids[ids.length/2]}
        min={ids[0]}
        max={ids[ids.length - 1]}
        colorScheme='pink'
        onChange={(v) => setSliderValue(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChangeEnd={(year) =>setSelectedData(data[year])}
        aria-label='slider1'
        >
        
        {ids.map(function(year){
          return(
            <SliderMark value={year} mt='1' ml='-2.5' fontSize='sm'>
            {year}
          </SliderMark>
          );
        })}

        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg='pink.500'
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={`${sliderValue}`}
        >
         <SliderThumb bg='white' borderColor={COLORS.backgroundGrey} borderWidth='2px'/>
        </Tooltip>
        </Slider>
      </SliderContainer>
      <div className="pt-8">
        <Barplot
          width={width}
          height={height - BUTTONS_HEIGHT}
          data={selectedData}
        />
      </div>
    </GraphContainer>
  );
};

export const GraphContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  margin: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`

export const ButtonTitle = styled.h1`
  text-align: left;
  padding: 1rem 0 0 1rem;
`

export const SliderContainer = styled.div`
  padding: 1rem 2rem 0 2rem;
`