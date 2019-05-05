import styled from "styled-components";

/***********************      
           BUTTON SECTION 
           **********************/
export const Wrapper = styled.div`
  color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh; //max height
  width: 100%;
  font-family: "Roboto", sans-serif;
  position: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("https://avante.biz/wp-content/uploads/Wallpaper-Red/Wallpaper-Red-001.jpg");
`;

export const Main = styled.div`
  
  align-items: center;
  justyfy-content: center;
  width: 350px;
  margin: 0 auto;
`;

export const Button = styled.button`
background: papayawhip;
color: palevioletred;
padding: 5px 10px
border-radius: 5px;

  `;

export const SpinButton = styled.button`
  border: none;
  outline: none;
  background: red;
  height: 50px;
  width: 150px;

  display: ${props => (props.hide ? "none" : "inline-block")};
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  cursor: pointer;
  color: #fff;

  padding: 12px;
  margin: 12px;
  position: relative;
  left: 130px;
  border-radius: 5px;

  :hover {
    border: 2px solid white;
    background-color: green;
    text-align: center;
    color: white;
    font-size: 20px;
    transition: 0.2s ease-out;
  }

  :active {
    font-size: 21px;
  }
`;

export const ResetButton = styled.button`
  border: none;
  outline: none;
  background: red;
  height: 50px;8
  width: 150px;

  font-family: "Roboto", sans-serif;
  font-size: 20px;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  color: #fff;

  display: ${props => (props.hide ? "none" : "inline-block")};
  padding: 12px;
  margin: 12px;

  border-radius: 5px;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
  transition: opacity 0.24s linear;

  padding: 12px;
  margin: 12px;
  position: relative;
  left: 130px;

  :hover {
    border: 2px solid white;
    background-color: green;
    text-align: center;
    color: white;
    font-size: 20px;
    transition: 0.2s ease-out;
  }

  :active {
    font-size: 21px;
  }
`;

export const ButtonLabel = styled.span`
  padding: 12px;
  white-space: nowrap;
`;

/***********************      
           WHEEL SECTION 
           **********************/
export const Plate = styled.div`
  background-color: gray;
  width: 300px;
  height: 300px;
  margin: 12px;
  border-radius: 50%;
  position: relative;

  ::after,
  ::before {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
  }

  ::after {
    top: -12px;
    right: -12px;
    bottom: -12px;
    left: -12px;
    border: 12px solid #19439e;
    box-shadow: inset 0px 0px 0px 2px #b2854b, 0px 0px 0px 2px #b2854b;
  }

  ::before {
    background: rgba(0, 0, 0, 0.65);
    border: 1px solid silver;
    box-shadow: inset 0px 0px 0px 2px #808080;
    top: 12%;
    left: 12%;
    right: 12%;
    bottom: 12%;
    z-index: 1;
  }
`;

export const Ball = styled.p`
  position: absolute;
  top: 17%;
  bottom: 17%;
  left: 17%;
  right: 17%;
  color: #fff200;
  font-size: 60px;
  z-index: 5;
  transform: rotateZ(-2820deg);
`;

export const Inner = styled.div`
  display: block;
  height: 300px;
  width: 300px;
  position: relative;

  ::after,
  ::before {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
  }

  ::after {
    // results circle
    z-index: 1;
    top: 24%;
    right: 24%;
    bottom: 24%;
    left: 24%;
    background-color: #0d665e; //results circle background color
    border: 6px solid #ef492f; //results circle border color
  }

  #rest::before {
    transition: top 0.5s ease-in, right 0.5s ease-in, bottom 0.5s ease-in,
      left 0.5s ease-in;
    top: 25%;
    right: 25%;
    bottom: 24%;
    left: 25%;
  }
`;

export const Number = styled.div`
  width: 95px;
  height: 110px;
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 0;
  left: calc(50% - (100px / 2));
  transform-origin: 50% 100%;
  background-color: transparent;
  border-left: 36px solid transparent;
  border-right: 36px solid transparent;
  border-top: 150px solid black;
  box-sizing: border-box;

  :nth-child(1) {
    -webkit-transform: rotateZ(36.000000001deg);
    transform: rotateZ(36.000000001deg);
    border-top-color: red;
  }

  :nth-child(2) {
    -webkit-transform: rotateZ(72.000000002deg);
    transform: rotateZ(72.000000002deg);
  }

  :nth-child(3) {
    -webkit-transform: rotateZ(108.000000003deg);
    transform: rotateZ(108.000000003deg);
    border-top-color: red;
  }

  :nth-child(4) {
    -webkit-transform: rotateZ(144.000000004deg);
    transform: rotateZ(144.000000004deg);
  }

  :nth-child(5) {
    -webkit-transform: rotateZ(180.000000005deg);
    transform: rotateZ(180.000000005deg);
    border-top-color: red;
  }

  :nth-child(6) {
    -webkit-transform: rotateZ(216.000000006deg);
    transform: rotateZ(216.000000006deg);
  }

  :nth-child(7) {
    -webkit-transform: rotateZ(252.000000007deg);
    transform: rotateZ(252.000000007deg);
    border-top-color: red;
  }

  :nth-child(8) {
    -webkit-transform: rotateZ(288.000000008deg);
    transform: rotateZ(288.000000008deg);
  }

  :nth-child(9) {
    -webkit-transform: rotateZ(324.000000001deg);
    transform: rotateZ(324.000000001deg);
    border-top-color: red;
  }

  :nth-child(10) {
    -webkit-transform: rotateZ(360.0000000011deg);
    transform: rotateZ(360.0000000011deg);
    border-top-color: green;
  }
`;

export const Pit = styled.span`
  color: #fff;
  padding-top: 10px;
  width: 90px;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  -webkit-transform: scale(1, 1.8);
  transform: scale(1, 1.8);
  position: absolute;
  top: -150px;
  left: -36px;
`;

/***********************      
           RESULTS PREVIEW SECTION 
           **********************/

export const Data = styled.div`
  display: block;
  position: absolute;
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  border-radius: 50%;
  perspective: 2000px;
  z-index: 100;
`;

export const DataInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: -webkit-transform 0.72s;
  transition: transform 0.72s;
  transition: transform 0.72s, -webkit-transform 0.72s;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
`;

export const Mask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backface-visibility: hidden;
  color: #fff;
  font-size: 34px;
  margin: auto;
  line-height: 1.4;
  padding-top: 36px;
`;

export const Result = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  color: #fff;
  align-items: center;
  backface-visibility: hidden;
  background-color: ${props => props.slotColor};
`;
export const ResultNumber = styled.div`
  font-size: 60px;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 12px;
`;
export const ResultColor = styled.div`
  text-transform: uppercase;
  font-size: 16px;
  line-height: 1;
`;
