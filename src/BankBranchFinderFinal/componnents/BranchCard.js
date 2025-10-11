import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Pagination,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import "../styles/BranchCard.css";
import CalculateHaversineDistance from "../tools/CalculateHaversineDistance";

export default function BranchCard({ branches }) {
  const [location, setLocation] = useState(null);
  const [sortedBranches, setSortedBranches] = useState([]);
  const [page, setPage] = useState(1);
  const cardsPerPage = 12;

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Sort branches by distance once location is available
  useEffect(() => {
    if (location && branches && branches.length > 0) {
      const branchesWithDistance = branches.map((branch) => {
        const distance = CalculateHaversineDistance(
          location.lat,
          location.lng,
          branch.X_Coordinate,
          branch.Y_Coordinate
        );
        return { ...branch, distance };
      });

      const sorted = branchesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );
      setSortedBranches(sorted);
    } else {
      setSortedBranches(branches || []);
    }
  }, [branches, location]);

  if (!sortedBranches || sortedBranches.length === 0) {
    return (
      <Typography
        variant="body2"
        sx={{ mt: 2, textAlign: "center", color: "#777" }}
      >
        No branches found.
      </Typography>
    );
  }

  // Pagination logic
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentBranches = sortedBranches.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedBranches.length / cardsPerPage);

  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <div className="braches-counter">
        <CorporateFareOutlinedIcon sx={{ fontSize: 40 }} />
        <Typography
          variant="h6"
          sx={{
            fontSize: 20,
            mb: 0.5,
            fontSize: "17px",
            paddingLeft: "1%",
          }}
        >
          {sortedBranches.length} Branches Found
        </Typography>
      </div>

      {/* Cards container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {currentBranches.map((branch) => (
          <Card
            key={branch._id || branch.Branch_Code}
            sx={{
              width: 360,
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              p: 2,
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 0.5, fontSize: "17px" }}
              >
                {branch.Branch_Name || "Branch Name"}
              </Typography>

              {/* Distance */}
              <Typography
                sx={{ fontWeight: 600, mb: 0.5, fontSize: "12px" }}
              >
                {branch.distance
                  ? `${branch.distance.toFixed(2)} km`
                  : "Calculating distance..."}
              </Typography>

              <Typography variant="body2" sx={{ color: "#777", mb: 2 }}>
                {branch.Bank_Name || "Bank Name"}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <LocationOnIcon sx={{ color: "#555" }} />
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {branch.Branch_Address || "No address available"}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <PhoneIcon sx={{ color: "#555" }} />
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {branch.Telephone || "(000) 000-0000"}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <AccessTimeIcon sx={{ color: "#555" }} />
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {branch.Open_Hours || "Sun–Thu: 9AM - 6PM"}
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ color: "#444", mb: 1 }}>
                Services:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                <Chip label="Personal Banking" />
                <Chip label="Loans" />
                <Chip label="ATM" />
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    flex: 1,
                    borderRadius: "12px",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  Get Directions
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    flex: 1,
                    borderRadius: "12px",
                    borderColor: "#aaa",
                    color: "#000",
                    "&:hover": { borderColor: "#000" },
                  }}
                >
                  Call Branch
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ pb: 4 }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "8px",
              },
            }}
          />
        </Stack>
      )}
    </div>
  );
}
