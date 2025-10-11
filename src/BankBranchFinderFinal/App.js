import React from "react";
import Header from "./componnents/Header";
import FindBankBranchInputSection from "./componnents/FindBankBranchInputSection";
import BranchCard from "./componnents/BranchCard";

export default function App(){
    return(
        <div className="App">
            <Header/>
            <FindBankBranchInputSection/>
            {/* <BranchCard/> */}
        </div>
    )
}
