import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function BranchCard({ branches, buttonStatus }) {

  console.log("buttonStatus ",buttonStatus);
  

  const branchJSX = branches.map((branches) => (
    <Card key={branches._id} sx={{ p: 2, mb: 2, maxHeight: 295 }}>
      <Typography sx={{fontSize: "18px"}}>
        {branches.Bank_Name} - {branches.Branch_Name}
      </Typography>
      <Typography sx={{fontSize: "15px"}}>{branches.Branch_Address}</Typography>
      <Typography sx={{fontSize: "15px", color:"blue", textDecoration: "underline"}}>{branches.Telephone}</Typography>
    </Card>
  ));
  return (
    <Card sx={{ p: 2, mb: 2, maxHeight: "350px", overflowY: "auto",  }} className="card">
      {buttonStatus && (
        <Typography align="center" gutterBottom sx={{position:"sticky", top: 0}}>
        Number of Branches: {branches.length}
      </Typography>
      )}
      {branchJSX}
    </Card>
  );
}
