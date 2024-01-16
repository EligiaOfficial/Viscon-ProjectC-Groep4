import { useTranslation } from "react-i18next";
import { getName } from "../Endpoints/Jwt";
import Layout from "../components/Layout";

function Dashboard() {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  return (
    <>
      <Layout>
        <div className="flex flex-col">
          <span className="text-2xl py-4 dark:text-white">Dashboard</span>
          <div className="flex flex-col">
            <span className="dark:text-orange-200 text-3xl">
              {t("dashboard.welcome")},{" "}
              {getName(token)[0] + " " + getName(token)[1]}!
            </span>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
