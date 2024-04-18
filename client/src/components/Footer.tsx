import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoPic from "../assets/Cosmic_Comets_Logo.png";

function Footer() {
  const [extendedFooter, setExtendedFooter] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setExtendedFooter(true);
    } else {
      setExtendedFooter(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <FooterContainer extend={extendedFooter}>
      <FooterInnerContainer>
        <FooterLeft>
          <Logo src={LogoPic} />
          <div>Copyright 2023 - Cosmic Comets</div>
        </FooterLeft>
        <FooterRight>
          <StyledLinkContainer>
            <StyledLink to="/PrivPol">Privacy Policy</StyledLink>
            <StyledLink to="/TandC">Terms & Conditions</StyledLink>
            <StyledLink to="/Cookies">Cookie Policy</StyledLink>
            <StyledLink to="/Contact">Contact</StyledLink>
          </StyledLinkContainer>
        </FooterRight>
      </FooterInnerContainer>
      <FooterExtendedContainer></FooterExtendedContainer>
      {extendedFooter && (
        <FooterExtendedContainer>
          <Logo src={LogoPic} />
          <div>Copyright 2023 - Cosmic Comets</div>
          <StyledLink to="/PrivPol">Privacy Policy</StyledLink>
          <StyledLink to="/TandC">Terms & Conditions</StyledLink>
          <StyledLink to="/Cookies">Cookie Policy</StyledLink>
          <StyledLink to="/Contact">Contact</StyledLink>
        </FooterExtendedContainer>
      )}
    </FooterContainer>
  );
}

interface FooterProps {
  extend: boolean;
}

const FooterContainer = styled.nav.attrs((props: FooterProps) => ({
  extend: props.extend,
}))<any>`
  width: 100%;
  height: ${(props) => (props.extend ? "50vh" : "220px")};
  background-color: #273e47;
  display: flex;
  flex-direction: column;
  color: white;
`;

const FooterInnerContainer = styled.div`
  width: auto;
  height: 80px;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  } ;
`;

const FooterLeft = styled.div`
  flex: 30%;
  /* display: flex; */
  justify-content: flex-start;
  padding-left: 5%;
`;

const FooterRight = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3vw;
  position: relative;
`;

const Logo = styled.img`
  margin: 10px;
  height: auto;
  max-width: 140px;
`;

const StyledLinkContainer = styled.div`
  position: absolute;
  bottom: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #e0dbdb;
  font-size: medium;
  margin: 10px;
`;

const FooterExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  } ;
`;

export default Footer;
