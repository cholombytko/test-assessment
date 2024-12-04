import Image from 'next/image';
import Link from 'next/link';
import PopulationChart from '@/app/components/PopulationChart';

type CountryInfo = {
  population: PopulationInfo[];
  borders: BorderCountryInfo[];
  flag: string;
};

type BorderCountryInfo = {
  commonName: string,
  officialName: string,
  countryCode: string,
  region: string,
  borders: null
}

type PopulationInfo = {
  year: number,
  value: number,
}

export default async function CountryPage({ params }: {params: { countryCode: string, countryName: string }}) {
  const { countryCode, countryName } = (await params);

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/countries/details?countryCode=${countryCode}&countryName=${countryName}`;
  console.log(url);
  const response = await fetch(url, { cache: 'no-store' });
  const countryInfo: CountryInfo = await response.json();

  if (!countryInfo) {
    return <div>Loading...</div>;
  }
  
  const borders = Array.isArray(countryInfo.borders) ? countryInfo.borders : [];

  const populationData = countryInfo.population || [];

  return (
    <div className="p-6 sm:p-8 md:p-12 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white rounded-lg shadow-lg">
      <Link
        href="/countries"
        className="absolute top-8 left-8 text-teal-400 text-xl font-semibold hover:underline bg-gray-800 p-3 rounded-md shadow-md hover:bg-teal-500 hover:text-white transition-all duration-300"
      >
        Back to Countries
      </Link>

      <h1 className="text-4xl sm:text-5xl font-bold text-center text-white">{countryName.split('%20').join(' ')}</h1>

      <div className="mt-6 flex flex-col items-center">
        <h3 className="text-white font-semibold text-xl">Flag:</h3>
        <div className="mt-2 w-32 h-19 overflow-hidden rounded-lg shadow-md border-4 border-white">
          <Image src={countryInfo.flag} alt={`${countryName} flag`} width={150} height={90} objectFit="cover" />
        </div>
      </div>

      {borders.length > 0 && (
        <div className="mt-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h5 className="text-white font-semibold text-xl text-center mb-4">Explore Neighboring Countries</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {borders.map((border) => (
                <Link
                  key={border.countryCode}
                  href={`/countries/${border.countryCode}/${border.commonName}`}
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
                >
                  {border.commonName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h5 className="font-semibold text-xl text-center mb-4">Population Growth Over Time</h5>
        <PopulationChart populationData={populationData} />
      </div>
    </div>
  );
}
