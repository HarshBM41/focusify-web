import Navbar from '@/components/Navbar';
import YoutubeSearch from '@/components/YoutubeSearch';
import Timer from '@/components/Timer';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto max-w-4xl text-center pt-28 px-4 pb-20">
        <div className="content">
          <h1 className="font-kanit text-4xl md:text-5xl font-normal leading-tight text-[#f1f1f1] mb-8 bg-gradient-to-r from-[#0595c9] to-[#ff7b00] bg-clip-text text-transparent">
            A Distraction Free Way To <br />Study from YouTube
          </h1>
          
          <div className="space-y-6 text-left text-[#d1d1d1] mb-8">
            <p className="text-lg leading-relaxed">
              Every time you log onto YouTube to look for educational videos, 
              the homepage provides something more "interesting" and distracts you.
            </p>
            <p className="text-lg leading-relaxed">
              Focusify removes the distracting "recommendation" videos while providing the same videos
              with all the essential features like playback speed control and full-screen functionality.
            </p>
            <p className="text-lg leading-relaxed">
              Use our Pomodoro Timer widget to maintain focus and the Task Tracker 
              to keep track of your progress and goals for the study session.
            </p>
            <p className="text-lg leading-relaxed bg-[rgba(5,149,201,0.1)] p-4 border-l-4 border-[#0595c9] rounded">
              Just enter the specific topic you want to study and get started!<br />
              <span className="text-sm opacity-75">Note: Mini-player video embeds usually don't work for non-educational 
              videos like music videos or movies, so focus on educational content.</span>
            </p>
          </div>
          
          <YoutubeSearch />
        </div>
      </div>
      
      <Timer />
    </>
  );
}
