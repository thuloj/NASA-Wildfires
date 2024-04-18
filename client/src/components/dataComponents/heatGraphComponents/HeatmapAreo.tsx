import { FC } from "react";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import styled from "styled-components";
import { interpolatePuBu } from "d3-scale-chromatic";

type HeatmapProps = {
  width: number;
  height: number;
  type: string;
  data: {
    latitude: number;
    longitude: number;
    value: number;
    acq_date: string;
  }[];
};

// https://www.youtube.com/watch?v=jD6813wGdBA - my lord and savior
const HeatmapAreo: FC<HeatmapProps> = ({ width, height, data, type }) => {
  const calcColor = (value: number) => {
    let color: string = "";
    type === "wind"
      ? (color = interpolatePuBu(value / 15.417392))
      : (color = interpolatePuBu(value / 0.45222706));
    return color;
  };

  return (
    <HeatmapContainer width={width} height={height}>
      <MapContainer center={[38.345365, -121.293984]} zoom={8}>
        <TileLayer
          attribution="<a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((fire) => {
          return (
            <Circle
              center={[fire.latitude, fire.longitude]}
              radius={30000}
              color={calcColor(fire.value)}
            >
              <Tooltip>
                Date taken: {fire.acq_date}
                {"\n"}
                Value: {fire.value}
              </Tooltip>
            </Circle>
          );
        })}
      </MapContainer>
    </HeatmapContainer>
  );
};

export default HeatmapAreo;

type ContProps = {
  width: number;
  height: number;
};

const HeatmapContainer = styled.div<ContProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
