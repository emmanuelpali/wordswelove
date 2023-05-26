"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';


const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleLogMenu, setToggleLogMenu] = useState(true)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <span>WordsWe&#x2764;</span>
        </Link>
        {/*Desktop navigation*/}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-quote"
                        className='black_btn'>
                            Add a Qoute
                        </Link>
                        <button type='button' className='outline_btn' onClick={signOut}>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile picture'
                            onClick={() => setToggleMenu((prev) => !prev)}/>
                        </Link>
                </div>
            ): (
                <>
                {!toggleLogMenu && <button onClick={() => setToggleLogMenu((prev) => !prev)}>Login</button>}
                {toggleLogMenu && 
                    <div className='flex relarive' onClick={() => setToggleLogMenu((prev) => !prev)}>
                        {providers && Object.values(providers).map((provider) => (
                        <button type='button'
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn m-1'
                        >
                            {provider.name.toUpperCase()}   
                        </button>                       
                    ))}
                    </div>
                }
                    
                </>
            )}
        </div>
        {/*Mobile navigation*/}
        <div className="sm:hidden flex relative">
        {session?.user ? (
                <div className="flex">                    
                       <Image
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile picture'
                        onClick={() => setToggleMenu((prev) => !prev)}/>
                        {toggleMenu && (
                    <div className='dropdown'>
                        <Link 
                            href="/profile"
                            className='dropdown_link'
                            onClick={() => setToggleMenu(false)}
                            >
                                My Profile
                        </Link>
                        <Link 
                            href="/create-quote"
                            className='dropdown_link'
                            onClick={() => setToggleMenu(false)}
                            >
                                Add a Quote
                        </Link>
                        <button
                            type='button'
                            onClick={() => {
                                setToggleMenu(false);
                                signIn();
                            }}
                            className='mt-5 w-full black_btn'>
                            Sign Out
                        </button>
                    </div>
                )}
                </div>
                
            ): (
                <>
                    {providers && 
                    Object.values(providers).map((provider) => (
                        <button type='button'
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn'
                        >
                            Sign In    
                        </button>  
                    ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav