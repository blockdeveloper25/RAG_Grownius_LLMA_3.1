import React from 'react'
import insta from '../../../assets/insta.svg'
import fb from '../../../assets/fb.svg'
import x from '../../../assets/x.svg'
import Page_right from '../Page_Right/Page_right'

const Page_left = () => {
  return (
    <div className='flex flex-col lg:flex-row w-full'>
        {/* Left Content */}
        <div className='flex flex-col items-start w-full lg:max-w-[720px] mt-5 lg:mt-[20px] px-4 lg:px-0'>
            {/* Main Heading Section */}
            <div className='flex flex-col items-start w-full'>
                <h1 className='text-4xl md:text-5xl lg:text-[65px] font-bold text-white lg:ml-[30px] mt-10 lg:mt-20 leading-[1.2] lg:leading-[75px]'>
                    Know Your <span className='text-teal-400'>Land</span>, Grow Your Best.
                </h1>
                
                {/* Steps Section */}
                <div className='flex flex-col items-start mt-8 lg:mt-12 lg:ml-[30px] w-full max-w-[490px]'>
                    {/* Step 1 */}
                    <div className='flex items-start text-white rounded-lg text-sm md:text-[15px] w-full'>
                        <div className='flex-shrink-0 flex items-center justify-center mr-4 w-10 h-10 bg-cyan-700 rounded-full text-lg font-semibold'>1</div>
                        <p>Enter your land <span className='text-teal-400'>details</span> like nitrogen, potassium, phosphorus, temperature, humidity, pH, and rainfall.</p>
                    </div>
                    
                    {/* Step 2 */}
                    <div className='flex items-start text-white rounded-lg text-sm md:text-[15px] mt-4 lg:mt-7 w-full'>
                        <div className='flex-shrink-0 flex items-center justify-center mr-4 w-10 h-10 bg-cyan-700 rounded-full text-lg font-semibold'>2</div>
                        <p>Move to the <span className='text-teal-400'>AI chat</span> and enter your question or select a suggested prompt.</p>
                    </div>
                    
                    {/* Step 3 */}
                    <div className='flex items-start text-white rounded-lg text-sm md:text-[15px] mt-4 lg:mt-7 w-full'>
                        <div className='flex-shrink-0 flex items-center justify-center mr-4 w-10 h-10 bg-cyan-700 rounded-full text-lg font-semibold'>3</div>
                        <p>Grownius AI analyzes the data and provides the best <span className='text-teal-400'>crop</span> recommendation.</p>
                    </div>
                </div>
            </div> 
            
            {/* Social Icons */}
            <div className='px-4 lg:px-[30px] mt-10 lg:mt-40 flex gap-6 lg:gap-[45px] mb-10 lg:mb-[232px]'>
                <img src={insta} alt="Instagram" className='w-8 h-8 lg:w-auto lg:h-auto' />
                <img src={fb} alt="Facebook" className='w-8 h-8 lg:w-auto lg:h-auto' />
                <img src={x} alt="Twitter" className='w-8 h-8 lg:w-auto lg:h-auto' />
            </div>   
        </div>
        
        {/* Right Content */}
        <div className='flex w-full lg:ml-[20px] lg:mt-[2px] justify-center lg:justify-start'>
            <Page_right/>
        </div>
    </div>
  )
}

export default Page_left