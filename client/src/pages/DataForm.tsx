import { useState, useRef } from "react";
import View from "../components/dataComponents/View";
import { SectionTitle } from "../components/componentStyles";
import COLORS from "../assets/Theme";
import styled from "styled-components";
import { toast, Toaster } from "react-hot-toast";

const FormX = () => {
  const [formValues, setFormValues] = useState({
    dataType: "",
    startYear: "",
    endYear: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    //console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
    setIsFormVisible(false);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // error checking
    if (
      Number(formValues.startYear) > Number(formValues.endYear) ||
      Number(formValues.startYear) < 2001 ||
      Number(formValues.startYear) > 2023 ||
      Number(formValues.endYear) > 2023 ||
      Number(formValues.endYear) < 2001
    ) {
      toast.error("Please enter valid years");
      return
    }
    setIsFormVisible(true);
  };

  return (
    <FormContainer>
      <Toaster />
      <SectionTitle>Data Visualization</SectionTitle>
      <SectionSubTitle>
        Choose any graph style and the range of data you would like to see!
      </SectionSubTitle>
      <Container>
        <SideBar>
          <form id="formu" onSubmit={handleSubmit} className="row">
            <div>
              <CheckBoxGroupTitle>Data Type</CheckBoxGroupTitle>
              <Select
                name="dataType"
                value={formValues?.dataType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="WindEnergy">Wind Energy</option>
                <option value="SolarEnergy">Solar Energy</option>
                <option value="Aerosols">Aerosols</option>
                <option value="Wildfire">Wildfires</option>
                <option value="WindSpeed">Wind Speed</option>
              </Select>
            </div>
            <div>
              <CheckBoxGroupTitle>Start Year</CheckBoxGroupTitle>
              <Input
                type="number"
                placeholder="2001-2023"
                name="startYear"
                value={formValues.startYear}
                onChange={handleChange}
              />
            </div>
            <div>
              <CheckBoxGroupTitle>End Year</CheckBoxGroupTitle>
              <Input
                type="number"
                placeholder="2001-2023"
                name="endYear"
                value={formValues.endYear}
                onChange={handleChange}
              />
            </div>
            <ButtonContainer>
              <Button type="submit">Submit</Button>
            </ButtonContainer>
          </form>
        </SideBar>
        <ContentBox id="cont">
          {isFormVisible ? (
            <View data={formValues} />
          ) : (
            <h1>
              please select a datatype, start year, and end year! then click
              submit
            </h1>
          )}
        </ContentBox>
      </Container>
    </FormContainer>
  );
};

export default FormX;

const FormContainer = styled.div`
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
  color: ${COLORS.text};
`;

const Container = styled.div`
  width: 95%;
  border-radius: 1.5rem;
  background-color: #f4cdea;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  grid-template-rows: 0.2fr 1fr;
  grid-template-areas:
    "sidebar graph graph graph graph"
    "sidebar graph graph graph graph"
    "sidebar graph graph graph graph";
  text-align: center;
  //grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 1fr;
    grid-template-areas:
      "sidebar"
      "graph";
  }
  color: white;
`;

const SideBar = styled.div`
  grid-area: sidebar;
  padding: 0 1rem 1rem 1rem;
  float: left;
`;

const ContentBox = styled.div`
  color: black;
  grid-area: graph;
  background-color: #fffded;
  border-radius: 0 1rem 1rem 0;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const CheckBoxGroupTitle = styled.h3`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  white-space: nowrap;
  color: ${COLORS.background};
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: white;
  padding-left: 0.5rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: black;
  text-align: left;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #fbeef8;
  }

  &:focus {
    background-color: #fbeef8;
  }
`;

const Input = styled.input`
  height: 100%;
  border-radius: 0.5rem;
  background-color: white;
  padding-left: 1rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: black;
  text-align: left;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #fbeef8;
  }

  &:focus {
    background-color: #fbeef8;
  }
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: right;
  justify-content: right;
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  padding: 0;
`;
