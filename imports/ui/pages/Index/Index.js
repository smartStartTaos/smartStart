import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { Link } from 'react-router-dom';

const StyledIndex = styled.div`
  padding: 0px;
  text-align: center;
  border-radius: 3px;
  color: #fff;
  height: calc(100vh - 175px);
  display: flex;
  justify-content:center;
  flex-direction:column;

  img {
    width: 100px;
    height: auto;
  }

  h1 {
    font-size: 28px;
    color:#1d1d1d;
  }

  p {
    font-size: 18px;
    color: ${lighten(0.25, '#4285F4')};
  }

  > div {
    display: inline-block;
    margin: 10px 0 0;

    .btn:first-child {
      margin-right: 10px;
    }

    .btn {
      border: none;
    }
  }

  footer {
    margin: 20px -20px -20px;
    border-top: 1px solid ${darken(0.1, '#4285F4')};
    padding: 20px;

    p {
      font-size: 14px;
      line-height: 22px;
      color: ${lighten(0.35, '#4285F4')};
      margin: 0;
    }

    p a {
      color: ${lighten(0.35, '#4285F4')};
      text-decoration: underline;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 30px;

    footer {
      margin: 30px -30px -30px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 40px;

    footer {
      margin: 40px -40px -40px;
    }
  }
`;

const Index = (props) => {console.log(props); return(

  <StyledIndex>
    <div>
    <h1>SmartStart</h1>
    <Button bsStyle="primary"
      onClick={()=>{props.history.push('/login/')}}
    >login</Button>
    </div>
  </StyledIndex>
)};

export default Index;
