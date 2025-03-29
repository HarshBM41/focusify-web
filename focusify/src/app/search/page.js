import Navbar from '@/components/Navbar';
import YoutubeSearch from '@/components/YoutubeSearch';
import Timer from '@/components/Timer';

export default function Search() {
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto max-w-4xl text-center pt-28 px-4 pb-20">
        <h1 className="font-kanit text-4xl md:text-5xl font-normal leading-tight text-[#f1f1f1] mb-8">
          Search YouTube Content
        </h1>
        
        <YoutubeSearch />
      </div>
      
      <Timer />
    </>
  );
}
