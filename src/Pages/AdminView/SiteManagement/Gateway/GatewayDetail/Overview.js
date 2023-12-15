import React, { useEffect } from "react";
import {
  Heading12,
  Heading16,
  ViewButton,
  LabelLight,
  Label,
} from "../../../../../components/CustomComponent";
import { CustomTable, GetMap, ParameterCard } from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import useAddSiteContext from "../../../../../hooks/Admin/useAddSiteContext";
import { useParams } from "react-router-dom";

const Overview = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { getAllDevicesConnectedWithGateway, allDevicesConnectedWithGateway } =
    useAddSiteContext();


  useEffect(() => {
    getAllDevicesConnectedWithGateway(id);
  }, [id]);

  const headData = [
    "alert name",
    "UID",
    "device name",
    "Timestamp",
    "parameters",
    "threshold value",
    "alert value",
  ];
  const rowData = [
    {
      alertName: (
        <Heading16 sx={{ color: theme.palette.error.main }}>
          Soil is too dry
        </Heading16>
      ),
      uid: "009871",
      deviceName: "BMO11",
      timestamp: "23-09-2023, 09:09pm",
      parameter: "Moisture",
      thresholdValue: "25%",
      alertValue: "25%",
    },
  ];

  const headerTabsData = [
    {
      label: "Dashboard",
      link: "user/dashboard",
    },
    {
      label: "site management",
      link: "user/site-management",
    },
  ];

  return (
    <Stack direction={"column"} gap={5}>
      <Stack direction={"column"} gap={2}>
        <LabelLight sx={{ color: "#000" }}>Soil Type: Loamy Soil</LabelLight>
        <GetMap
          mapWidth="100%"
          mapHeight="390px"
          locationCoordinates={{ lat: 28.517122, lng: 77.411541 }}
          markers={allDevicesConnectedWithGateway.devices}
        />
      </Stack>
      <Label>
        <Heading16 sx={{ color: "#232323" }}>Description :</Heading16>
        <Heading12 sx={{ color: "#595959", fontSize: "14px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore.
        </Heading12>
      </Label>
      <CustomTable
        paneText="alerts"
        btnText="see all"
        onClick={() => {}}
        headBackgroundColor="#EAF2E6"
        tableHeadData={headData}
        tableRowData={rowData}
      />
    </Stack>
  );
};

export default Overview;
