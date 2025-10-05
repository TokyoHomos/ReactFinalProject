import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "../store/branchesSlice";
import { Typography, Grid, TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchPanel({ onResultsChange, buttonStatos }) {
  const dispatch = useDispatch();
  const branchesState = useSelector((state) => state.branches.branches);

  const [banks, setBanks] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  
  

  const [isVisible, setIsVisible] = useState(true);

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

  const handleSearch = () => {
    if (isVisible) {
      if (!selectedBank) return; // if nothing chosed
      const result = branchesState.filter((b) => b.Bank_Name === selectedBank);
      onResultsChange(result);
      buttonStatos(true);
    } else {
      if (!selectedCity) return; // if nothing chosed
      const result = branchesState.filter((b) => b.City === selectedCity);
      onResultsChange(result);
      buttonStatos(true);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {isVisible ? (
          <Autocomplete
            options={banks}
            value={selectedBank}
            onChange={(e, val) => setSelectedBank(val)}
            renderInput={(params) => (
              <TextField {...params} label="Choose Bank" />
            )}
          />
        ) : (
          <Autocomplete
            options={cities}
            value={selectedCity}
            onChange={(e, val) => setSelectedCity(val)}
            renderInput={(params) => (
              <TextField {...params} label="Choose City" />
            )}
          />
        )}
      </Grid>
      <Grid size={1}>
        {isVisible ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", height: "100%" }}
            onClick={() => {
              setIsVisible(false);
            }}
          >
            City
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", height: "100%" }}
            onClick={() => {
              setIsVisible(true);
            }}
          >
            Bank
          </Button>
        )}
      </Grid>
      <Grid size={3}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", height: "100%" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>
      <Grid size={12}>
        <Typography gutterBottom align="left" color="gray">
          Insert Bank Name or City Name after that press Search
        </Typography>
      </Grid>
    </Grid>
  );
}
