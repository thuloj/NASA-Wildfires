import anime from "animejs/lib/anime.es.js";
import { FC, useEffect } from "react";
import styled from "styled-components";
import bgVideo from "../../assets/hero-bg.mp4";
import COLORS from "../../assets/Theme";

const Hero: FC = () => {
  const runAnimationTitle = () => {
    anime
      .timeline()
      .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml11 .line",
        translateX: [
          0,
          document.querySelector(".ml11 .letters")!.getBoundingClientRect()
            .width + 10,
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add({
        targets: ".ml11 .letter",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=775",
        delay: (el, i) => 34 * (i + 1),
      });
  };

  const runAnimationSubTitle = () => {
    anime
      .timeline()
      .add({
        targets: ".ml12 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 1500,
      })
      .add({
        targets: ".ml12 .line",
        translateX: [
          0,
          document.querySelector(".ml12 .letters")!.getBoundingClientRect()
            .width + 10,
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add({
        targets: ".ml12 .letter",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=775",
        delay: (el, i) => 34 * (i + 1),
      });
  };

  const runSVGAnimation = () => {
    anime({
      targets: "path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 3000,
      delay: function (el, i) {
        return i * 250;
      },
    }).finished.then(() => {
      anime({
        targets: ".lines",
        translateY: 50,
        scale: 1.2,
        direction: "alternate",
        duration: 2000,
        loop: true,
        easing: "easeInOutSine",
      });
    });
  };

  const scrollNextSection = () => {
    const nextSection = document.getElementById("learnMore");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Home";
    let textWrapperTitle: any;
    textWrapperTitle = document.querySelector(".ml11 .letters");
    textWrapperTitle.innerHTML = textWrapperTitle.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );
    let textWrapperSubTitle: any;
    textWrapperSubTitle = document.querySelector(".ml12 .letters");
    setTimeout(() => {
      document.getElementById("subTitle")?.classList.remove("hidden");
    }, 1000);
    textWrapperSubTitle.innerHTML = textWrapperSubTitle.textContent.replace(
      /([^\x00-\x80]|\w|\?)/g,
      "<span class='letter'>$&</span>"
    );

    runAnimationTitle();
    runAnimationSubTitle();
    setTimeout(() => {
      document.querySelector(".lines")?.classList.remove("hidden");
      runSVGAnimation();
    }, 3500);
  }, []);

  return (
    <HeroContainer>
      <HeroVideo id="hero-background-video" autoPlay loop muted>
        <source src={bgVideo} type="video/mp4"/>
      </HeroVideo>
      <HeroTitle className="ml11">
        <span className="text-wrapper">
          <span className="line line1"></span>
          <span className="letters">Wildfires and Renewable Energy</span>
        </span>
      </HeroTitle>
      <HeroSubtitle id="subTitle" className="ml12 hidden">
        <span className="text-wrapper">
          <span className="letters">
            How do wildfires affect renewable energy production?
          </span>
        </span>
      </HeroSubtitle>
      <div className="lines hidden absolute bottom-0 cursor-pointer" onClick={scrollNextSection}>
        <svg
          width="200px"
          height="200px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="matrix(-1, 0, 0, 1, 0, 0)rotate(180)"
          stroke="#ffffff"
        >
          <g>
            {" "}
            <path
              d="M18 15L12.2126 9.21261V9.21261C12.0952 9.09519 11.9048 9.09519 11.7874 9.21261V9.21261L6 15"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />{" "}
          </g>
        </svg>
      </div>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeroVideo = styled.video`
  width: 100%;
  height: 90vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 0;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  filter: grayscale(50%) blur(2px);
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  color: ${COLORS.text};
  font-weight: 800;
  text-align: center;
  margin: 0;
  padding: 0;
  scale: 1;
  transition: scale 0.5s ease-in-out, color 0.5s ease-in-out;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.text};
  font-weight: 600;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 20vh;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 10vh;
  }
`;
