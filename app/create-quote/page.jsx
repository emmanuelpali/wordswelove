"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"


const CreateQuote = () => {
    const router = useRouter();
    const {data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        quote: '',
        author: '',
        tag: ''
    });

    const createQuote = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/quote/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    quote: post.quote,
                    author: post.author,
                    tag: post.tag,
                    userId: session?.user.id
                })
            })

            if(response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <Form
        type="Add"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createQuote}
    />
  )
}

export default CreateQuote