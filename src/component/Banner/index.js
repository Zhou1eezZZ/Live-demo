import React from "react";
import styled from "styled-components";

const BannerWrapper = styled.div`
  position: fixed;
  top: 0;
  width: ${(props) => (props.show ? "100vw" : 0)};
  height: ${(props) => (props.show ? "40px" : 0)};
  z-index: 12;
  background-color: rgba(206, 17, 38, 1);
  color: white;
  font-size: 16px;
  padding-left: 60px;
  line-height: 40px;
  text-align: left;
  overflow: hidden;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.3s;
`;

function Banner({ show = false, info = "" }) {
  return <BannerWrapper show={show}>{info}</BannerWrapper>;
}

export default Banner;
