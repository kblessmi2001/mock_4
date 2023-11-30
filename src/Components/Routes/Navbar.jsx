import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navbar = () => {
  return (
    <DIV>
     
      <Link to={"/"}>Register
      </Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/forum"}>Forum Page</Link>
     
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
  gap: 20px;
  align-items: center;
  padding: 0 20px;
`;