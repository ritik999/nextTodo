import React, { Suspense } from 'react'
import AddToDoForm from './addToDoForm'
import { TodoItem } from '@/components/ServerComponent'
import { redirect } from 'next/navigation';
import Todos from './todos';



const Page = async () => {

  return (
    <div className='container'>
      <AddToDoForm />
      <Suspense fallback={<div>loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  )
}

export default Page