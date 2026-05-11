import { ContactForm } from "@easycontact/react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Contact us
            </h1>
            <p className="mt-3 text-muted-foreground">
              Questions, feedback, or partnership ideas? Send us a message.
            </p>
          </div>
          <ContactForm projectId="8570afb8223dd211693581bc" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
