import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchIcon } from "lucide-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../BankBranchFinder/store/branchesSlice";
import BranchCard from "./BranchCard"; // adjust path if needed
import "../styles/FindBankBranchInputSection.css";

export default function FindBankBranchInputSection() {
  const dispatch = useDispatch();
  const branchesState = useSelector((state) => state.branches.branches);

  const [banks, setBanks] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState(null);


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



  // filter logic
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
    <div className="FindBankBranchInputSection">
      <div className="countainer">
        <div className="filter-icon">
          <FilterAltIcon sx={{ fontSize: "30px" }} />
          <div className="title-counainer">
            <Typography gutterBottom sx={{ color: "subtitle", fontSize: 20 }}>
              Find Bank Branches
            </Typography>
          </div>
        </div>

        <div className="inputs-countainer">
          <div className="search-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                borderRadius: "10px",
              }}
            >
              {/* Search box */}
              <TextField
                variant="outlined"
                placeholder="Search by branch name or address..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: 350,
                  borderRadius: 3,
                  padding: "1px",
                  border: "none",
                  backgroundColor: "#ebebebff",
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

              {/* City dropdown */}
              <Select
                displayEmpty
                size="small"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                sx={{
                  width: 350,
                  backgroundColor: "#ebebebff",
                  borderRadius: 3,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.87)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                    borderWidth: "2px",
                  },
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

              {/* Bank dropdown */}
              <Select
                displayEmpty
                size="small"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                sx={{
                  width: 350,
                  backgroundColor: "#ebebebff",
                  borderRadius: 3,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.87)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                    borderWidth: "2px",
                  },
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

              {/* Clear filter button */}
              <Button
                variant="outlined"
                onClick={clearFilters}
                sx={{
                  width: 350,
                  height: "43px",
                  borderRadius: 3,
                  backgroundColor: "white",
                  color: "#555",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  "&:hover": {
                    borderColor: "rgba(0, 0, 0, 0.87)",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Clear Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the filtered branches */}
      <div className="branches-list">
        <BranchCard branches={filteredBranches} />
        
      </div>
    </div>
  );
}
