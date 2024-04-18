import { FC, useEffect, useState } from "react";
import axios from "axios";
import anime from "animejs";
import { InView } from "react-intersection-observer";
import { SectionTitle } from "../componentStyles";
import styled from "styled-components";
import HorizontalInfo from "./HorizontalInfo";
import factorySvg from "../../assets/factory.svg";
import windTurbineSvg from "../../assets/windturbine.svg";
import natureSvg from "../../assets/nature2.svg";

type LearnMoreData = {
  info: {
    title: string;
    text: string;
    number: number;
    position: "left" | "right";
  }[];
};

const LearnMore: FC = () => {
  const [learnMoreData, setLearnMoreData] = useState<LearnMoreData>();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const [angle, setAngle] = useState(0);
  const [boxes, setBoxes] = useState<string[]>(["box1", "box2", "box3"]);

  useEffect(() => {
    axios
      .get<LearnMoreData>("https://api.npoint.io/5adb360971d2619f663d")
      .then((response) => {
        setLearnMoreData(response.data);
      });
    setInterval(updateValues, 100);
  }, []);

  const updateValues = () => {
    const w = document.getElementById("learnMoreContainer")?.clientWidth!;
    const h = document.getElementById("learnMoreContainer")?.clientHeight!;
    setWidth(w);
    setHeight(h);
    setLineWidth(Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)));
    setAngle(Math.atan(h / w) * (180 / Math.PI));
  };

  const playStaggerAnimation = (e: any) => {
    anime({
      targets: e.target,
      translateX: [-100, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 1000,
      delay: anime.stagger(500),
    });
  };

  const playStaggerLeave = (e: any) => {
    anime({
      targets: e.target,
      translateX: [0, -100],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 1000,
      delay: anime.stagger(500),
    });
  };

  const handleBoxes = (box: number) => {
    let b = ["", "", ""];
    for (let i = 0; i < boxes.length; i++) {
      if (i === box) {
        b[i] = "active";
      } else {
        b[i] = "inactive";
      }
    }
    setBoxes(b);
    setActive(true);
    const check = setTimeout(() => {
      document
        .getElementById(`box${box}`)
        ?.addEventListener("mouseleave", () => {
          setBoxes(["box1", "box2", "box3"]);
          setActive(false);
          clearInterval(check);
        });
    }, 1000);
    check;
  };

  return (
    <div>
      <InView
        as="div"
        onChange={(inView, e) => {
          if (inView) {
            playStaggerAnimation(e);
          } else {
            playStaggerLeave(e);
          }
        }}
        threshold={0.5}
      >
        <SectionTitle>Why This Matters</SectionTitle>
      </InView>
      {learnMoreData && window.innerWidth > 768 && (
        <Box id="learnMoreContainer">
          <LineLeft active={active} width={lineWidth} angle={angle} />
          <LineRight active={active} width={lineWidth} angle={angle} />
          <BoxTop
            id="box0"
            width={width}
            height={height}
            active={boxes[0]}
            onMouseEnter={() => {
              handleBoxes(0);
            }}
          >
            <BoxTitle active={boxes[0]}>{learnMoreData.info[0].title}</BoxTitle>
            <InfoContainer active={boxes[0]}>
              <BoxText active={boxes[0]}>{learnMoreData.info[0].text}</BoxText>
              <BoxImage
                active={boxes[0]}
                src={factorySvg}
                alt="Vector drawing of a red factory"
              />
            </InfoContainer>
          </BoxTop>
          <BoxLeft
            id="box1"
            width={width}
            height={height}
            active={boxes[1]}
            onMouseEnter={() => {
              handleBoxes(1);
            }}
          >
            <BoxTitle active={boxes[1]}>{learnMoreData.info[1].title}</BoxTitle>
            <InfoContainer active={boxes[1]}>
              <BoxText active={boxes[1]}>{learnMoreData.info[1].text}</BoxText>
              <BoxImage
                active={boxes[1]}
                src={windTurbineSvg}
                alt="Vector drawing of a wind turbine"
              />
            </InfoContainer>
          </BoxLeft>
          <BoxRight
            id="box2"
            width={width}
            height={height}
            active={boxes[2]}
            onMouseEnter={() => {
              handleBoxes(2);
            }}
          >
            <BoxTitle active={boxes[2]}>{learnMoreData.info[2].title}</BoxTitle>
            <InfoContainer active={boxes[2]}>
              <BoxText active={boxes[2]}>{learnMoreData.info[2].text}</BoxText>
              <BoxImage
                active={boxes[2]}
                src={natureSvg}
                alt="Vector drawing of a nature scene"
              />
            </InfoContainer>
          </BoxRight>
        </Box>
      )}
      {learnMoreData &&
        window.innerWidth <= 768 &&
        learnMoreData?.info.map((info) => (
          <InView
            as="div"
            onChange={(inView, e) => {
              if (inView) {
                playStaggerAnimation(e);
              } else {
                playStaggerLeave(e);
              }
            }}
            threshold={0.5}
          >
            <HorizontalInfo info={info} />
          </InView>
        ))}
    </div>
  );
};

export default LearnMore;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin: 0 auto;
  margin-top: 5rem;
  height: 80vh;
  position: relative;
