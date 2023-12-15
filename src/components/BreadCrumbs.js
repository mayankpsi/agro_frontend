import React from "react";
import { Grid, Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { Heading28, Heading24 } from "./CustomComponent";
import { useTheme } from "@emotion/react";

const Breadcrumb = ({ root, data }) => {
  const theme = useTheme();
  return (
    <Grid container direction="row" justifyContent="start">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        className="fs16px bold"
      >
        <Link to={root.link} style={{ textDecoration: "none" }} key="1">
          <Heading28 style={{ color: "#000" }}>{root?.label}</Heading28>
        </Link>
        {data?.map((ele,ind) => (
          <Link to={`/${ele.link}`} style={{ textDecoration: "none" }} key="2">
            <Heading24 style={{ color:`${data?.length === ind+1?"#A7A7A7":"#000"}`, fontWeight:'400' }}> {ele.label}</Heading24>
          </Link>
        ))}
      </Breadcrumbs>
    </Grid>
  );
};

export default Breadcrumb;
