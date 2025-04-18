import "./globals.css";

export const metadata = {
  title: "Baccarat Predictor",
  description: "Predict the next outcome using ML",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
