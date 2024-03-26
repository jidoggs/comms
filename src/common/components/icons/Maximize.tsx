import * as React from "react";
import { Icon } from "./type";

const Maximize: Icon = ({ size = "30", ...props }) => (
  <svg
  {...props}
  width={size} 
  height={size}  
  viewBox="0 0 18 18" 
  fill={"currentColor"}
  xmlns="http://www.w3.org/2000/svg"
  >

  <path d="M15.6875 2.8125V2.3125H15.1875H11.25C11.2369 2.3125 11.2213 2.3073 11.207 2.29301C11.1927 2.27872 11.1875 2.26306 11.1875 2.25C11.1875 2.23694 11.1927 2.22128 11.207 2.20699C11.2213 2.1927 11.2369 2.1875 11.25 2.1875H15.75C15.7631 2.1875 15.7787 2.1927 15.793 2.20699C15.8073 2.22128 15.8125 2.23694 15.8125 2.25V6.75C15.8125 6.76306 15.8073 6.77872 15.793 6.79301C15.7787 6.8073 15.7631 6.8125 15.75 6.8125C15.7369 6.8125 15.7213 6.8073 15.707 6.79301C15.6927 6.77872 15.6875 6.76306 15.6875 6.75V2.8125Z"
  
  fill={"currentColor"}
  stroke={"currentColor"}
  />
  <path d="M2.3125 15.1875V15.6875H2.8125H6.75C6.76306 15.6875 6.77872 15.6927 6.79301 15.707C6.8073 15.7213 6.8125 15.7369 6.8125 15.75C6.8125 15.7631 6.8073 15.7787 6.79301 15.793C6.77872 15.8073 6.76306 15.8125 6.75 15.8125H2.25C2.23694 15.8125 2.22128 15.8073 2.20699 15.793C2.1927 15.7787 2.1875 15.7631 2.1875 15.75V11.25C2.1875 11.2369 2.1927 11.2213 2.20699 11.207C2.22128 11.1927 2.23694 11.1875 2.25 11.1875C2.26306 11.1875 2.27872 11.1927 2.
  29301 11.207C2.3073 11.2213 2.3125 11.2369 2.3125 11.25V15.1875Z" 
  fill={"currentColor"}
  stroke={"currentColor"}
  />
  <path d="M10.125 8.43758C9.98246 8.43758 9.83996 8.38508 9.72746 8.27258C9.50996 8.05508 9.50996 7.69508 9.72746 7.47758L15.3525 1.85258C15.57 1.63508 15.93 1.63508 16.1475 1.85258C16.365 2.07008 16.365 2.43008 16.1475 2.64758L10.5225 8.27258C10.41 8.38508 10.2675 8.43758 10.125 8.43758Z"
   fill={"currentColor"}/>
   
  <path d="M2.24996 16.3126C2.10746 16.3126 1.96496 16.2601 1.85246 16.1476C1.63496 15.9301 1.63496 15.5701 1.85246 15.3526L7.47746 9.72758C7.69496 9.51008 8.05496 9.51008 8.27246 9.72758C8.48996 9.94508 8.48996 10.3051 8.27246 10.5226L2.64746 16.1476C2.53496 16.2601 2.39246 16.3126 2.24996 16.3126Z"
  fill={"currentColor"}
  />
  </svg>
  
);

export default Maximize;
