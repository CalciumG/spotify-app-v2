import { SignInButton } from "@/components/SignInButton";
import { TopLists } from "@/components/TopLists/TopLists";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex flex-col gap-6">
      <SignInButton />
      {session?.user && (
        /*@ts-expect-error Async Server Component */
        <TopLists />
      )}
    </section>
  );
}
