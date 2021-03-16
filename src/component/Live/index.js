import React, { useEffect } from "react";
import flvjs from "flv.js";
import styled from "styled-components";

const VideoWrapper = styled.div`
  position: fixed;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  top: ${(props) => (props.show ? 0 : "50vh")};
  left: ${(props) => (props.show ? 0 : "50vw")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.3s;
  overflow: hidden;
  width: ${(props) => (props.show ? "100vw" : 0)};
  height: ${(props) => (props.show ? "100vh" : 0)};
`;

const Title = styled.div`
  position: fixed;
  top: 0;
  z-index: 11;
  width: 100vw;
  height: 60px;
  padding-left: 60px;
  text-align: left;
  transition: opacity 0.5s;
  opacity: ${(props) => (props.show ? 1 : 0)};
  span {
    font-size: 24px;
    font-weight: bold;
    line-height: 60px;
    padding: 0 10px;
    border-radius: 5px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: #eee;
      /* font-size: 25px; */
    }
  }
`;

function Live({ data = {}, show = false, onClose = () => {} }) {
  const { url = "", title = "" } = data;
  useEffect(() => {
    if (!url) return;
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById("videoElement");
      var flvPlayer = flvjs.createPlayer({
        type: "flv",
        url,
        config: {
          enableWorker: true,
          enableStashBuffer: false,
          stashInitialSize: 128,
        },
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
      flvPlayer.on(flvjs.Events.ERROR, (errType, errDetail) => {
        console.log(errType, errDetail);
      });
    }
  }, [url]);
  return (
    <VideoWrapper show={show}>
      <Title show={show}>
        <span onClick={onClose}>BACK</span>
      </Title>
      <h3>{title}</h3>
      <video id="videoElement" controls className="video" />
    </VideoWrapper>
  );
}

export default Live;
