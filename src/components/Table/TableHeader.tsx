import { FilterAltOutlined, Search } from "@mui/icons-material";
import { Box, Button, Input, Typography } from "@mui/material";
import React from "react";

interface tableHeaderProps {
  title?: string;
  subTitle?: string;
  count?: number;
  actionText?: string;
  handleOpen?: () => void;
  handleSearch: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setSearchTerm: (value: string) => void;
}
function TableHeader({
  title,
  count,
  handleOpen,
  subTitle,
  actionText,
  handleSearch,
  setSearchTerm,
}: tableHeaderProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "30px 0px",
        }}
      >
        <Typography variant="h2">{title}</Typography>
        {title && (
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
            }}
            onClick={handleOpen}
          >
            {actionText}
          </Button>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" margin="10px 0px">
        <Box>
          <Box display="flex">
            <Box marginRight={1}>
              <Typography fontSize="16px" fontWeight={700} variant="h2">
                {subTitle}
              </Typography>
            </Box>

            <Box
              bgcolor="rgba(24, 144, 255, 0.16)"
              borderRadius="6px"
              padding="3px 12px 1px 12px"
              display="flex"
              justifyContent="center"
              color="#0C53B7"
              height="22px"
            >
              <Typography
                fontSize="12px"
                fontWeight={700}
                variant="h2"
                color="#0C53B7"
              >
                {count || 0}
              </Typography>
              <Typography
                fontSize="12px"
                fontWeight={700}
                variant="h2"
                mx={1}
                color="#0C53B7"
              >
                {subTitle}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography lineHeight={3} color="#667085">
              These are all the {subTitle} assigned to .
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box marginRight="16px">
            <Input
              sx={{
                border: "1px solid #515151",
                borderRadius: "16px",
                padding: "8px 5px 8px 14px",
                width: "320px",
              }}
              name="search"
              startAdornment={<Search />}
              placeholder="search..."
              fullWidth
              disableUnderline
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onKeyDown={(e) => {
                handleSearch(e);
              }}
            />
          </Box>
          <Box>
            <Button
              size="medium"
              variant="outlined"
              startIcon={<FilterAltOutlined />}
              sx={{
                textTransform: "none",
              }}
            >
              Filters
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TableHeader;
