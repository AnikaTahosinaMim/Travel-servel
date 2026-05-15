import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <span className="text-pink-500 font-bold "> Return Home</span>
      </Link>
    </div>
  );
}
