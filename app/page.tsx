import { SignInButton } from "@/components/SignInButton";
import { TopLists } from "@/components/TopLists/TopLists";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return session?.user ? (
    <section className="flex flex-col items-center justify-center gap-6">
      {/*@ts-expect-error Async Server Component */}
      <TopLists />
    </section>
  ) : (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6">
      <SignInButton />
    </section>
  );
}
