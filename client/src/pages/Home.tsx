// https://tobiasahlin.com/moving-letters/#11
// This is where I got the code for the animation
// I'm trying to animate the title on the home page

import { FC } from "react";
import { Background } from "../components/componentStyles";
import {
  InfoSection,
  RelatedArticlesContainer,
} from "../components/componentStyles";
import LearnMore from "../components/homeComponents/LearnMore";
import Hero from "../components/homeComponents/Hero";
import RelatedArticles from "../components/homeComponents/RelatedArticles";
import styled from "styled-components";
import COLORS from "../assets/Theme";

const Home: FC = () => {
  return (
    <Background>
      <Hero />
      {/* <GreyDivider>
        <GreySVG data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <Path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"></Path>
        </GreySVG>
      </GreyDivider> */}
      <InfoSection id="learnMore">
        <LearnMore />
      </InfoSection>
      <RelatedArticlesContainer>
        <RelatedArticles />
      </RelatedArticlesContainer>
    </Background>
  );
};


const GreyDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  fill: ${COLORS.background};
`
const GreySVG = styled.svg`
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 146px;
`
const Path = styled.path`
  fill: ${COLORS.background};
`
export default Home;
