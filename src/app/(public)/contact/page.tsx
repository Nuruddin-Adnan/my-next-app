import ContactForm from "./ContactForm";
import { Suspense } from "react";
import ServiceTable from "./ServiceTable";
import Loading from "./loading";

export default async function ContactPage() {
  return (
    <div>
      <ContactForm
        name="Md. Nuruddin Adnan"
        email="nuruddin.adnan1993@gmail.com"
      />
      <Suspense fallback={<Loading />}>
        <ServiceTable />
      </Suspense>
    </div>
  );
}
