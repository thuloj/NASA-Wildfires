import { FC, useEffect, useState } from "react";
import { BarTransition } from "./energyGraphComponents/BarTransition";
import styled from "styled-components";
import COLORS from "../../assets/Theme";
import HeatmapTransition from "./heatGraphComponents/HeatmapTransition";
import { toast } from "react-hot-toast";

//import * as d3 from 'd3';
type ViewProps = {
  data: {
    dataType: string;
    startYear: string;
    endYear: string;
  };
};

const View = ({ data }) => {
  const dataType = data.dataType;
  const startYear = data.startYear;
  const endYear = data.endYear;
  const [Data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [error, setError] = useState([""]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(
      document.getElementById("cont")!.offsetWidth > 0
        ? document.getElementById("cont")!.offsetWidth - 100
        : 600
    );
    if (dataType === "SolarEnergy") {
      fetch(`/node/energy/SolarEnergy/${startYear}/${endYear}`)
        .then((res) => {
          res.json().then((data) => {
            setData(data);
            setLoading(true);
          });
        })
        .catch((err) => {
          toast.error("Error loading data");
        });
    } else if (dataType === "WindEnergy") {
      fetch(`/node/energy/WindEnergy/${startYear}/${endYear}`)
        .then((res) => {
          res.json().then((data) => {
            setData(data);
            setLoading(true);
          });
        })
        .catch((err) => {
          toast.error("Error loading data");
        });
    } else if (dataType === "Wildfire") {
      if (
        startYear === "" ||
        endYear === "" ||
        startYear < 2012 ||
        endYear > 2021
      ) {
        setError([
          "Currently Wildfires is only available from 2012 to 2021",
          "Please adjust your input",
        ]);
        setErrorLoading(true);
      } else {
        fetch(`/node/heatmaps/Wildfires/${startYear}/${endYear}`)
          .then((res) => {
            res.json().then((data) => {
              setData(data);
              setLoading(true);
            });
          })
          .catch((err) => {
            toast.error("Error loading data");
          });
      }
    } else if (dataType === "WindSpeed") {
      fetch(`/node/heatmaps/WindSpeed/${startYear}/${endYear}`)
        .then((res) => {
          res.json().then((data) => {
            setData(data);
            setLoading(true);
          });
        })
        .catch((err) => {
          toast.error("Error loading data");
        });
    } else if (dataType === "Aerosols") {
      fetch(`/node/heatmaps/Aerosols/${startYear}/${endYear}`)
        .then((res) => {
          res.json().then((data) => {
            setData(data);
            setLoading(true);
          });
        })
        .catch((err) => {
          toast.error("Error loading data");
        });
    }
  }, []);

  return (
    // make sure energyData is not empty
    <div>
      {errorLoading && (
        <div>
          <h1>{error[0]}</h1>
          <h2>{error[1]}</h2>
        </div>
      )}
      {loading == true && (
        <div>
          {dataType === "SolarEnergy" && (
            <div>
              <GraphTitle>Solar Energy Production</GraphTitle>
              <GraphSubTitle>In Thousand Megawatt Hours</GraphSubTitle>
              <BarTransition width={width} height={400} data={Data} />
            </div>
          )}

          {dataType === "WindEnergy" && (
            <div>
              <GraphTitle>Wind Energy Production</GraphTitle>
              <GraphSubTitle>In Thousand Megawatt Hours</GraphSubTitle>
              <BarTransition width={width} height={500} data={Data} />
            </div>
          )}
          {dataType === "Wildfire" && (
            <div className="ml-10 mr-10">
              <GraphTitle>Wildfires</GraphTitle>
              <GraphSubTitle>Each dot is a fire</GraphSubTitle>
              <GraphSubTitle>
                The darker the red the hotter the fire
              </GraphSubTitle>
              <HeatmapTransition
                width={width}
                height={500}
                data={Data}
                dtype="Wildfire"
              />
            </div>
          )}
          {dataType === "WindSpeed" && (
            <div className="ml-10 mr-10">
              <GraphTitle>Wind Speed</GraphTitle>
              <GraphSubTitle>
                Each circle represents different wind speed
              </GraphSubTitle>
              <GraphSubTitle>
                The wind speed is measured in meters per second
              </GraphSubTitle>
              <HeatmapTransition
                width={width}
                height={500}
                data={Data}
                dtype="wind"
              />
            </div>
          )}
          {dataType === "Aerosols" && (
            <div className="ml-10 mr-10">
              <GraphTitle>Aerosols</GraphTitle>
              <GraphSubTitle>
                Each dot represents Aerosol Optical Depth
              </GraphSubTitle>
              <GraphSubTitle>
                The lower the value the clearer the skies are
              </GraphSubTitle>
              <HeatmapTransition
                width={width}
                height={500}
                data={Data}
                dtype="aerosol"
              />
            </div>
          )}
        </div>
      )}
      {loading == false && errorLoading == false && (
        <LoadingText>Loading ...</LoadingText>
      )}
    </div>
  );
};

export default View;

const GraphDataType = styled.h1`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.25rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${COLORS.background};
`;

const GraphTitle = styled.h2`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${COLORS.background};
`;

const GraphSubTitle = styled.h3`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  padding-bottom: 0.5rem;
  white-space: nowrap;
  color: ${COLORS.background};
`;

const LoadingText = styled.h1`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.25rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${COLORS.background};
`;
