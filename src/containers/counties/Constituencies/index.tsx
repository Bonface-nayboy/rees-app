"use client";

import ReusableTable from "@/src/components/Table";
import { Delete, Edit, VisibilityOutlined } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Dialog from "@/src/components/Dialog";
import ConstituencyForm from "./forms";
import { useEffect } from "react";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: "0px",
  },
  "& .MuiBox-root": {
    padding: "0px",
  },
}));

const columns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  { header: "Region", accessorKey: "region" },
];
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
    onClick: () => {
      alert("View");
    },
  },
  {
    label: (
      <>
        <Edit style={{ color: "#AAAAAA" }} />

        <Typography mx={3} mt={0} color="#757575">
          Edit
        </Typography>
      </>
    ),
    onClick: () => {
      alert("Edit");
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
      alert("Delete");
    },
  },
];
function Constituencies({ countyId }: { countyId: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [constituencies, setConstituencies] = useState([]);
  const [error, setError] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const response = await fetch(`/api/constituencies/${countyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch constituencies");
        }
        const data = await response.json();
        setConstituencies(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (countyId) {
      fetchConstituencies();
    }
  }, [countyId]);
  return (
    <Box width="100%">
      <ReusableTable
        columns={columns}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onSelectRows={() => {}}
        tableData={constituencies}
        tableLoading={false}
        actions={actions}
        setPageNumber={() => {}}
        setPageSize={() => {}}
        totalCount={constituencies.length}
        setValues={() => {}}
        setParam={() => {}}
        subTitle="Constituencies"
        handleOpen={handleOpen}
        tableError={error}
        enableMenu={true}
        buttonText="Add New Constituency"
        getRowKey={(constituencies: any) => constituencies._id}
      />

      <Box>
        <StyledDialog
          open={open}
          handleClose={handleClose}
          maxWidth="md"
          modalContent={
            <ConstituencyForm handleClose={handleClose} countyId={countyId} />
          }
        />
      </Box>
    </Box>
  );
}

export default Constituencies;
