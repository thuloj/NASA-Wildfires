import { FC, useEffect, useState } from "react";
import axios from "axios";
import anime from "animejs";
import { InView } from "react-intersection-observer";
import VerticalArticle from "./VerticalArticle";
import styled from "styled-components";
import "../../assets/RelatedArticles.css";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import { SectionTitle } from "../componentStyles";

type ArticleData = {
  articles: {
    title: string;
    abstract: string;
    image: string;
    imageAlt: string;
    url: string;
  }[];
};

const RelatedArticles: FC = () => {
  const [articlesList, setArticles] = useState<ArticleData>();

  const rightArrow = () => {
    return ``;
  };

  useEffect(() => {
    axios
      .get("https://api.npoint.io/b20b2ac8e687130d20e5")
      .then((response) => {
        console.log(response.data.articles);
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        handleLeftArrowClick();
      } else if (e.key === "ArrowRight") {
        handleRightArrowClick();
      }
    });
  }, []);

  const chooseNextState = (boxGroup: any, direction: string) => {
    if (boxGroup.getAttribute("data-status") === "active") {
      direction === "left"
        ? boxGroup.setAttribute("data-status", "right")
        : boxGroup.setAttribute("data-status", "left");
    } else if (boxGroup.getAttribute("data-status") === "left") {
      direction === "left"
        ? boxGroup.setAttribute("data-status", "active")
        : boxGroup.setAttribute("data-status", "far-left");
    } else if (boxGroup.getAttribute("data-status") === "far-left") {
      direction === "left"
        ? boxGroup.setAttribute("data-status", "left")
        : boxGroup.setAttribute("data-status", "far-right");
    } else if (boxGroup.getAttribute("data-status") === "far-right") {
      direction === "left"
        ? boxGroup.setAttribute("data-status", "far-left")
        : boxGroup.setAttribute("data-status", "right");
    } else if (boxGroup.getAttribute("data-status") === "right") {
      direction === "left"
        ? boxGroup.setAttribute("data-status", "far-right")
        : boxGroup.setAttribute("data-status", "active");
    }
  };

  const handleLeftArrowClick = () => {
    const boxGroups = document.querySelectorAll(".article-group");
    boxGroups.forEach((boxGroup) => {
      chooseNextState(boxGroup, "left");
    });
  };

  const handleRightArrowClick = () => {
    const boxGroups = document.querySelectorAll(".article-group");
    boxGroups.forEach((boxGroup) => {
      chooseNextState(boxGroup, "right");
    });
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
        className="w-screen"
      >
        <SectionTitle>Related Articles</SectionTitle>
        <Carousel>
          <Center className="">
            <div className="article-groups">
              {articlesList && articlesList.articles.length > 0 && (
                <div>
                  <div
                    className="article-group"
                    data-index="0"
                    data-status="active"
                  >
                    <VerticalArticle article={articlesList!.articles[0]} />
                    <div onClick={handleLeftArrowClick}>
                      <LeftArrow />
                    </div>
                    <div onClick={handleRightArrowClick}>
                      <RightArrow />
                    </div>
                  </div>
                  <div
                    className="article-group"
                    data-index="1"
                    data-status="right"
                  >
                    <VerticalArticle article={articlesList!.articles[1]} />
                    <div onClick={handleLeftArrowClick}>
                      <LeftArrow />
                    </div>
                    <div onClick={handleRightArrowClick}>
                      <RightArrow />
                    </div>
                  </div>
                  <div
                    className="article-group"
                    data-index="2"
                    data-status="far-right"
                  >
                    <VerticalArticle article={articlesList!.articles[2]} />
                    <div onClick={handleLeftArrowClick}>
                      <LeftArrow />
                    </div>
                    <div onClick={handleRightArrowClick}>
                      <RightArrow />
                    </div>
                  </div>
                  <div
                    className="article-group"
                    data-index="3"
                    data-status="left"
                  >
                    <VerticalArticle article={articlesList!.articles[3]} />
                    <div onClick={handleLeftArrowClick}>
                      <LeftArrow />
                    </div>
                    <div onClick={handleRightArrowClick}>
                      <RightArrow />
                    </div>
                  </div>
                  <div
                    className="article-group"
                    data-index="4"
                    data-status="far-left"
                  >
                    <VerticalArticle article={articlesList!.articles[4]} />
                    <div onClick={handleLeftArrowClick}>
                      <LeftArrow />
                    </div>
                    <div onClick={handleRightArrowClick}>
                      <RightArrow />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Center>
        </Carousel>
      </InView>
    </div>
  );
};

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Carousel = styled.div`
  align-items: center;
`;
export default RelatedArticles;
