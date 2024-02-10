import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    const [courses, setCourses] = useState([]);

    const [filteredCourses, setFilteredCourses] = useState([]);
    const [inputValue, setInputValue] = useState("");


   

    useEffect(() => {
        const getCourses = async()=>{
            const coursesData = await fetch('https://alemeno-assignment-370bd-default-rtdb.firebaseio.com/courses.json');
            const json = await coursesData.json();
            if(!courses.length){

                setCourses(Object.values(json));
                setFilteredCourses(Object.values(json));
            }
            console.log('Courses data', courses);
        }
          getCourses()
    }, [courses])

    const filterData = (keyword, courses) => {
      const data = courses.filter((course) =>
          course.name.toUpperCase().includes(keyword.toUpperCase()) || course.instructor.toUpperCase().includes(keyword.toUpperCase())
      )
      return data;
  }
    

  return (
    <div className='text-black p-2'>
        <div className=''>

        {
        courses.length === 0 ? <p>Loading... </p> : <div>
                     <div className="my-5 mx-2  flex items-center justify-center p-2">
                <input type="text" className="p-2 focus:outline-none w-1/3 border border-gray-400 rounded-lg " placeholder="Search for courses" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className="text-pink-100 search-btn m-2 p-2 bg-slate-900 rounded-md" onClick={() => {

                    const data = filterData(inputValue, courses);
                    setFilteredCourses(data)
                }
                }>Search</button>
            </div>
            <div>
            <div className='flex flex-wrap gap-3  justify-center m-2'>
      {filteredCourses.length !==0 ?  filteredCourses?.map((item)=> <Link to={"/course/"+item.id} className='cursor-pointer shadow-lg border-slate-900 border-2 rounded-md flex flex-col items-center justify-center'>
        <div className='h-40 w-44'>

            <img src={item.thumbnail} alt='thumbnail' className='h-40 w-40 p-2'/>
        </div>
            <div className='text-left text-white bg-slate-900 px-4 py-2'>
            <p className='font-bold'>{item.name}</p>
            <p className='text-sm'>by {item.instructor}</p>
            <p className='font-semibold'>Enrollement : {item.enrollmentStatus}</p>
                </div>

        </Link>
        ) :  <p className='font-semibold'>Sorry, no results</p>}
        </div>
        </div>
        </div>}
        </div>

    </div>
  )
}

export default Home