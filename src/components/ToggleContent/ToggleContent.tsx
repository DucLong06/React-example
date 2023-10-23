import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'


type Props = {}

const ToggleContent = ({ children }: any) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isScroll, setIsScroll] = useState(false)
    const [isMaxContent, setIsMaxContent] = useState(false)

    useEffect(() => {
       if(contentRef.current){
            if(contentRef.current.clientHeight > 384){
                setIsScroll(true)
            }else{
                setIsScroll(false)
            }
       }

    }, [contentRef])


    return (
        <div className='flex flex-col'>
            <div className={`overflow-hidden ${ isScroll && (isMaxContent ? "max-h-full" : "max-h-96")}`}>
                <div ref={contentRef} className="whitespace-normal break-words">
                    {children}
                </div>
            </div>
            <p
                className='mb-0 gap-1 p-3 cursor-pointer tex-14 text-primary flex items-center justify-center hover:text-primary-600'
                onClick={()=>{
                    setIsMaxContent(!isMaxContent)
                }}
            >
                {
                    isScroll &&
                    (
                        isMaxContent
                        ? (
                            <React.Fragment>
                                <span>Thu gọn</span>
                                <CaretUpOutlined />
                            </React.Fragment>
                        )
                        : (
                            <React.Fragment>
                                <span>Mở rộng</span>
                                <CaretDownOutlined />
                            </React.Fragment>
                        )
                    )
                }

            </p>
        </div>
    )
}

export default ToggleContent