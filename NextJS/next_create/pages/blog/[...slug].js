import React from 'react'
import { useRouter } from 'next/dist/client/router'

export default function BlogPostPage() {

    const router = useRouter();
    console.log(router.query);
  return (
    <div>The Blog Posts</div>
  )
}
