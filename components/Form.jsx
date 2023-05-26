import Link from 'next/link'
import React from 'react'

const Form = ({ type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text_left'>{type} a Quote</h1>
      <p className="desc text-left max-w-md">
        {type} or share amasing quotes with the world
      </p>

      <form
          onSubmit={handleSubmit}
          className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <label>
              <span className='font-satoshi font-semibold
              text-base text-gray-700'>
                Quote
              </span>
           
              <textarea 
              value={post.quote}
              onChange={(e) => setPost({
                ...post, quote: e.target.value
              })}
              className='form_textarea'
              placeholder='write your words here'
              required/>
            </label>
            <label>
              <span className='font-satoshi font-semibold
              text-base text-gray-700'>
                Author {' '}
              </span>
           
              <input 
              value={post.author}
              onChange={(e) => setPost({
                ...post, author: e.target.value
              })}
              className='form_input'
              required/>
            </label>
            <label>
              <span className='font-satoshi font-semibold
              text-base text-gray-700'>
                tag {' '}
                <span className='font-normal'>(#life #focus #moneysense)</span>
              </span>
           
              <input 
              value={post.tag}
              onChange={(e) => setPost({
                ...post, tag: e.target.value
              })}
              className='form_input'
              required/>
            </label>
            <div className="flex-end mx-3 mb-5 gap-4">
              <Link href="/" className=" btn text-sm bg-black text-white
              rounded-full px-5 py-1.5">
                Cancel
              </Link>
              <button
               className=" bg-blue-500 text-sm
               rounded-full px-6 py-1.5 text-white"
                type="submit"
                disabled={submitting}>
                {submitting ? `${type}...`: type }
              </button>
            </div>
      </form>
    </section>
  )
}

export default Form