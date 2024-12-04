import Link from 'next/link';

type Country = {
  name: string;
  countryCode: string;
};

export default async function Home() {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/countries/available`;
  const response = await fetch(url, { cache: 'no-store' });
  const countries: Country[] = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">Available Countries</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map((country) => (
          <li key={country.countryCode} className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
            <Link
              href={`/countries/${country.countryCode}/${country.name}`}
              className="text-teal-400 text-xl font-semibold hover:underline"
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
