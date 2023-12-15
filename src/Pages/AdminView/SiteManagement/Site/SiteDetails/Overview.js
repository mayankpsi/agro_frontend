import React, { useEffect } from "react";
import {
  Heading12,
  Heading16,
  ViewButton,
  LabelLight,
} from "../../../../../components/CustomComponent";
import {
  CustomTable,
  GetMap,
  NoData,
  ParameterCard,
} from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import useFormattedDate from "../../../../../hooks/useFormattedDate";
import { parameterData, exclude } from "../../../../../Data/parameterData";

const Overview = () => {
  const theme = useTheme();
  const { id } = useParams();
  const {
    getDeviceDetailByIdSiteContext,
    deviceDetails,
    getLastUpdatedSensorData,
    lastUpdatedSensorData,
    getDeviceAlerts,
    allAlerts,
    getDeviceBySiteId,
    getAllGateways,
  } = useViewSiteContext();
  const { getFormattedDate } = useFormattedDate();

  useEffect(() => {
    const filters = { depth: "6", siteId: id };
    const filter2 = { siteId: id };
    getDeviceDetailByIdSiteContext(id);
    getLastUpdatedSensorData(filter2);
    getDeviceAlerts(filters);
    getDeviceBySiteId(id, {});
  }, [id]);

  const headData = [
    "alert name",
    "UID",
    "device name",
    "Time",
    "parameters",
    "threshold value",
    "alert value",
  ];

  const rowData = [
    {
      alertName: [
        <Heading16 sx={{ color: theme.palette.error.main }}>
          Soil is too dry
        </Heading16>,
      ],
      uid: "908700",
      deviceName: "BM01",
      time: "23-09-2023, 09:09pm",
      parameters: "Moisture",
      thresholdValue: "25%",
      alertValue: "25%",
    },
  ];

  return (
    <Stack direction={"column"} gap={5}>
      <Stack direction={"row"} gap={5}>
        <Stack
          direction={"column"}
          width={"30%"}
          sx={{
            border: "2px solid #eeeeee",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: theme.palette.primary.light,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: theme.spacing(1, 2),
            }}
          >
            <Heading16>Soil Parameter</Heading16>
            <Heading12>
              {lastUpdatedSensorData?.updatedAt ? "Updated on" : ""} <br />{" "}
              {lastUpdatedSensorData?.updatedAt &&
                getFormattedDate(lastUpdatedSensorData?.updatedAt)}
            </Heading12>
          </Box>

          {lastUpdatedSensorData &&
          Object?.keys(lastUpdatedSensorData)?.length ? (
            <Stack direction={"row"} flexWrap={"wrap"}>
              {lastUpdatedSensorData &&
                Object?.keys(lastUpdatedSensorData)
                  ?.filter((ele) => !exclude?.includes(ele))
                  ?.map((key, ind) => (
                    <ParameterCard
                      sx={{
                        borderBottom: "2px solid #eeeeee",
                        borderRight: `${
                          ind % 2 === 0 ? "2px solid #eeeeee" : null
                        }`,
                        p: theme.spacing(2, 3),
                        width: "50%",
                      }}
                      title={
                        parameterData?.find(
                          (ele) =>
                            ele?.value?.toLowerCase() === key?.toLowerCase()
                        )?.label
                      }
                      value={lastUpdatedSensorData[key]}
                      suffix={
                        parameterData?.find(
                          (ele) =>
                            ele.value?.toLowerCase() === key?.toLowerCase()
                        )?.unit
                      }
                    />
                  ))}
            </Stack>
          ) : (
            <Stack
              height={"100%"}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <NoData NoBorder={true} message="nothing to show" />
            </Stack>
          )}
        </Stack>
        <Stack width={"70%"} gap={2}>
          <LabelLight>Soil Type: Loamy Soil</LabelLight>
          <GetMap
            mapWidth="100%"
            mapHeight="495px"
            locationCoordinates={{ lat: 28.517122, lng: 77.411541 }}
            markers={getAllGateways}
          />
        </Stack>
      </Stack>
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
