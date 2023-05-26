"use client"

import { useEffect, useState } from "react"
import QuoteCard from "@components/QuoteCard"

const QuoteList = ({ data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) =>(
        <QuoteCard key={post._id}
          post={post}
          handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchWord, setSearchWord] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearch = (e) => {
      setSearchWord(prev => prev = e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/quote');
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <section className="feed">
        <form className="relative w-full flex-center">
          <input type="text"
              placeholder="Search for a tag" 
              value={searchWord}
              onChange={handleSearch}
              required
              className="search_input peer"/>
        </form>
    <QuoteList 
    data={posts}
    handleTagClick={() => {}}/>
    </section>
  )
}

export default Feed