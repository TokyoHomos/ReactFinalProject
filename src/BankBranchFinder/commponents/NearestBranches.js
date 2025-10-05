import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "../store/branchesSlice";
import { Card, Button, Typography, CircularProgress } from "@mui/material";
import CalculateHaversineDistance from "../tools/CalculateHaversineDistance";

export default function NearestBranches({nearestBranchesO}){
  const dispatch = useDispatch();

  const { branches, loading, error: fetchError } = useSelector(
    (state) => state.branches
  );

  const [userLocation, setUserLocation] = useState(null);
  const [nearestBranches, setNearestBranches] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (branches.length === 0) {
      dispatch(fetchBranches());
    }
  }, [dispatch, branches.length]);


  const handleFindNearestBranches = () => {
    setError(null);
    setNearestBranches([]);

    if (!branches || branches.length === 0) {
      setError("Data not't Loaded");
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation service not Available");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

        // حساب المسافة لكل فرع
        const withDistance = branches
          .map((b) => {
            const lat = Number(b.X_Coordinate);
            const lng = Number(b.Y_Coordinate);
            const distance = CalculateHaversineDistance(userLat, userLng, lat, lng);
            return { ...b, distance };
          })
          .filter((b) => !isNaN(b.distance))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5); // Nearest 5 Branches

        setNearestBranches(withDistance);
        nearestBranchesO(withDistance)
      },
      () => {
        setError("Give me geolocation acces");
      }
    );
  };

  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Nearest Branches
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFindNearestBranches}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "nearest view"}
      </Button>

      {fetchError && (
        <Typography color="error" sx={{ mt: 2 }}>
          Data loading error: {fetchError}
        </Typography>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {userLocation && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Current Location: {userLocation.lat.toFixed(4)} , {userLocation.lng.toFixed(4)}
        </Typography>
      )}

      {nearestBranches.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
             Nearest 5 Branches
          </Typography>

          {nearestBranches.map((b) => (
            <Card
              key={b._id}
              sx={{
                p: 2,
                mt: 2,
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              <Typography fontWeight="bold" sx={{fontSize: "15px"}}>
                {b.Bank_Name} - {b.Branch_Name}
              </Typography>
              <Typography sx={{fontSize: "14px"}} color="text.secondary">
                {b.City} - {b.Branch_Address}
              </Typography>
              <Typography variant="body2">{b.Telephone}</Typography>
              <Typography variant="body2" sx={{ mt: 1, fontSize: "14px" }}>
                Distance: {b.distance.toFixed(2)} KM
              </Typography>
            </Card>
          ))}
        </>
      )}
    </Card>
  );
}
