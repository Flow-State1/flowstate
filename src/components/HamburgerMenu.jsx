// import React,{useState} from "react";

// import { useMediaQuery } from 'react-responsive';

// const HamburgerMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

//   const handleMenuToggle = () => {
//     setIsOpen(!isOpen);
//   };
// //  for each 
// // must add comment4
//   return (
//     <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
//       {isMobile && (
//         <button className="hamburger-icon" onClick={handleMenuToggle}>
//           <span className="line"></span>
//           <span className="line"></span>
//           <span className="line"></span>
//         </button>
//       )}
  

//       {/* Render your menu items here */}
//       {/* Example */}
//       {isOpen && (
//         <ul className="menu-items">
//           <li>Dashboard</li>
//           <li>Analytics</li>
//           <li>Notifications</li>
//           <li>Settings</li>
//           <li>Profile</li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default HamburgerMenu;

// import React, { useState } from 'react';
// import styled from 'styled-components';




// const StyleBurger = styled.div`
// width:2rem;
// height:2rem,
// position:fixed;
// top:15px,
// right:20px;
// display:flex;
// justify-content:space-around;
// flex-flow:column nowrap;

// div{
//   width:2rem;
//   height:0.25rem;
//   background-color:${({open}) =>open ?'#ccc':'#333'};
//   border-radius:10px;
//   transform-origin:1px;


//   &:nth-Children(1){
//     transform:${({open}) => open ? 'rotate(45deg)':'rotate(0)'};
//   }
//   &:nth-child(2){
//     transform:${({open}) => open ?'translateX(100%)':'translateX(0)'};
//     opacity:${({open}) =>open? 0:1};
//   }
//   &:nth-Children(3){
//     transform:${({open}) => open ? 'rotate(-45deg)':'rotate(0)'};
//   }
  

// }`;

// const HamburgerMenu =() =>{
//   const[open ,setIsOpen] = useState(false)
//   return(
//     <StyleBurger open={open} onClick={()=> setIsOpen(!open)}>
//       <div></div>
//       <div></div>
//       <div></div>
//       <div></div>

//     </StyleBurger>
//   )
// }
// export default HamburgerMenu;




///// trying 
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const COLORS = {
  primaryDark: " var(--primary-color)",
  primaryLight: "#fff",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 6rem;
  left: 1.5rem;
  border-radius: 10%;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center
`;

const NavBackground = styled.div`
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 1.5rem;
  height: 2px;
  display: inline-block;
  margin-top: 1.5rem;
  transition: all 0.3s;

  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 1.5rem;
    height: 2px;
    display: inline-block;

    position: absolute;
    left: 0;
    transition: all 0.3s;
  }

  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};

    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }

  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};

  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 1rem 2rem;

  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;

  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;

function HamburgerMenu() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>
          <li>
            <ItemLink onClick={handleClick} to="/">
              Dashboard
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/dashboard/analytics">
              Analytics
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/dashboard/notifications">
              Notification
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/settings">
              Settings
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/contact">
              Profile
            </ItemLink>
          </li>
        </List>
      </Navigation>
    </>
  );
}

export default HamburgerMenu;