import { api } from "@/utils/api";
import CreateAccount from "@/components/home/CreateAccount";
import ConfirmAccount from "@/components/home/ConfirmAccount";
import Secretary from "@/components/roles/Secretary";
import Client from "@/components/roles/Client";
import Admin from "@/components/roles/Admin";

export default function Home() {
  const { data, isLoading } = api.user.findUser.useQuery();
  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen w-full items-center justify-center">
          <p>loading...</p>
        </div>
      ) : (
        <div>
          {data === null ? (
            <CreateAccount />
          ) : (
            <>
              {data?.confirmed ? (
                <>
                  {data.role === "secretary" && <Secretary />}
                  {data.role === "client" && <Client />}
                  {data.role === "admin" && <Admin />}
                </>
              ) : (
                <ConfirmAccount />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
