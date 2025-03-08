import React, { useEffect, useState } from "react";
import Job from "./Job";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

function Jobs() {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      let filteredJobs = allJobs.filter((job) => {
        const jobSalary = Number(job.salary); 
        const query = searchedQuery.toLowerCase();

        // 🔹 Check if searchedQuery is a salary range (e.g., "0-10", "10-20", "20-50")
        const salaryMatch = query.match(/^(\d+)-(\d+)$/);
        if (salaryMatch) {
          const minSalary = Number(salaryMatch[1]);
          const maxSalary = Number(salaryMatch[2]);

          return jobSalary >= minSalary && jobSalary <= maxSalary;
        }

  
        return job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query);
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <div className="max-w-7xl mx-auto my-[100px]">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
