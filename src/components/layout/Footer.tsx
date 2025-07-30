export default function Footer() {
  return (
    <footer className="mt-auto p-4 border-t text-sm text-center text-gray-500">
      <p>
        © {new Date().getFullYear()} SmartStudy. All rights reserved.
      </p>
    </footer>
  );
}