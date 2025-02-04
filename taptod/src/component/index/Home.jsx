import React from "react";
// import WalletPage from '../me/WalletCard'
import Intro from "./Intro";
import Services from "./Services";
import Header from "../Header_1";
import NavigationBar from "../Header";

export default function Home() {
  return (
    <div>
      <Header />
      <Intro />
      {/* <WalletPage /> */}
      <Services />
      <NavigationBar />
    </div>
  );
}
