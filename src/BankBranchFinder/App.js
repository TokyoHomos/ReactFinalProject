import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, Divider } from "@mui/material";
import SearchPanel from "./commponents/SearchPanel";
import BranchesCard from "./commponents/BranchesCard";
import NearestBranches from "./commponents/NearestBranches";
import MapView from "./commponents/MapView";


function App() {
  const branches = useSelector((state) => state.branches.branches);

  const [searchResults, setSearchResults] = useState([]);
  const [searchButtonStatus, setSearchButtonStatus] = useState(false);
  const [nearestBranches, setNearestBranches] = useState([])

  console.log(searchResults);
  

  return (
    <Container sx={{ mt: 3 }}>
      <Card sx={{ p: 3, mb: 3 }}>
        <SearchPanel
          onResultsChange={setSearchResults}
          buttonStatos={setSearchButtonStatus}
        />
        <BranchesCard
          branches={searchResults}
          isVisible={searchButtonStatus}
        />
        <Divider />
        <NearestBranches branches={searchResults} nearestBranchesO={setNearestBranches} />
        <MapView branches={searchResults} nearestBranches={nearestBranches}/>
      </Card>
    </Container>
  );
}

export default App;
