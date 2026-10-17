import "./globals.css";

export const metadata = {
  title: "Planora — Event Requirement Posting",
  description: "Post and manage event requirements for planners, performers, and crew with Planora.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="backgroundGlow" />
        {children}
      </body>
    </html>
  );
}
