import styled from "styled-components";
import { SectionTitle } from "../components/componentStyles";
import COLORS from "../assets/Theme";

function Docs() {
  const data = {
    "2012": {
      Jan: [
        {
          acq_date: "1/1/2012",
          latitude: 32,
          longitude: -125,
          value: 0.07097575,
        },
        {
          acq_date: "1/1/2012",
          latitude: 32,
          longitude: -124.4,
          value: 0.071043454,
        },
      ],
      Feb: [
        {
          acq_date: "2/1/2012",
          latitude: 32,
          longitude: -125.2,
          value: 0.06897575,
        },
      ],
      Mar: [
        {
          acq_date: "3/1/2012",
          latitude: 32,
          longitude: -124.8,
          value: 0.070043454,
        },
        {
          acq_date: "3/15/2012",
          latitude: 32.5,
          longitude: -123.1,
          value: 0.06945747,
        },
      ],
      Apr: [
        {
          acq_date: "4/1/2012",
          latitude: 32.2,
          longitude: -122.5,
          value: 0.068923384,
        },
      ],
      May: [
        {
          acq_date: "5/1/2012",
          latitude: 32,
          longitude: -121.9,
          value: 0.06967366,
        },
      ],
      Jun: [
        {
          acq_date: "6/1/2012",
          latitude: 32.4,
          longitude: -121.3,
          value: 0.06925184,
        },
        {
          acq_date: "6/15/2012",
          latitude: 32.7,
          longitude: -120.6,
          value: 0.06844335,
        },
      ],
      Jul: [
        {
          acq_date: "7/1/2012",
          latitude: 32.5,
          longitude: -120,
          value: 0.06789343,
        },
      ],
      Aug: [
        {
          acq_date: "8/1/2012",
          latitude: 32.1,
          longitude: -119.4,
          value: 0.06658378,
        },
      ],
      Sep: [
        {
          acq_date: "9/1/2012",
          latitude: 32.3,
          longitude: -118.8,
          value: 0.067357264,
        },
        {
          acq_date: "9/15/2012",
          latitude: 32.6,
          longitude: -118.1,
          value: 0.06810782,
        },
      ],
      Oct: [
        {
          acq_date: "10/1/2012",
          latitude: 32.8,
          longitude: -117.5,
          value: 0.06890998,
        },
      ],
      Nov: [
        {
          acq_date: "11/1/2012",
          latitude: 32.9,
          longitude: -116.9,
          value: 0.05554031,
        },
      ],
      Dec: [
        {
          acq_date: "12/1/2012",
          latitude: 32.5,
          longitude: -115.9,
          value: 0.06554031,
        },
        {
          acq_date: "12/15/2012",
          latitude: 32.4,
          longitude: -115.3,
          value: 0.06654031,
        },
      ],
    },
  };

  const data2 = {
    "2012": [
      { Month: "December", thousandMegawatthours: 53.21901 },
      { Month: "November", thousandMegawatthours: 71.88846 },
      { Month: "October", thousandMegawatthours: 114.96503 },
      { Month: "September", thousandMegawatthours: 147.71952 },
      { Month: "August", thousandMegawatthours: 151.92856 },
      { Month: "July", thousandMegawatthours: 190.88439 },
      { Month: "June", thousandMegawatthours: 219.43108 },
      { Month: "May", thousandMegawatthours: 176.2742 },
      { Month: "April", thousandMegawatthours: 128.45068 },
      { Month: "March", thousandMegawatthours: 87.84759 },
      { Month: "February", thousandMegawatthours: 35.97647 },
      { Month: "January", thousandMegawatthours: 3.71487 },
    ],
  };

  return (
    <DocContainer>
      <SectionTitle className="mt-64">API Documentation</SectionTitle>
      <SubSection className="mb-10">
        <SectionSubTitle>
          How to call our two main API endpoints
        </SectionSubTitle>
        <p>
          Our API retrieves data based off of a{" "}
          <b>starting year and ending year</b>
        </p>

        <SubSubSection>
          <p>First API Call</p>
          <label htmlFor="example1">
            <strong>
              <em>Example:</em>
            </strong>{" "}
          </label>
          <code className="pr-4">
            https://CosmicComets.eastus.cloudapp.azure.com/node/heatmaps/:type/:startYr/:endYr
          </code>
          <Button className="copy">Copy</Button>
          <p>
            <b>Parameter type:</b> either 'Wildfires', 'Aerosols', or
            'WindSpeed'
          </p>
          <p>
            <b>Parameter startYr:</b> the starting year that you want{" "}
            <i>must be between 2012-2020</i> for Wildfires, and 2000-2023 for
            Aerosols and WindSpeed.
          </p>
          <p>
            <b>Parameter endYr:</b> the ending year that you want{" "}
            <i>must be between 2012-2020</i> for Wildfires, and 2000-2023 for
            Aerosols and WindSpeed.
          </p>
          <p>
            <b>Note:</b> For wildfires, the "value" field will be called
            "bright_ti4", a measurement from a satellite that measures the heat
            from its brightness temperature. For aerosoles, the "value" field
            represents "AOD", which stands for Aerosol Optical Depth, a
            measurement of the amount of aerosols in the air. For wind speed,
            the "value" field represents wind speed, which is the speed of the
            wind in meters per second. All these values corresopnd to the
            latitude and longitude per object returned.
          </p>
        </SubSubSection>

        <p>
          For the <em>heatmaps</em> endpoint all data is returned in basically
          the same format
        </p>
        <SubSubSection>
          <p>Example API Response</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </SubSubSection>
      </SubSection>

      <SubSection>
        <SectionSubTitle>How to call our second API endpoint</SectionSubTitle>
        <p>
          Our API retrieves data based off of a{" "}
          <b>starting year and ending year</b>
        </p>

        <SubSubSection>
          <p>Second API Call</p>
          <label htmlFor="example2">
            <strong>
              <em>Example:</em>
            </strong>{" "}
          </label>
          <code className="pr-2">
            https://CosmicComets.eastus.cloudapp.azure.com/node/energy/:type/:startYr/:endYr
          </code>
          <Button className="copy">Copy</Button>
          <p>
            <b>Parameter type:</b> either 'SolarEnergy' or 'WindEnergy'
          </p>
          <p>
            <b>Parameter startYr:</b> the starting year that you want{" "}
            <i>must be between 2001-2023</i>, inclusive.
          </p>
          <p>
            <b>Parameter endYr:</b> the ending year that you want{" "}
            <i>must be between 2001-2023</i>, inclusive.
          </p>
          <p>
            <b>Note:</b> All energy measured in thousand megawatt hours.
          </p>
        </SubSubSection>

        <p>
          For the <em>energy</em> endpoint all data is returned in the same
          format
        </p>
        <SubSubSection>
          <p>Example API Response</p>
          <pre>{JSON.stringify(data2, null, 2)}</pre>
        </SubSubSection>
      </SubSection>
    </DocContainer>
  );
}

export default Docs;

const DocContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #4e5055;
`;

const SectionSubTitle = styled.h2`
  width: calc(100% - 2rem);
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  padding: 0;
  text-align: center;
  color: black;
`;

const SubSection = styled.div`
  width: 90%;
  border-radius: 1.5rem;
  background-color: #fffded;
  transition: all 0.25s ease-in-out;
  padding: 4rem;
`;

const SubSubSection = styled.div`
  width: 90%;
  border-radius: 1.5rem;
  background-color: white;
  transition: all 0.25s ease-in-out;
  padding: 2rem;
  margin: 1rem;
`;

const Button = styled.button`
  width: fit-content;
  height: fit-content;

  margin: 0;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: white;
  background-color: #121212;
  //border: 2px solid #d747b3;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #d747b3;
  }
`;

const Input = styled.input`
  height: 100%;
  width: 70%;
  border-radius: 0.5rem;
  background-color: white;
  padding-left: 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: black;
  text-align: left;
  transition: all 0.2s ease-in-out;
  border: black solid 1px;
  margin: 10px;

  &:hover {
    background-color: #fbeef8;
  }

  &:focus {
    background-color: #fbeef8;
  }
`;
