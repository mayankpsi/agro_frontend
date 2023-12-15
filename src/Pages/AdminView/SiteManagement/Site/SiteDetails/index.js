import React, { useState } from "react";
import { AppLayout, BreadCrumps, CustomTabs,CustomModal } from "../../../../../components";
import { Button, Stack, Box } from "@mui/material";
import { headerTabsData } from "../../../Data";
import { Label } from "../../../../../components/CustomComponent";
import Overview from "./Overview";
import Analytics from "./Analytics";
import Alerts from "./Alerts";
import Gateways from "./Gateways";
import Status from "./Status";
import SiteDetails from "./SiteDetails";
import SetThreshold from "./SetThreshold";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";

const BreadCrumbsData = (data) => [
  {
    label: `${data?.uid}`,
    link: `admin/site-management/site/${data?._id}`,
  },
];

const SiteDetail = () => {
  const [openThresholdModal, setOpenThresholdModal] = useState(false);
  const {deviceDetails,snackbarAlert, onSnackbarAlertClose} = useViewSiteContext()

const siteTabData = [
    {
      label: "Overview",
      child: <Overview/>,
    },
    {
      label: "Analytics",
      child: <Analytics/>,
    },
    {
      label: "alerts",
      child: <Alerts setOpenThresholdModal={setOpenThresholdModal}/>,
    },
    {
      label: "gateway",
      child: <Gateways/>,
    },
    {
      label: "status",
      child: <Status/>,
    },
    {
      label: "site details",
      child: <SiteDetails/>,
    },
  ];
  return (
    <AppLayout headerTabsData={headerTabsData}
    openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      onAlertClose={onSnackbarAlertClose}
      >
      <Stack gap={3} sx={{ background: "#fff" }} p={4} pt={0}>
        <BreadCrumps
          root={{ link: "/admin/site-management", label: "site management" }}
          data={BreadCrumbsData(deviceDetails)}
        />
        {/* <Box sx={{ display: "flex" }}>
          <Label>Site name : Site 1</Label>
        </Box> */}
        <CustomTabs tabData={siteTabData} />
        <CustomModal
          content={<SetThreshold setOpenThresholdModal={setOpenThresholdModal}/>}
          openModal={openThresholdModal}
          handleClose={() => setOpenThresholdModal(false)}
          customWidth={"50%"}
          background={true}
        />
      </Stack>
    </AppLayout>
  );
};

export default SiteDetail;
