import React from 'react'
import { useRouter } from 'next/router'
export default function ClientProjectPage() {

    const router=useRouter();
    function loadProjectHandler() {
        router.push({
            pathname:'/clients/[id]/[clientprojectId]',
            query:{id:'max',clientprojectId:'projecta'}
        })
    }
  return (<div>
    <h1>The Project of a given Client</h1>
    <button onClick={loadProjectHandler}>
        Load Project A
    </button>
    </div>
  )
}
