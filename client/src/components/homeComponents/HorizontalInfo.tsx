import { FC } from "react";
import styled from "styled-components";
import factorySvg from "../../assets/factory.svg";
import windTurbineSvg from "../../assets/windturbine.svg";
import natureSvg from "../../assets/nature2.svg";

type HorizontalInfoProps = {
  info: {
    title: string;
    text: string;
    number: number;
    position: "left" | "right";
  };
};

const HorizontalInfo: FC<HorizontalInfoProps> = (props) => {

  const svgPhoto = [factorySvg, "Vector drawing of a red factory", windTurbineSvg, "Vector drawing of a wind turbine", natureSvg, "Vector drawing of a nature scene"];
    
  if (props.info.position === "left") {
    return (
      <HorizontalArticleContainer>
        <HorizontalArticleImageContainer>
          <HorizontalArticleImage
            src={svgPhoto[props.info.number]}
            alt={svgPhoto[props.info.number + 1]}
          />
        </HorizontalArticleImageContainer>
        <HorizontalArticleContent>
          <HorizontalArticleTitle>{props.info.title}</HorizontalArticleTitle>
          <HorizontalArticleText>{props.info.text}</HorizontalArticleText>
        </HorizontalArticleContent>
      </HorizontalArticleContainer>
    );
  } else {
    return (
      <HorizontalArticleContainer>
        <HorizontalArticleContent>
          <HorizontalArticleTitle>{props.info.title}</HorizontalArticleTitle>
          <HorizontalArticleText>{props.info.text}</HorizontalArticleText>
        </HorizontalArticleContent>
        <HorizontalArticleImageContainer>
          <HorizontalArticleImage
            src={svgPhoto[props.info.number]}
            alt={svgPhoto[props.info.number + 1]}
          />
        </HorizontalArticleImageContainer>
      </HorizontalArticleContainer>
    );
  }
};

export default HorizontalInfo;

export const HorizontalArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 90vw;
    max-width: 90vw;
    height: 100%;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
`;

export const HorizontalArticleImageContainer = styled.div`
    width: 30%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    padding: 10px;

    @media (max-width: 768px) {
        width: 100%;
        height: 30%;
        order: -1;
    }
`;

export const HorizontalArticleImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
`;

export const HorizontalArticleContent = styled.div`
    width: 70%;
    height: 100%;
    padding: 0 20px;
    box-sizing: border-box;
`;

export const HorizontalArticleTitle = styled.h3`
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 10px;
    hieight: 60px;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const HorizontalArticleText = styled.p`
    font-size: 1rem;
    font-weight: 400;
    height: 100%;
    text-align: justify;
    text-justify: inter-word;
`;

export const HorizontalArticleLink = styled.button`
    font-size: 10px;
    font-weight: 300;
    color: #37505C;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid #37505C;
    border-radius: 10px;
    color: #fff;
    background-color: #2D3648;
    padding: 5px 10px;
`;
