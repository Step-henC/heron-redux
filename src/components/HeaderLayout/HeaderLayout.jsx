import Header from "../Header/Header";
// ideally this layout would wrap around app
//but useNavigate is used in header and components using useNavigate must be
//children of react router
export default function HeaderLayout({ children }) {
  return (
    <>
      <Header />
      <>{children}</>
    </>
  );
}