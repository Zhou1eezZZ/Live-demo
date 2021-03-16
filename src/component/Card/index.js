import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 5px;
  background-color: white;
  overflow: hidden;
  border: 1px solid #ccc;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

function Card({ data = {}, ...props }) {
  const { img, title } = data;

  return (
    <CardWrapper {...props}>
      <img src={img} alt={title} />
      <span>{title}</span>
    </CardWrapper>
  );
}

export default Card;
