import Feed from '@components/Feed'

function Home() {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className='head_text text-center'>
            Read & Share
            <br />
            <span className="text-center"> Words to live by</span>   
        </h1>
        <p className="desc text-center">
            Words to live by is a platform where users write, discover and share inspiring quotes
        </p>
        <Feed />
    </section>
  )
}

export default Home