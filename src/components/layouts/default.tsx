import Footer from "components/_common/footer";
import CustomNavbar from "components/_common/custom-navbar";

export default function Layout({ children }:any) {
  return (
    <>
      <CustomNavbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}