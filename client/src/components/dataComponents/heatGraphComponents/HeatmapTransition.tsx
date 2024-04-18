import { FC, useEffect, useState } from "react";
import Heatmap from "./Heatmap";
import HeatmapAreo from "./HeatmapAreo";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import {
  GraphContainer,
  ButtonTitle,
  SliderContainer,
} from "../energyGraphComponents/BarTransition";
import COLORS from "../../../assets/Theme";

type transProps = {
  width: number;
  height: number;
  dtype: string;
  data:
    | {
        [year: string]: {
          [month: string]: {
            latitude: number;
            longitude: number;
            bright_ti4: number;
            acq_date: string;
          }[];
        };
      }
    | {
        [year: string]: {
          [month: string]: {
            latitude: number;
            longitude: number;
            value: number;
            acq_date: string;
          }[];
        };
      };
};

const Months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const HeatmapTransition: FC<transProps> = ({ width, height, data, dtype }) => {
  const ids = Object.keys(data).map(Number);
  const [dataState, setDataState] = useState<any>(data);
  const [sliderValueYear, setSliderValueYear] = useState(Object.keys(data)[0]);
  const [showTooltipYear, setShowTooltipYear] = useState(false);
  const [sliderValueMonth, setSliderValueMonth] = useState(6);
  const [showTooltipMonth, setShowTooltipMonth] = useState(false);

  useEffect(() => {
    setDataState(data);
  }, [data]);

  return (
    <GraphContainer>
      <ButtonTitle>
        Select a year to see specific information on that year
      </ButtonTitle>
      <SliderContainer>
        <Slider
          id="slider"
          defaultValue={ids[0]}
          min={ids[0]}
          max={ids[ids.length - 1]}
          colorScheme="pink"
          onChange={(v) => setSliderValueYear(String(v))}
          onMouseEnter={() => setShowTooltipYear(true)}
          onMouseLeave={() => setShowTooltipYear(false)}
          aria-label="Year Slider"
        >
          {ids.map(function (year) {
            return (
              <SliderMark value={year} mt="1" ml="-2.5" fontSize="sm">
                {year}
              </SliderMark>
            );
          })}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="pink.500"
            color="white"
            placement="top"
            isOpen={showTooltipYear}
            label={`${sliderValueYear}`}
          >
            <SliderThumb
              bg="white"
              borderColor={COLORS.backgroundGrey}
              borderWidth="2px"
            />
          </Tooltip>
        </Slider>
      </SliderContainer>

      <SliderContainer className="mb-[5vh]">
        <Slider
          id="slider"
          defaultValue={6}
          min={0}
          max={11}
          colorScheme="pink"
          onChange={(v) => setSliderValueMonth(v)}
          onMouseEnter={() => setShowTooltipMonth(true)}
          onMouseLeave={() => setShowTooltipMonth(false)}
          aria-label="slider1"
        >
          {Object.keys(Months).map(function (key, month) {
            return (
              <SliderMark value={month} mt="1" ml="-2.5" fontSize="sm">
                {Months[key]}
              </SliderMark>
            );
          })}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="pink.500"
            color="white"
            placement="top"
            isOpen={showTooltipMonth}
            label={`${Months[sliderValueMonth]}`}
          >
            <SliderThumb
              bg="white"
              borderColor={COLORS.backgroundGrey}
              borderWidth="2px"
            />
          </Tooltip>
        </Slider>
      </SliderContainer>
      {dtype === "Wildfire" && (
        <Heatmap
          width={width}
          height={height}
          data={dataState[sliderValueYear][Months[sliderValueMonth]]}
        />
      )}
      {dtype !== "Wildfire" && (
        <HeatmapAreo
          width={width}
          height={height}
          data={dataState[sliderValueYear][Months[sliderValueMonth]]}
          type={dtype === "wind" ? "wind" : "areo"}
        />
      )}
    </GraphContainer>
  );
};

export default HeatmapTransition;
