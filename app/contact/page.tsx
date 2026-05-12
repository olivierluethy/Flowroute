import { ContactForm } from "@easycontact/react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactForm
      projectId="8570afb8223dd211693581bc"
      theme="dark"
      layout="page"
      align="center"
      heading="Get in touch"
      description="Questions, feedback, or just want to say hi? Send us a message and we'll get back to you."
    />
         
      <Footer />
    </main>
  );
}







