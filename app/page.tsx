export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the 100 Degree Club</h1>
      <p className="text-lg text-gray-400">
        The main content for camps has moved to the <a href="/camps" className="text-blue-500 hover:underline">/camps</a> page.
      </p>
      <p className="text-lg text-gray-400">
        Please navigate to the /camps endpoint to see the content.
      </p>
    </div>
  );
}
