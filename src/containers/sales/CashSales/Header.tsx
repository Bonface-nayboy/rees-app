"use client";

import { Add, ExpandMore } from "@mui/icons-material";
import {
  Box,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  Button,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

function Header() {
  const [users, setUsers] = useState([
    { code: "0001", name: "User Test" },
    { code: "0002", name: "John Doe" },
    { code: "0003", name: "Jane Smith" },
    { code: "0004", name: "Michael Brown" },
    { code: "0005", name: "Alice Green" },
    { code: "0006", name: "Bob White" },
    { code: "0007", name: "Emma Blue" },
    { code: "0008", name: "Oliver Black" },
    { code: "0009", name: "Sophia Yellow" },
    { code: "0010", name: "Liam Red" },
    { code: "0011", name: "Noah Purple" },
  ]);

  const [ledgerNumber, setLedgerNumber] = useState("");
  const [selectedUserCode, setSelectedUserCode] = useState("");
  const [orderNumber, setOrderNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    const selectedCode = event.target.value;
    const user = users.find((user) => user.code === selectedCode);

    if (user) {
      setLedgerNumber(user.code);
      setSelectedUserCode(user.code);
      setOrderNumber((prev) => prev + 1);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddUser = () => {
    console.log("Open Create New User form/modal");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.code.includes(searchQuery) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ padding: 2, width: "100%" }}>
        <Typography color="info" variant="h2">
          Cash Sales
        </Typography>
      </Box>

      <Box display="flex" gap={2} padding={2} justifyContent="space-between">
        <Box width="40%" display="flex">
          <TextField
            variant="standard"
            label="Ledger Number"
            value={ledgerNumber}
            sx={{ mr: "10px", width: "30%" }}
            InputProps={{ readOnly: true }}
          />

          {/* Custom Icon Select Component */}
          <Select
            label="Name"
            variant="standard"
            fullWidth
            value={selectedUserCode}
            onChange={handleUserChange}
            open={menuOpen}
            onOpen={() => setMenuOpen(true)}
            onClose={() => setMenuOpen(false)}
            IconComponent={ExpandMore} // Custom dropdown icon
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 350,
                  overflowY: "auto",
                  "& .MuiMenu-list": { paddingTop: "0px" },
                },
              },
            }}
          >
            {/* Sticky Search Input (Outside Scrollable Menu) */}
            <Box
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "white",
                zIndex: 10,
                padding: "10px",
                borderBottom: "1px solid lightgray",
              }}
            >
              <TextField
                placeholder="Search..."
                fullWidth
                variant="standard"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </Box>

            {/* Scrollable User List */}
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <MenuItem key={user.code} value={user.code}>
                  {user.code} - {user.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No results found</MenuItem>
            )}

            {/* Sticky "Create New User" Button */}
            <Box
              sx={{
                position: "sticky",
                bottom: 0,
                backgroundColor: "white",
                zIndex: 10,
                padding: "10px",
                borderTop: "1px solid lightgray",
              }}
            >
              <Button fullWidth variant="outlined" color="primary" endIcon={<Add />} onClick={handleAddUser}>
                Create New User
              </Button>
            </Box>
          </Select>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <TextField label="Order Number" value={orderNumber} InputProps={{ readOnly: true }} />

          <Tooltip title="View Active Orders">
            <Typography variant="h1" color="success">🛒</Typography>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
