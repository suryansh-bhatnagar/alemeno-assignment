import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CourseAccordionBar from './CourseAccordionBar';

const Coursepage = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null)
    const [isActive, setIsActive] = useState(Array(0))



    useEffect(() => {
        const getCourseInfo = async () => {
            const data = await fetch('https://alemeno-assignment-370bd-default-rtdb.firebaseio.com/courses.json');

            const json = await data.json();
            if (!data.length) {
                const courseData = Object.values(json);
                console.log('Course data ',courseData , courseId);
                setCourseData(courseData.filter(item => item.id == courseId))
            }
           
        }
        getCourseInfo();
    }, [courseId])

    const handleActive = (id) => {
      // console.log("called", id)
      setIsActive(
        !isActive.includes(id)
          ? isActive.concat([id])
          : isActive.filter((e) => e != id)
      )
    }


    console.log('Course page data ',courseData);
  return (
    <div>
       { courseData?.length ?
        <div className='my-5  py-4'>
       
           <div className='flex justify-between bg-gray-800 min-h-64 px-20 py-4'>
            <div>
            <p className='text-white text-5xl font-bold'>{courseData[0].name}</p>
            <p className='text-white mt-4'>{courseData[0].description}</p>
            <p className='text-white mt-4'>Created by  {courseData[0].instructor}</p>
            <div className='flex'>
            <p className='text-white mt-4'>Enrollement status : {courseData[0].enrollmentStatus}</p>
            
            <p className='text-white mt-4 mx-2'> | </p>
            <p className='text-white mt-4'>Location : {courseData[0].location}</p>
                </div>
            <p className='text-white mt-4'>Schedule : {courseData[0].schedule}</p>
            <p className='text-white mt-4'>Duration : {courseData[0].duration}</p>
                </div>
              <img src={courseData[0].thumbnail} alt='thumbnail' className='h-64 w-64'/>
            </div>
            {/* Course Details Accordion */}
            <div className="py-4 mx-20">
              {courseData[0].syllabus?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
        </div>
: <p>Loading... </p>
        }
    </div>
  )
}

export default Coursepage