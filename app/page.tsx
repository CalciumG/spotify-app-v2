import { SignInButton } from "@/components/SignInButton";
import { ClientTopLists } from "@/components/TopLists/ClientTopList";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return session?.user ? (
    <section className="flex flex-col items-center justify-center gap-6">
      <ClientTopLists />
    </section>
  ) : (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6">
      <SignInButton />
    </section>
  );
}
