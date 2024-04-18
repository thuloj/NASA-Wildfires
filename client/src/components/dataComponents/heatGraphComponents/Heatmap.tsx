import { FC } from "react";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import styled from "styled-components";
import { interpolateInferno } from "d3-scale-chromatic";

type HeatmapProps = {
  width: number;
  height: number;
  data: {
    latitude: number;
    longitude: number;
    bright_ti4: number;
    acq_date: string;
  }[];
};

// https://www.youtube.com/watch?v=jD6813wGdBA - my lord and savior
const Heatmap: FC<HeatmapProps> = ({ width, height, data }) => {
  const calcColor = (bright_ti4: number) => {
    let color: string = "";
    color = interpolateInferno(bright_ti4 / 367);
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
              radius={1000}
              color={calcColor(fire.bright_ti4)}
            >
              <Tooltip>
                Date taken: {fire.acq_date}
                {"\n"}
                Value: {fire.bright_ti4}
              </Tooltip>
            </Circle>
          );
        })}
      </MapContainer>
    </HeatmapContainer>
  );
};

export default Heatmap;

type ContProps = {
  width: number;
  height: number;
};

const HeatmapContainer = styled.div<ContProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
