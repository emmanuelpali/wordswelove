"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateQuote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");

  const [post, setPost] = useState({ quote: "",author: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/quote/${quoteId}`);
      const data = await response.json();

      setPost({
        quote: data.quote,
        author: data.author,
        tag: data.tag,
      });
    };

    if (quoteId) getPromptDetails();
  }, [quoteId])
console.log(post);
  const updateQuote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!quoteId) return alert("Missing quoteId!");

    try {
      const response = await fetch(`/api/quote/${quoteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          author: post.author,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateQuote}
    />
  );
};

export default UpdateQuote;