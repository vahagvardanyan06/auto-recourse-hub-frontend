import Header from "../Header";
import Footer from "../Footer";
import React from "react";
import Head from "next/head";

export default function RootLayout({
  children,
  title = "kargo.am",
}: Readonly<{
  children: React.ReactNode;
  title?: string;
}>) {
  return (
    <div className="mt-24">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
