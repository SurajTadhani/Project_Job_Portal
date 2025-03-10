import { JOB_API } from '@/components/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`https://job-portal-backend-zrs0.onrender.com/api/v1/job/getadminjobs`, { withCredentials: true });
                console.log("API Response:", res);
                if (res.data.success) {
                    console.log("Jobs fetched:", res.data.jobs);
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    console.log("Failed to fetch jobs");
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };
        fetchAllAdminJobs();
    }, [dispatch]); 
};


export default useGetAllAdminJobs