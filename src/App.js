import React, { useState } from "react";
import { Container } from "@mui/material";
import SearchPanel from "./BankBranchFinder/commponents/SearchPanel";
import ResultsPanel from "./BankBranchFinder/commponents/ResultsPanel";
import { useSelector } from "react-redux";

function App() {
  const branches = useSelector((state) => state.branches.branches);
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (bank, city) => {
    const result = branches.filter(
      (b) =>
        (!bank || b.Bank_Name === bank) &&
        (!city || b.City === city)
    );
    setFiltered(result);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <SearchPanel onSearch={handleSearch} />
      <ResultsPanel branches={filtered} />
    </Container>
  );
}

export default App;
