export const metadata = {
  title: "Campus Notification System",
  description: "Stage 2 Notification Frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#fafafa" }}>
        {children}
      </body>
    </html>
  );
}
