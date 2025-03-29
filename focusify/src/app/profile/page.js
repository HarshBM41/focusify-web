import Navbar from '@/components/Navbar';
import Timer from '@/components/Timer';
import { FaUser } from 'react-icons/fa';

export default function Profile() {
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto max-w-4xl text-center pt-28 px-4 pb-20">
        <div className="content">
          <h1 className="font-kanit text-4xl md:text-5xl font-normal leading-tight text-[#f1f1f1] mb-8 bg-gradient-to-r from-[#0595c9] to-[#ff7b00] bg-clip-text text-transparent">
            User Profile
          </h1>
          
          <div className="space-y-6 text-center text-[#d1d1d1] mb-8">
            <div className="bg-[rgba(255,255,255,0.05)] p-8 rounded-lg shadow-lg">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[#0595c9] to-[#ff7b00] flex items-center justify-center mb-4">
                <FaUser size={48} className="text-white" />
              </div>
              <p className="text-xl text-[var(--primary-color)]">Profile Coming Soon!</p>
              <p className="mt-4">User profiles are currently under development.</p>
              <p className="mt-4">Features will include:</p>
              <ul className="mt-2 list-disc list-inside text-left max-w-md mx-auto">
                <li>Study statistics and progress tracking</li>
                <li>Saved videos and playlists</li>
                <li>Custom timer settings</li>
                <li>Study goal setting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Timer />
    </>
  );
}
