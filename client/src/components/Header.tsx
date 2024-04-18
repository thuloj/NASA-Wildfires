import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoPic from "../assets/Cosmic_Comets_Logo.png";
import anime from "animejs";

function Header() {
  const [extendedHeader, setExtendedHeader] = useState(false);
  // will get the reference to the div element
  const extendedContainerRef = useRef<HTMLDivElement>(null);

  const openHeader = () => {
    anime({
      targets: extendedContainerRef.current,
      height: "100vh",
      duration: 1000,
      easing: "easeInOutQuad",
    });
  };

  const closeHeader = () => {
    anime({
      targets: extendedContainerRef.current,
      height: ["100vh", "0vh"],
      duration: 1000,
      easing: "easeInOutQuad",
    });
  };

  return (
    <HeaderContainer extend={extendedHeader}>
      <HeaderInnerContainer>
        <HeaderLeft>
          <Logo src={LogoPic} />
        </HeaderLeft>
        <HeaderRight>
          <HeaderNavigationContainer>
            <StyledLink to="/node/final">Home</StyledLink>
            <StyledLink to="/node/Data">Data</StyledLink>
            <StyledLink to="/node/Analysis">Analysis</StyledLink>
            <StyledLink to="/node/Docs">API Docs</StyledLink>
            <ExpandBar
              onClick={() => {
                if (!extendedHeader) openHeader();
                else closeHeader();
                setExtendedHeader((current) => !current);
              }}
            >
              {extendedHeader ? <> &#10005; </> : <> &#8801; </>}
            </ExpandBar>
          </HeaderNavigationContainer>
        </HeaderRight>
      </HeaderInnerContainer>
      {/* {extendedHeader && ( */}
      <HeaderExtendedContainer ref={extendedContainerRef}>
        <StyledLinkWhileExtended to="/node/final">Home</StyledLinkWhileExtended>
        <StyledLinkWhileExtended to="/node/Data">Data</StyledLinkWhileExtended>
        <StyledLinkWhileExtended to="/node/Analysis">
          Analysis
        </StyledLinkWhileExtended>
        <StyledLinkWhileExtended to="/node/Docs">
          API Docs
        </StyledLinkWhileExtended>
      </HeaderExtendedContainer>
      {/* )} */}
    </HeaderContainer>
  );
}

interface HeaderProps {
  extend: boolean;
}

const HeaderContainer = styled.nav.attrs((props: HeaderProps) => ({
  extend: props.extend,
}))`
  width: 100%;
  background-color: #273e47;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
  }
`;

const HeaderLeft = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-start;
  padding-left: 5%;
`;

const HeaderRight = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3vw;
`;

const HeaderInnerContainer = styled.div`
  width: auto;
  height: 80px;
  display: flex;
`;

const HeaderNavigationContainer = styled.div`
  display: flex;
`; //navbarlinkcontainer

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: large;
  margin: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLinkWhileExtended = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: large;
  margin: 10px;
`;

const StyledButton = styled(Link)`
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 600;
  margin: 0 10px;
  width: 10vw;
  padding: 10px 0;
  /* box-shadow: 0 0 20px #290621; */
  transition: 0.4s;
  color: black;
  background-color: #797b84;
  text-align: center;

  &:hover {
    color: black;
    box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
    background-color: #fffded;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledButtonExtended = styled(Link)`
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 600;
  margin: 10px;
  width: 80px;
  padding: 10px 0;
  /* box-shadow: 0 0 20px #290621; */
  transition: 0.4s;
  color: black;
  background-color: #797b84;
  text-align: center;

  &:hover {
    color: black;
    box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
    background-color: #fffded;
  }
`;

const Logo = styled.img`
  margin: 10px;
  height: auto;
  max-width: 180px;
`;

const ExpandBar = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const HeaderExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`;
export default Header;
