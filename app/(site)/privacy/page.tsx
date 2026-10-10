import { Head } from "@/components/Site";
import { EMAIL } from "@/lib/data";
export const metadata = { title: "Privacy policy" };
export default function Page() {
  return <><Head tag="Legal" title="Privacy policy" /><div className="mx-auto grid max-w-3xl gap-4 px-6 pb-24 text-navy/85"><p>Starter text. Have it reviewed before launch.</p>
    <p>We collect only what you send through our forms (name, email, booking details, messages) and use it to reply and deliver services. We do not sell your data. Submissions are stored securely and viewed only by CTC staff. Email {EMAIL} to access or delete your data.</p>
    <p>Services are provided under a written quotation and agreement for each project. The scope in your signed quotation always applies.</p></div></>;
}
