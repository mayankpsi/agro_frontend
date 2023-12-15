import React from "react";
import { Heading28, ViewButton } from "../../../components/CustomComponent";
import { DashboardCard, CustomTable, GetMap, AppLayout } from "../../../components";
import { SitesDash, DevicesDash } from "../../../Images";
import { Stack } from "@mui/material";
import { headerTabsData } from "../Data";

const AdminDashboard = () => {
  const dashboardCardData = [
    {
      id: 1,
      title: "sites",
      total: "53,000",
      img: SitesDash,
    },
    {
      id: 2,
      title: "devices",
      total: "53,000",
      img: DevicesDash,
    },
  ];

  const headData = ["alert name", "device name", "alert value", "action"];
  const rowData = [
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    }
  ];


  return (
    <AppLayout headerTabsData={headerTabsData}>
      <Heading28 mb={2}>Dashboard</Heading28>
      <Stack direction={"column"} gap={5}>
        <Stack direction={"row"} gap={5}>
          <Stack direction={"column"} width={"50%"} gap={3}>
            <Stack direction={"row"} gap={4}>
              {dashboardCardData?.map((ele) => (
                <DashboardCard
                  key={ele?.id}
                  title={ele?.title}
                  total={ele?.total}
                  img={ele?.img}
                />
              ))}
            </Stack>
            <CustomTable
              paneText="Sites"
              btnText="see all"
              onClick={() => {}}
              alertIndex={[0]}
              headBackgroundColor="#EAF2E6"
              tableHeadData={headData}
              tableRowData={rowData}
            />
          </Stack>
          <Stack direction={"column"} width={"50%"} gap={3}>
            <Stack direction={"row"} gap={4}>
              {dashboardCardData?.map((ele) => (
                <DashboardCard
                  key={ele?.id}
                  title={ele?.title}
                  total={ele?.total}
                  img={ele?.img}
                />
              ))}
            </Stack>
            <CustomTable
              paneText="Users"
              btnText="see all"
              onClick={() => {}}
              alertIndex={[0]}
              headBackgroundColor="#EAF2E6"
              tableHeadData={headData}
              tableRowData={rowData}
            />
          </Stack>
        </Stack>
      </Stack>
    </AppLayout>
  );
};

export default AdminDashboard;
