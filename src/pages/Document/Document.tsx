import { Empty } from 'antd'
import React from 'react'
import process from '../../assets/media/general/process.svg'
type Props = {}

const Document = (props: Props) => {
  return (
    <div className='p-6'>
        <Empty image={process} imageStyle={{ height: 180, marginBottom: 8 }} description={<span className='text-gray-500'>Sắp ra mắt!</span>}/>
    </div>
  )
}

export default Document