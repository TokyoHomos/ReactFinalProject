import React from "react";
import { Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapDialog({ open, onClose, branch }) {
  if (!branch) return null;

  const lat = branch.X_Coordinate || branch.lat || 0;
  const lng = branch.Y_Coordinate || branch.lng || 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent sx={{ position: "relative", height: "500px", p: 0 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
            background: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ position: "absolute", top: 10, left: 20, zIndex: 1000, background: "#fff", p: "4px 8px", borderRadius: "8px" }}
        >
          {branch.Branch_Name || "Branch Location"}
        </Typography>

        <MapContainer
          center={[lat, lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              {branch.Branch_Name || "Branch"} <br />
              {branch.Branch_Address || "Address not available"}
            </Popup>
          </Marker>
        </MapContainer>
      </DialogContent>
    </Dialog>
  );
}
