import { HeaderCompo } from "../components/SearchCompo";
import { HitsList } from "../components/HitsList";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeaderCompo />
      <Link href={{ pathname: "/results", query: { q: "france" } }}>
        {/* <Link href="/results?search=france">  > */}
        <button>Valider</button>
      </Link>
      <div className="body-content">
        <HitsList />
      </div>
    </>
  );
}
