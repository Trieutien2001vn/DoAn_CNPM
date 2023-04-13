import { Box } from "@mui/material";
import React from "react";

function Logo() {
  return (
    <>
      <Box
        sx={{
          width: "42px",
          height: "42px",
          backgroundColor: "darkmode.darkSoft",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          flexShrink: 0
        }}
        className={`animate__animated animate__tada animate__slow animate__infinite`}
      >
        <Box
          className={`animate__animated animate__zoomIn animate__slow animate__infinite`}
          component="span"
        >
          <svg
            width="26"
            height="22"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.18693 8.23338C-0.15032 5.88995 0.588391 2.92548 2.83688 1.61205V1.61205C5.08538 0.298614 7.9922 1.13358 9.32945 3.47701L15.1995 13.7638C16.5367 16.1072 15.798 19.0717 13.5495 20.3851V20.3851C11.301 21.6985 8.39421 20.8636 7.05696 18.5201L1.18693 8.23338Z"
              fill="url(#paint0_linear_448_2497)"
            />
            <path
              d="M25.2364 5.69103C25.2364 8.3228 23.1359 10.4563 20.5449 10.4563C17.9539 10.4563 15.8535 8.3228 15.8535 5.69103C15.8535 3.05925 17.9539 0.925781 20.5449 0.925781C23.1359 0.925781 25.2364 3.05925 25.2364 5.69103Z"
              fill="url(#paint1_linear_448_2497)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_448_2497"
                x1="2.83688"
                y1="1.61205"
                x2="13.442"
                y2="20.0005"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1DC071" />
                <stop offset="1" stopColor="#77D9AA" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_448_2497"
                x1="20.5449"
                y1="0.925781"
                x2="20.5219"
                y2="10.2856"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1DC071" />
                <stop offset="1" stopColor="#77D9AA" />
              </linearGradient>
            </defs>
          </svg>
        </Box>
      </Box>
    </>
  );
}

export default Logo;
