import { Stack, Box } from "@mui/material";
import {
  TabPane,
  CustomTable,
  CustomPagination,
  NoData,
} from "../../../components";

const selectData = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "pending",
    value: "pending",
  },
  {
    label: "assigned",
    value: "assigned",
  },
  {
    label: "not assigned",
    value: "not_assigned",
  },
];

const ShowDevice = ({
  btnText,
  onBtnClick,
  headData,
  rowData,
  paginationPageNo,
  pageCount,
  setPaginationPageNo,
  dataLength,
  onSelectChange,
  selectValue,
  onSearch,
}) => {
  return (
    <Stack direction={"column"} gap={5}>
      <TabPane
        paneText={`Showing ${
          dataLength < 10 ? dataLength : "10"
        } out of ${dataLength}`}
        paneTextColor="#000"
        btnText={btnText}
        variant="contained"
        icon="add"
        showIcon={true}
        onBtnClick={onBtnClick}
        searchLabel="Search Site Name/UID"
        onSearch={onSearch}
        select={true}
        selectData={selectData}
        selectValue={selectValue}
        onSelectInputChange={onSelectChange}
      />
      {dataLength > 0 ? (
        <CustomTable
          headBackgroundColor="#EAF2E6"
          tableHeadData={headData}
          tableRowData={rowData}
        />
      ) : (
        <NoData message="Nothing to show" />
      )}
      {dataLength > 10 ? (
        <Box sx={{ alignSelf: "flex-end" }}>
          <CustomPagination
            size="large"
            page={paginationPageNo}
            count={pageCount}
            onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
          />
        </Box>
      ) : null}
    </Stack>
  );
};

export default ShowDevice;
