import React from "react";
import "../styles/Header.css";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Subtitles } from "lucide-react";

export default function Header() {
  return (
    <div className="Header">
      <div className="icon-countainer">
        <AccountBalanceIcon
          style={{
            fontSize: 50,
            color: "#ffffffff",
            display: "flex",
            alignContent: "center",
          }}
        />
      </div>
      <div className="web-name-countainer">
        <h1>BankFinder</h1>
      </div>
    </div>
  );
}
