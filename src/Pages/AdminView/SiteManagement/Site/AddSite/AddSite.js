import React, { useEffect } from "react";
import { Stepper, AssignUserModalContent } from "../../../../../components";
import AddSiteStep1 from "./AddSiteStep1";
import AddSiteStep2 from "./AddSiteStep2";
import AddSiteStep3 from "./AddSiteStep3";
import AddSiteStep4 from "./AddSiteStep4";
import { Button, Divider, Stack } from "@mui/material";
import { AddCircleOutlineIcon } from "../../../../../icons";
import { Heading24 } from "../../../../../components/CustomComponent";
import { useTheme } from "@emotion/react";
import useAddSiteContext from "../../../../../hooks/Admin/useAddSiteContext";
import MarkPositions from "./MarkPositions";

const BreadCrumbsData = [
  {
    label: "add site",
    link: "admin/add-site",
  },
];

const AddSite = () => {
  const theme = useTheme();
  const {
    allPendingGateways,
    selectedGatewayToAssign,
    setSelectedGatewayToAssign,
    setAdminSiteModal,
    handleAssignGatewayToSite,
    customError,
    setCustomError
  } = useAddSiteContext();

  const steps = [
    {
      label: "Add Site Details",
      component: <AddSiteStep1 />,
    },
    {
      label: "Assign Gateway",
      component: (
        <AssignUserModalContent
          checkbox={false}
          title="Select Gateway"
          searchLabel="Search Gateway by Id or name"
          insideStepper={true}
          data={allPendingGateways}
          selectedValues={[selectedGatewayToAssign]}
          customError={customError}
          onChange={(e) => setSelectedGatewayToAssign(e.target.value)}
          handleCancel={() => {
            setAdminSiteModal(false);
            setSelectedGatewayToAssign(null);
            setCustomError({
              error: false,
              type: "",
              message: "",
            });
          }}
          handleSubmit={handleAssignGatewayToSite}
        />
      ),
    },
    {
      label: "Mark Positions",
      component: <MarkPositions />,
    },
  ];

  return (
    <Stack
      gap={3}
      sx={{ background: "#fff", borderRadius: "12px", width: "100%" }}
    >
      <Heading24
        sx={{
          background: theme.palette.primary.light,
          fontWeight: "500",
          p: theme.spacing(1, 2),
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        Add Site
      </Heading24>
      <Stepper steps={steps} />
    </Stack>
  );
};

export default AddSite;
