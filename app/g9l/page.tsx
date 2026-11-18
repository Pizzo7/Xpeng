import { redirect } from "next/navigation";

/** Old G9L URL — keep working, send people to the shared models route */
export default function G9LRedirectPage() {
  redirect("/models/g9l");
}
