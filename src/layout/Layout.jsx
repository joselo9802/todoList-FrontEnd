import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#F8F9F9] font-Nunito">
      <span className="absolute w-[200px] h-[200px] bg-[#E7E28D] bottom-0 left-0 rounded-tr-[500px] "></span>
      <span className="absolute w-[200px] h-[200px] bg-[#E7E28D] top-0 right-0 rounded-bl-[500px] "></span>
      <main className="relative h-[100vh] flex flex-col justify-center items-center">{children}</main>
    </div>
  );
};

export default Layout;
