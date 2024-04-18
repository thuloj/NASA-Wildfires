import styled from "styled-components";
import COLORS from "../assets/Theme";
import wavesblackpurplegreySvg from "../assets/wavesblackpurplegrey.svg";
import wavesgreypupleblackSvg from "../assets/wavesgreypurpleblack.svg";

export const Background = styled.div`
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  width: 100%;
  height: 100%;
`;

export const InfoSection = styled.div`
  background-color: ${COLORS.background};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 6rem;
  padding-bottom: 5rem;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const WavesBlackPurpleGrey = styled.div`
  background-image: url("${wavesblackpurplegreySvg}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  aspect-ratio: 900/300;
  width: 100%;
`;

export const WavesGreyPurpleBlack = styled.div`
    background-image: url("${wavesgreypupleblackSvg}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    aspect-ratio: 900/300;
    width: 100%;
`;

export const RelatedArticlesContainer = styled.div`
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const SectionTitle = styled.h1`
    font-size: 3rem;
    color: ${COLORS.text};
    font-weight: 800;
    margin: 0;
    padding: 0;
    margin-bottom: 1.20rem;
    margin-top: 1.5rem;
    text-align: center;
`;