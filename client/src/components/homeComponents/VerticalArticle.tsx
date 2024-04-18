import { FC } from "react";
import styled from "styled-components";

type VerticalArticleProps = {
  article: {
    title: string;
    abstract: string;
    image: string;
    imageAlt: string;
    url: string;
  };
};

function truncate(input: any, size: any) {
  if (input.length > size) {
    return input.substring(0, size) + '...';
 }
 return input;
}

const VerticalArticle: FC<VerticalArticleProps> = (props) => {

  return (
    <VerticalArticleContainer onClick={() => location.assign(props.article.url)}>
      <VerticalArticleImageContainer>
        <VerticalArticleImage
          src={props.article.image}
          alt={props.article.imageAlt}
        />
      </VerticalArticleImageContainer>
      <VerticalArticleContent>
        <VerticalArticleTitle>{truncate(props.article.title, 150)}</VerticalArticleTitle>
        <VerticalArticleText>{truncate(props.article.abstract, 205)}</VerticalArticleText>
      </VerticalArticleContent>
    </VerticalArticleContainer>
  );
};

export default VerticalArticle;

const VerticalArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 480px;
  height: 440px;
  overflow: hidden;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: white;
  border-radius: 10px;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: whitesmoke 0px 4px 12px;
  }

`;

const VerticalArticleImageContainer = styled.div`
  width: 100%;
`;

const VerticalArticleImage = styled.img`
  url: ${props => props.src};
  border-radius: 10px 10px 0 0;
  object-fit: cover;
  height: 270px;
  width: 100%;
`;

const VerticalArticleContent = styled.div`
  width: 100%;
  height: 280px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const VerticalArticleTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0 10px 0;
  color: black;
  height: 80px;
  overflow: hidden;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const VerticalArticleText = styled.p`
  font-size: 12px;
  font-weight: 400;
  height: 90px;
  overflow: hidden;
  text-align: justify;
  color: black;

  @media (max-width: 500px) {
    font-size: 10px;
  }
`;