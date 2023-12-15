import { useState } from "react";
import {
  Heading12,
  Heading16,
  Heading28,
  ViewButton,
  Label,
  LabelLight,
} from "../../../../../components/CustomComponent";
import {
  DashboardCard,
  CustomTable,
  GetMap,
  AppLayout,
  ParameterCard,
  TabPaneV2,
  CustomPagination,
  DateRangeTabPane,
} from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const Alerts = ({ setOpenThresholdModal }) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      <DateRangeTabPane
        tabText="showing 10 out of 20"
        btnText="set threshold value"
        onBtnClick={() => setOpenThresholdModal(true)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <CustomTable
        paneText="Alerts"
        headBackgroundColor="#EAF2E6"
        tableHeadData={headData}
        tableRowData={rowData}
      />
      <Box sx={{ alignSelf: "flex-end" }}>
        <CustomPagination
          size="large"
          page={1}
          count={5}
          onPageChange={(pageNo) => {}}
        />
      </Box>
    </Stack>
  );
};

export default Alerts;
