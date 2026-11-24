import { generatePageMetadata } from "@/lib/seo";
import { Localized } from "@/lib/i18n";
import { Head } from "@/components/Site";
import { EMAIL } from "@/lib/data";
export async function generateMetadata() { return generatePageMetadata(); }
export default function Page() {
  return <><Head tag="Legal" title="Terms of use" /><div className="mx-auto grid max-w-3xl gap-4 px-6 pb-24 text-navy/85"><p><Localized>{"Starter text. Have it reviewed before launch."}</Localized></p>
    <p><Localized>{"We collect only what you send through our forms (name, email, booking details, messages) and use it to reply and deliver services. We do not sell your data. Submissions are stored securely and viewed only by CTC staff. Email "}</Localized><Localized>{EMAIL}</Localized><Localized>{" to access or delete your data."}</Localized></p>
    <p><Localized>{"Services are provided under a written quotation and agreement for each project. The scope in your signed quotation always applies."}</Localized></p></div></>;
}
