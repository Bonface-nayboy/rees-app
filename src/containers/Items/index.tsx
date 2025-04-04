/* eslint-disable import/extensions */

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Icon,
  styled,
  Typography,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import {
  Delete,
  Edit,
  EmailOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Dialog from "@/src/components/Dialog";
import ReusableTable from "@/src/components/Table";
import ItemForm from "./itemForm";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: "0px",
  },
  "& .MuiBox-root": {
    padding: "0px",
  },
}));

const Items = [
  {
    id: "1",
    name: "Fine small size thermos",
    description: "Fine small size thermos",
    bPrice: 100,
    sPrice: 200,
  },
  {
    id: "2",
    name: "Fine small size thermos",
    description: "Fine small size thermos",
    bPrice: 100,
    sPrice: 200,
  },
  {
    id: "3",
    name: "Fine small size thermos",
    description: "Fine small size thermos",
    bPrice: 100,
    sPrice: 200,
  },
  {
    id: "4",
    name: "Fine small size thermos",
    description: "Fine small size thermos",
    bPrice: 100,
    sPrice: 200,
  },
  {
    id: "5",
    name: "Fine small size thermos",
    description: "Fine small size thermos",
    bPrice: 100,
    sPrice: 200,
  },
  {
    id: "6",
    name: "Fine small size thermos",
    description: "Fine small size thermos",
    bPrice: 100,
    sPrice: 200,
  },
  {
    id: "7",
    name: "Fine small size thermos",
    description: "Fine small size thermos",
    bPrice: 100,
    sPrice: 200,
  },
  {
    id: "8",
    name: "Fine small size thermos",
    description: "Fine small size thermos",
    bPrice: 100,
    sPrice: 200,
  },
];

const getStatusStyles = (status: string, isProfileActive: boolean) => {
  switch (status) {
    case "active":
      return isProfileActive
        ? { color: "#5DBB2F", background: "#EEFFE6", label: "Active" }
        : { color: "#FF4D4F", background: "#FFEBEB", label: "Deactivated" };
    case "pending":
      return { color: "#FFA500", background: "#FFF5CC", label: "Pending" };
    default:
      return { color: "#FF4D4F", background: "#FFEBEB", label: "Deactivated" };
  }
};

const getStatus = (status: string, isProfileActive: boolean) => {
  switch (status) {
    case "active":
      return isProfileActive ? "Deactivate" : "Activate";
    case "pending":
      return "Pending";
    default:
      return "Deactivate";
  }
};
const columns: ColumnDef<any>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (info) => {
      const row = info?.row?.original;
      return (
        <Box display="flex" alignItems="center">
          <Avatar
            alt={row?.name}
            sx={{
              border: "2px solid #4E9BB9",
              marginRight: "8px",
              color: "#4E9BB9",
              padding: "10px",
              fontSize: "12px",
            }}
          >
            {row?.name?.charAt(0)?.toUpperCase()}
            {row?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography variant="body2">{`${row?.name}`}</Typography>
        </Box>
      );
    },
  },
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "accountStatus",
    header: "Status",
    cell: (info) => {
      const status = info?.row?.original;
      const { color, background, label } = getStatusStyles(
        info.getValue() as string,
        status?.appProfileIsActive
      );

      return (
        <Button
          sx={{
            borderRadius: "30px",
            padding: "0px 10px",
            color,
            background,
          }}
        >
          {label}
        </Button>
      );
    },
  },
  {
    accessorKey: "bPrice",
    header: "Buy Price On",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "sPrice",
    header: "Sale Price",
    cell: (info) => info.getValue(),
  },
];
function ItemsPageData() {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [values, setValues] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [param, setParam] = useState("");

  const ItemsData = Items || [];
  const totalItems = Items.length || 0;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setValues({});
  };
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const router = useRouter();

  const status = getStatus(values?.accountStatus, values?.appProfileIsActive);

  const actions = [
    {
      label: (
        <>
          <VisibilityOutlined
            style={{
              color: "#757575",
              opacity: "60%",
            }}
          />{" "}
          <Typography color="#757575" mx={3}>
            View
          </Typography>
        </>
      ),
      onClick: (row: any) => router.push(`/items`),
    },
    {
      label: (
        <>
          <Icon
            sx={{
              mr: 1,
            }}
          >
            <Edit style={{ color: "#AAAAAA" }} />
          </Icon>

          <Typography mx={2} mt={0} color="#757575">
            Edit
          </Typography>
        </>
      ),
      onClick: () => {
        setOpen(true);
      },
    },
    {
      label: (
        <>
          {status === "Activate" && <Delete style={{ color: "#757575" }} />}
          {status === "Pending" && (
            <EmailOutlined
              style={{
                color: "#757575",
              }}
              width="20px"
              height="20px"
            />
          )}{" "}
          {status === "Deactivate" && <Delete style={{ color: "#757575" }} />}
          <Typography mx={3} color="#757575">
            {status === "Pending" ? "Resend Email" : status}
          </Typography>
        </>
      ),
      onClick: (row: any) => {
        if (row.accountStatus === "active" && row.appProfileIsActive) {
          alert(`Resending email to ${row.name}`);
        } else if (
          row.accountStatus === "active" ||
          (row.accountStatus === "blocked" && !row.appProfileIsActive)
        ) {
          alert(`Resending email to ${row.name}`);
        } else {
          alert(`Resending email to ${row.name}`);
        }
      },
    },
    {
      label: (
        <>
          <Delete style={{ color: "#757575" }} width="20px" height="20px" />
          <Typography mx={3} color="#757575">
            Delete
          </Typography>
        </>
      ),
      onClick: () => {
        handleOpenDeleteDialog();
      },
    },
  ];

  return (
    <Card>
      <ReusableTable
        columns={columns}
        subTitle="Items"
        actions={actions}
        tableData={ItemsData}
        totalCount={totalItems}
        tableLoading={false}
        tableError={null}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        setParam={setParam}
        buttonText="Add a New Item"
        setValues={setValues}
        handleOpen={handleOpen}
      />

      <StyledDialog
        open={open}
        maxWidth="md"
        handleClose={handleClose}
        modalContent={<ItemForm handleClose={handleClose} />}
      />
      <Box>
        <StyledDialog
          open={openDeleteDialog}
          handleClose={() => setOpenDeleteDialog(false)}
          maxWidth="xs"
          modalContent={<Typography>Delete Item</Typography>}
        />
      </Box>
    </Card>
  );
}

export default ItemsPageData;
