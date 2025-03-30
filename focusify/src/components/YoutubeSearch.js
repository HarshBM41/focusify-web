"use client";

import { useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';

export default function YoutubeSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [videoResults, setVideoResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
   
  const searchFromInput = async (input) => {
    if (!input || input.trim() === '') {
      setError('Please enter search keywords');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      
      if (!API_KEY) {
        throw new Error('YouTube API key is not configured. Please check your environment variables.');
      }
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(input)}&type=video&part=snippet&maxResults=3`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch results from YouTube');
      }
      
      const data = await response.json();
      
      const formattedResults = data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`
      }));
      
      setVideoResults(formattedResults);
    } catch (err) {
      setError(err.message);
      console.error('Error searching YouTube:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <div className="relative">
          <input 
            type="text"
            className="search-bar pl-12"
            placeholder="Enter title / keywords of your topic"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchFromInput(searchInput)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button 
          className="submit-button flex items-center justify-center gap-2"
          onClick={() => searchFromInput(searchInput)}
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </div>
      
      {error && (
        <div className="text-red-500 mt-4 text-center">{error}</div>
      )}
      
      <div className="video-container">
        {videoResults.map((video) => (
          <div key={video.videoId} className="w-full max-w-[720px] mb-12">
            <h3 className="font-medium text-xl mb-2 text-left text-white">
              {video.title}
            </h3>
            <p className="text-left text-gray-300 mb-2 text-sm">
              {video.channelTitle}
            </p>
            <iframe
              className="video-frame mb-2"
              title={video.title}
              src={video.embedUrl}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="text-left text-gray-400 text-sm">
              {video.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
