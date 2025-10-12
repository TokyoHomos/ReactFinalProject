import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchIcon } from "lucide-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../BankBranchFinder/store/branchesSlice";
import BranchCard from "./BranchCard";

export default function FindBankBranchInputSection() {
  const dispatch = useDispatch();
  const branchesState = useSelector((state) => state.branches.branches);

  const [banks, setBanks] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (branchesState.length > 0) {
      const uniqueBanks = [...new Set(branchesState.map((b) => b.Bank_Name))];
      const uniqueCities = [...new Set(branchesState.map((b) => b.City))];
      setBanks(uniqueBanks);
      setCities(uniqueCities);
    }
  }, [branchesState]);

  const filteredBranches = branchesState.filter((branch) => {
    const matchesCity = selectedCity ? branch.City === selectedCity : true;
    const matchesBank = selectedBank ? branch.Bank_Name === selectedBank : true;
    const matchesSearch = searchTerm
      ? branch.Branch_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.Branch_Address.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCity && matchesBank && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCity("");
    setSelectedBank("");
    setSearchTerm("");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ maxWidth: 1700, margin: "0 auto", padding: 2 }}>
        {/* Header */}

        {/* Inputs Section with Border */}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 3,
            backgroundColor: "#f9f9f9",
            marginBottom: 4,
            
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <FilterAltIcon sx={{ fontSize: 30 }} />
            <Typography sx={{ fontSize: 20, color: "text.secondary" }}>
              Find Bank Branches
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* Search Field */}
            <TextField
              variant="outlined"
              placeholder="Search by branch name or address..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                maxWidth: 350,
                width: "100%",
                backgroundColor: "#ebebebff",
                borderRadius: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "14px",
                  color: "#888",
                  opacity: 1,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={16} style={{ color: "#888" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* City Dropdown */}
            <Select
              displayEmpty
              size="small"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              sx={{
                maxWidth: 350,
                width: "100%",
                backgroundColor: "#ebebebff",
                borderRadius: 3,
                "& .MuiSelect-select": {
                  padding: "10px 14px",
                  fontSize: "14px",
                  color: "#555",
                },
              }}
            >
              <MenuItem value="">
                <em>All Cities</em>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>

            {/* Bank Dropdown */}
            <Select
              displayEmpty
              size="small"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              sx={{
                maxWidth: 350,
                width: "100%",
                backgroundColor: "#ebebebff",
                borderRadius: 3,
                "& .MuiSelect-select": {
                  padding: "10px 14px",
                  fontSize: "14px",
                  color: "#555",
                },
              }}
            >
              <MenuItem value="">
                <em>All Banks</em>
              </MenuItem>
              {banks.map((bank) => (
                <MenuItem key={bank} value={bank}>
                  {bank}
                </MenuItem>
              ))}
            </Select>

            {/* Clear Filter Button */}
            <Button
              variant="outlined"
              onClick={clearFilters}
              sx={{
                maxWidth: 350,
                width: "100%",
                height: "43px",
                borderRadius: 3,
                backgroundColor: "white",
                color: "#555",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Clear Filter
            </Button>
          </Stack>
        </Box>

        {/* Optional Branch Count */}
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          {filteredBranches.length} Branches Found
        </Typography>

        {/* Branch List */}
        <Box sx={{ mt: 2 }}>
          <BranchCard branches={filteredBranches} />
        </Box>
      </Box>
    </Box>
  );
}
