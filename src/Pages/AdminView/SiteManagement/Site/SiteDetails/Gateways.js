import React, { useEffect } from "react";
import {
  CustomTable,
  CustomPagination,
  TabPane,
  NoData,
} from "../../../../../components";
import {
  ViewButton,
  Heading16,
} from "../../../../../components/CustomComponent";
import { Box, Stack, IconButton } from "@mui/material";
import {
  DeleteOutlineOutlinedIcon,
  CancelPresentationIcon,
} from "../../../../../icons";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";

const Gateways = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    getDeviceBySiteId,
    getAllGateways,
    getAllSiteGatewaysDataLength,
    getAllSiteGatewaysPagination,
    setAllSiteGatewaysPagination,
    removeGatewayFromSite,
    isGatewayUnassigned,
  } = useViewSiteContext();

  const pageCount = Math.ceil(getAllSiteGatewaysDataLength / 10);

  useEffect(() => {
    const filters = { type: "gateway" };
    getDeviceBySiteId(id, filters);
  }, [id, isGatewayUnassigned]);

  const headData = [
    "UID",
    "site name",
    "devices",
    "alerts",
    "View Details",
    "remove",
  ];

  const getFormattedData = (data) => {
    return data?.map((ele) => ({
      Uid: ele?.uid,
      siteName: ele?.name,
      devices: ele?.assignedDevices,
      alerts: [
        <Heading16 sx={{ color: theme.palette.error.main }}>
          {ele?.alerts}
        </Heading16>,
      ],
      viewDetails: [
        <ViewButton
          onClick={() => navigate(`/admin/site-management/gateway/${ele?._id}`)}
        >
          View
        </ViewButton>,
      ],
      delete: [
        <IconButton
          aria-label="delete"
          onClick={() => removeGatewayFromSite(id, ele?._id)}
        >
          <CancelPresentationIcon fontSize="medium" />
        </IconButton>,
      ],
    }));
  };
  return (
    <Stack direction={"column"} gap={5}>
      <TabPane
        paneText={`Showing ${
          getAllSiteGatewaysDataLength > 10 ? 10 : getAllSiteGatewaysDataLength
        } out of ${getAllSiteGatewaysDataLength}`}
        paneTextColor="#000"
        btnText="add gateway"
        variant="contained"
        icon="add"
        showIcon={true}
        onBtnClick={() => {}}
      />
      {getAllSiteGatewaysDataLength ? (
        <CustomTable
          headBackgroundColor="#EAF2E6"
          tableHeadData={headData}
          tableRowData={getFormattedData(getAllGateways)}
        />
      ) : (
        <NoData message="Nothing to show" />
      )}
      {getAllSiteGatewaysDataLength > 10 ? (
        <Box sx={{ alignSelf: "flex-end" }}>
          <CustomPagination
            size="large"
            page={getAllSiteGatewaysPagination}
            count={pageCount}
            onPageChange={(pageNo) => setAllSiteGatewaysPagination(pageNo)}
          />
        </Box>
      ) : null}
    </Stack>
  );
};

export default Gateways;
