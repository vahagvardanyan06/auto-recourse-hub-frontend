import Header from "../Header";
import Footer from "../Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-24">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
