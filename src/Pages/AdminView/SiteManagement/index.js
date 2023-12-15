import React, { useState } from "react";
import {
  AppLayout,
  TabPaneV2,
  CustomTable,
  CustomPagination,
  CustomModal,
  MessageModalContent,
  AssignUserModalContent,
  CustomLabel,
} from "../../../components";
import { ViewButton, Heading16 } from "../../../components/CustomComponent";
import { Box, Stack, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { headerTabsData } from "../Data";
import {
  AddCircleOutlineIcon,
  DeleteOutlineOutlinedIcon,
} from "../../../icons";
import { useTheme } from "@emotion/react";
import AddSite from "./Site/AddSite/AddSite";
import useAddSiteContext from "../../../hooks/Admin/useAddSiteContext";
import useUserManagementContext from "../../../hooks/Admin/useUserManagementContext";
import useViewSiteContext from "../../../hooks/Admin/useViewSiteContext";

const AdminSiteManagement = () => {
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [modalContentType, setModalContentType] = useState(null);
  const [selectedSiteForDeletion, setSelectedSiteForDeletion] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const {
    adminSiteModal,
    setAdminSiteModal,
    allSites,
    selectedUserToAssignSite,
    setSelectedUserToAssignSite,
    handleAssignUserToSite,
    customError,
    setCustomError,
    handleDeleteSite,
    handleSiteQuery,
    allSitesDataLength,
    allSitePagination,
    setAllSitePagination,
    showMessageModal,
    handleShowMessageModalClose,
    openBackdropLoader,
  } = useAddSiteContext();
  const {snackbarAlert,onSnackbarAlertClose} = useViewSiteContext();
  const { users } = useUserManagementContext();
  const pageCount = Math.ceil(allSitesDataLength / 10);

  const headData = [
    "UID",
    "name",
    "gateways",
    "devices",
    "alerts",
    "status",
    "View Details",
    "Assign User",
    "Delete",
  ];

  const getStatus = (str) => {
    if (str === "assigned") return { status: "Assigned", color: "success" };
    else if (str === "NOT_PAIRED")
      return { status: "Not Paired", color: "warning" };
    else return { status: "Not Assigned", color: "error" };
  };

  const getFormattedData = (data) => {
    return data?.map((ele) => ({
      Uid: ele?.uid,
      siteName: ele?.name,
      Gateways: ele?.gatewayCount,
      devices: ele?.deviceCount,
      alerts: [
        <Heading16 sx={{ color: theme.palette.error.main }}>
          {ele?.alertCount}
        </Heading16>,
      ],
      status: [
        <CustomLabel
          text={getStatus(ele?.status).status}
          type={getStatus(ele?.status).color}
        />,
      ],
      viewDetails: [
        <ViewButton
          onClick={() => navigate(`/admin/site-management/site/${ele?._id}`)}
        >
          View
        </ViewButton>,
      ],
      assignUser: [
        <IconButton
          aria-label="add"
          disabled={ele?.assignedUser ? true : false}
          onClick={() => {
            handleModal("addUser");
            setSelectedUserToAssignSite({
              ...selectedUserToAssignSite,
              site: ele?._id,
            });
          }}
        >
          <AddCircleOutlineIcon
            fontSize="medium"
            sx={{ color: ele?.assignedUser ? "" : theme.palette.primary.main }}
          />
        </IconButton>,
      ],
      Delete: [
        <IconButton
          aria-label="delete"
          disabled={ele?.status !== "not_assigned"}
          onClick={() => {
            handleModal("deleteSite");
            setSelectedSiteForDeletion(ele?._id);
          }}
        >
          <DeleteOutlineOutlinedIcon fontSize="medium" />
        </IconButton>,
      ],
    }));
  };
  const getModalContext = (type) => {
    if (type === "deleteSite")
      return (
        <MessageModalContent
          onCancel={() => setAdminSiteModal(false)}
          onConfirm={() => handleDeleteSite(selectedSiteForDeletion)}
        />
      );
    else if (type === "addUser")
      return (
        <AssignUserModalContent
          checkbox={false}
          title="Assign User"
          searchLabel="Search User by Id or name"
          data={users}
          selectedValues={[selectedUserToAssignSite?.user]}
          customError={customError}
          onChange={(e) =>
            setSelectedUserToAssignSite({
              ...selectedUserToAssignSite,
              user: e.target.value,
            })
          }
          handleCancel={() => {
            setAdminSiteModal(false);
            setSelectedUserToAssignSite({ site: null, user: null });
            setCustomError({
              error: false,
            });
          }}
          handleSubmit={handleAssignUserToSite}
        />
      );
    else if (type === "addSite") return <AddSite />;
  };

  const handleModal = (type) => {
    setModalContentType(type);
    setAdminSiteModal(true);
  };
  return (
    <AppLayout
      headerTabsData={headerTabsData}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      onAlertClose={onSnackbarAlertClose}
      openBackdropLoader={openBackdropLoader}
      successModalMessage={showMessageModal?.message}
      openMessageModal={showMessageModal?.open}
      setOpenMessageModal={handleShowMessageModalClose}
      modalContentType={showMessageModal?.type}
      onDeleteModalYes={() => {}}
      onDeleteModalNo={() => {}}
    >
      <Stack direction={"column"} gap={5}>
        <TabPaneV2
          searchLabel="Search Site Name/UID"
          paneText="site management"
          paneTextColor="#000"
          btnText="add site"
          onBtnClick={() => handleModal("addSite")}
          onSearch={handleSiteQuery}
          // onBtnClick={() => navigate("/admin/add-site")}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 3,
          }}
        >
          <CustomTable
            headBackgroundColor="#EAF2E6"
            tableHeadData={headData}
            tableRowData={getFormattedData(allSites)}
          />
          {allSitesDataLength > 10 ? (
            <Box sx={{ alignSelf: "flex-end" }}>
              <CustomPagination
                size="large"
                page={allSitePagination}
                count={pageCount}
                onPageChange={(pageNo) => setAllSitePagination(pageNo)}
              />
            </Box>
          ) : null}
        </Box>
        <CustomModal
          content={getModalContext(modalContentType)}
          openModal={adminSiteModal}
          handleClose={() => setAdminSiteModal(false)}
          background="#fff"
          customWidth={modalContentType === "deleteSite" ? "22%" : null}
        />
      </Stack>
    </AppLayout>
  );
};

export default AdminSiteManagement;
