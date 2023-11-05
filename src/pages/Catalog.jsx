import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"
import { useDispatch } from 'react-redux';

const Catalog = () => {

  const { catalogName} = useParams();
  const [Desc, setDesc] = useState([]);
  const [CatalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setcategoryId] = useState(null);
  const [activeOption, setActiveOption] = useState(1);
  const dispatch = useDispatch();


  const fetchSublinks=  async ()=>{
    try {
        const result = await apiConnector("GET",categories.CATEGORIES_API);
        console.log("this :",result)
        const category_id= result.data.data.filter((item)=>item.name === catalogName)[0]._id;
        setcategoryId(category_id);      
        setDesc(result.data.data.filter((item)=>item.name=== catalogName)[0]);
        // console.log("Desc",Desc);  
        // console.log(category_id);
    } catch (error) {
      
        console.log(error);
    }
}
useEffect(() => {
    fetchSublinks();
    console.log(catalogName)
    
}, [catalogName])

useEffect(() => {
  const getCategoryDetails = async() => {
    try{
        const res = await getCatalogaPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
        console.log(CatalogPageData?.data.selectedCategory.courses);
    }
    catch(error) {
        console.log(error)
    }
}
    if (categoryId) {
      getCategoryDetails();
    }
}, [categoryId])


  return (
    <div>
      <div className=' box-content bg-richblack-800 px-4'>
      <div className='mx-auto flex min-h-[260px]  flex-col justify-center gap-4 '>
        <p className='text-sm text-richblack-300'>Home / Catalog / <span className='text-yellow-25'>{catalogName}</span> </p>
        <p className='text-3xl text-richblack-5'>{catalogName}</p>
        <p className='max-w-[870px] text-richblack-200'>
          {Desc?.description}
        </p>
      </div>
      </div>

      <div className=' text-white mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='Courses to get you started'>
        Courses to get you started
        </h2>
        <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
          <button onClick={()=>{setActiveOption(1)}}  className={activeOption===1? `px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer`:`px-4 py-2 text-richblack-50 cursor-pointer` }>Most Populer</button>
          <button onClick={()=>{setActiveOption(2)}} className={activeOption===1?'px-4 py-2 text-richblack-50 cursor-pointer':'px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer'}>New</button>
        </div>
            
<div className="grid  grid-cols-2 lg:grid-cols-3   gap-10">
{
              CatalogPageData?.data.mostSellingCourses?.map((item,index)=>(
                <Course_Card key={index} course={item} Height={"h-[100px] lg:h-[400px]"} />
              ))
            } 
</div>


      </div>

      <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl'>
          Similar to {catalogName}
        </h2>
        {
              CatalogPageData?.data.mostSellingCourses?.map((item,index)=>(
                <Course_Card key={index} course={item} Height={"h-[100px] lg:h-[400px]"} />
              ))
            } 
      </div>
      
      <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl'>
          Frequently BoughtTogether
          </h2>
          <div className='grid grid-cols-2  gap-3 lg:gap-6 lg:grid-cols-2 pr-4'>
            {
              CatalogPageData?.data.mostSellingCourses?.map((item,index)=>(
                <Course_Card key={index} course={item} Height={"h-[100px] lg:h-[400px]"} />
              ))
            }
          </div>
      </div>

    </div>
  )
}

    
    export default Catalog