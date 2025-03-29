"use client";

import { useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';

export default function YoutubeSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [videoResults, setVideoResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = process.env.API_KEY;
  const baseSearchURL = "https://www.googleapis.com/youtube/v3/search?";
  
  const searchFromInput = async () => {
    if (!searchInput.trim()) return;
    
    setLoading(true);
    setError('');
    
    const finalURL = `${baseSearchURL}key=${apiKey}&q=${encodeURIComponent(searchInput)}&type=video&part=snippet&maxResults=3`;
    
    try {
      const response = await fetch(finalURL);
      
      if (!response.ok) {
        throw new Error("Please make sure the keywords are valid alphanumeric characters.");
      }
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        setError('No results found. Try different keywords.');
        setVideoResults([]);
        return;
      }
      
      const results = data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`
      }));
      
      setVideoResults(results);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
      setVideoResults([]);
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
            onKeyDown={(e) => e.key === 'Enter' && searchFromInput()}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button 
          className="submit-button flex items-center justify-center gap-2"
          onClick={searchFromInput}
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
