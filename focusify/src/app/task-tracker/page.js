import Navbar from '@/components/Navbar';
import Timer from '@/components/Timer';

export default function TaskTracker() {
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto max-w-4xl text-center pt-28 px-4 pb-20">
        <div className="content">
          <h1 className="font-kanit text-4xl md:text-5xl font-normal leading-tight text-[#f1f1f1] mb-8 bg-gradient-to-r from-[#0595c9] to-[#ff7b00] bg-clip-text text-transparent">
            Task Tracker
          </h1>
          
          <div className="space-y-6 text-center text-[#d1d1d1] mb-8">
            <p className="text-lg leading-relaxed">
              Track your study tasks and progress here.
            </p>
            <div className="bg-[rgba(255,255,255,0.05)] p-8 rounded-lg shadow-lg">
              <p className="text-xl text-[var(--primary-color)]">Coming Soon!</p>
              <p className="mt-4">The task tracker feature is currently under development.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Timer />
    </>
  );
}
