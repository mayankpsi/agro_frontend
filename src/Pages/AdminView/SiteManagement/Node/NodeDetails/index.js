import React from "react";
import { AppLayout, BreadCrumps, CustomTabs } from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { headerTabsData } from "../../../Data";
import { Label } from "../../../../../components/CustomComponent";
import Overview from "./Overview";
import Alerts from "./Alerts";
import Status from "./Status";
import Analytics from "./Analytics";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";

const BreadCrumbsData = (data) =>[
  {
    label: `${data?.uid}`,
    link: "",
  },
];

export const siteTabData = [
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
    child: <Alerts/>,
  },
  {
    label: "status",
    child: <Status/>,
  },
];

const ViewSiteNodeDetail = () => {
  const {nodeDetails} = useViewSiteContext();
  return (
    <AppLayout headerTabsData={headerTabsData}>
      <Stack gap={3} sx={{ background: "#fff" }} p={4} pt={0}>
        <BreadCrumps
          root={{ link: "/admin/site-management", label: "site management" }}
          data={BreadCrumbsData(nodeDetails)}
        />
        {/* <Box sx={{ display: "flex" }}>
          <Label>Site name : Site 1</Label>
        </Box> */}
        <CustomTabs tabData={siteTabData} />
      </Stack>
    </AppLayout>
  );
};

export default ViewSiteNodeDetail;