`;

interface LineProps {
  active: boolean;
  width: number;
  angle: number;
}

const LineLeft = styled.div<LineProps>`
  width: ${(props) => props.width / 2}px;
  height: 10px;
  background-color: white;
  position: absolute;
  transform-origin: left;
  transform: rotate(${(props) => props.angle}deg);
  z-index: 1;
  ${(props) => {
    if (props.active)
      return "animation: lineLeftAnimation .5s ease-in-out forwards;";
    else return "animation: lineLeftAnimationReverse .5s ease-in-out forwards;";
  }}
  @keyframes lineLeftAnimation {
    0% {
      transform: rotate(${(props) => props.angle}deg);
      width: ${(props) => props.width / 2}px;
    }
    100% {
      transform: rotate(0deg);
      width: 90vw;
    }
  }

  @keyframes lineLeftAnimationReverse {
    0% {
      transform: rotate(0deg);
      width: 90vw;
    }
    100% {
      transform: rotate(${(props) => props.angle}deg);
      width: ${(props) => props.width / 2}px;
    }
  }
`;

const LineRight = styled.div<LineProps>`
  width: ${(props) => props.width}px;
  height: 10px;
  background-color: white;
  position: absolute;
  left: 0;
  top: 100%;
  transform-origin: left;
  transform: rotate(-${(props) => props.angle}deg);
  z-index: 1;
  ${(props) => {
    if (props.active)
      return "animation: lineRightAnimation .5s ease-in-out forwards;";
    else
      return "animation: lineRightAnimationReverse .5s ease-in-out forwards;";
  }}
  @keyframes lineRightAnimation {
    0% {
      transform: rotate(-${(props) => props.angle}deg);
      width: ${(props) => props.width}px;
      transform-origin: left;
    }
    100% {
      transform: rotate(0deg);
      width: 90vw;
    }
  }

  @keyframes lineRightAnimationReverse {
    0% {
      transform: rotate(0deg);
      width: 90vw;
    }
    100% {
      transform: rotate(-${(props) => props.angle}deg);
      width: ${(props) => props.width}px;
    }
  }
`;

interface BoxProps {
  width: number;
  height: number;
  active: String;
}

const BoxTop = styled.div<BoxProps>`
  width: ${(props) => props.width / 1.5}px;
  height: ${(props) => props.height / 3}px;
  position: absolute;
  top: 0;
  left: 15%;
  z-index: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out, width 0.5s ease-in-out,
    height 0.5s ease-in-out, scale 0.5s ease-in-out, left 0.5s ease-in-out,
    top 0.5s ease-in-out;

  ${(props) => {
    if (props.active === "active")
      return `width: 90vw; height: calc(80vh - 10px); top: 10px; left: 0; z-index: 1;`;
    else if (props.active === "inactive") return `scale: 0; z-index: 0;`;
  }}
`;

const BoxLeft = styled.div<BoxProps>`
  width: ${(props) => props.width / 3}px;
  height: ${(props) => props.height / 1.5}px;
  position: absolute;
  top: 15%;
  left: 0;
  z-index: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out, width 0.5s ease-in-out,
    height 0.5s ease-in-out, scale 0.5s ease-in-out, left 0.5s ease-in-out,
    top 0.5s ease-in-out;

  ${(props) => {
    if (props.active === "active")
      return `width: 90vw; height: calc(80vh - 10px); top: 10px; left: 0; z-index: 1;`;
    else if (props.active === "inactive") return `scale: 0; z-index: 0;`;
  }}
`;

const BoxRight = styled.div<BoxProps>`
  width: ${(props) => props.width / 2}px;
  height: ${(props) => props.height / 1.5}px;
  position: absolute;
  top: 35%;
  right: 0;
  z-index: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out, width 0.5s ease-in-out,
    height 0.5s ease-in-out, scale 0.5s ease-in-out, left 0.5s ease-in-out,
    top 0.5s ease-in-out, right 0.5s ease-in-out;

  ${(props) => {
    if (props.active === "active")
      return `width: 90vw; height: calc(80vh - 10px); top: 10px; right: 0; z-index: 1;`;
    else if (props.active === "inactive") return `scale: 0; z-index: 0;`;
  }}
`;

interface TextProps {
  active: String;
}

const BoxTitle = styled.div<TextProps>`
  font-size: 2rem;
  color: white;
  font-weight: 700;
  padding-top: 0rem;
  padding-bottom: 0rem;
  transition: font-size 0.5s ease-in-out, padding-top 0.5s ease-in-out,
    padding-bottom 0.5s ease-in-out;

  ${(props) => {
    if (props.active === "active")
      return `font-size: 2.25rem; padding-top: 2.25rem; padding-bottom: 2.25rem;`;
    else return `font-size: 2rem; padding-top: 0rem; padding-bottom: 0rem;`;
  }}
`;

const BoxText = styled.div<TextProps>`
  text-align: left;
  font-size: 1.5rem;
  color: white;
  font-weight: 400;
  width: 0px;
  height: 0px;
  overflow: hidden;
  transition: width 0.5s ease-in-out, height 0.5s ease-in-out;

  ${(props) => {
    if (props.active === "active") return ` width: 50%; height: 100%;`;
    else return ` width: 0px; height: 0px;`;
  }}

  @media (max-width: 1080px) {
    font-size: 1.25rem;
  }
`;

const BoxImage = styled.img<TextProps>`
  width: 0px;
  height: 0px;
  overflow: hidden;
  border-radius: 10px;
  object-fit: cover;
  padding: 0px;
  transition: width 0.5s ease-in-out, height 0.5s ease-in-out,
    padding 0.5s ease-in-out;

  ${(props) => {
    if (props.active === "active")
      return ` width: 50%; height: 100%; padding: 10px;`;
    else return ` width: 0px; height: 0px; padding: 0px;`;
  }}
`;

const InfoContainer = styled.div<TextProps>`
  display: flex;
  flex-direction: row;
  scale: 0;
  transition: scale 0.5s ease-in-out;

  ${(props) => {
    if (props.active === "active") return `scale: 1;`;
    else return `scale: 0;`;
  }}
`;
