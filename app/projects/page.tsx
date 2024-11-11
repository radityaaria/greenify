'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import microgen from '../../lib/microgen';

interface Project {
  _id: string;
  name: string;
  Desk: string;
  logo: { url: string }[];
  isReadMore: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await microgen.service('Product').find();
        if (error) {
          throw new Error(`Error fetching projects: ${error.message}`);
        }
        const projectsWithReadMore = (data || []).map((project: Project) => ({
          ...project,
          isReadMore: false,
        }));
        setProjects(projectsWithReadMore);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const toggleReadMore = (id: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === id ? { ...project, isReadMore: !project.isReadMore } : project
      )
    );
  };

  return (
    <div className="container mx-auto px-8 sm:px-4 mt-10">
      <h1 className="text-2xl md:text-4xl font-bold text-left mt-20 ml-1 my-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project) => (
          <div key={project._id} className="border p-2 md:p-4 rounded-lg shadow-xl overflow-hidden mx-2 sm:mx-0">
            <div className="mx-auto relative w-full h-40 md:h-48 flex items-center justify-center overflow-hidden">
              {project.logo && project.logo.length > 0 ? (
                <Image
                  src={project.logo[0].url}
                  alt={project.name}             
                  width={200} 
                  height={200} 
                  className="object-contain rounded-t-xl"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center bg-[#ffffff] text-[#000000]">No Image Available</span>
              )}
            </div>
            <div className="p-2 md:p-4">
              <h2 className="text-md md:text-xl font-bold">{project.name}</h2>
              <p className="text-gray-700 mt-2 text-sm md:text-base">
                {project.Desk.substring(0, 100)}
                {project.Desk.length > 100 && !project.isReadMore && '...'}
              </p>
              {project.Desk.length > 100 && (
                <AnimatePresence initial={false}>
                  {project.isReadMore && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.4, 0, 0.2, 1], 
                        staggerChildren: 0.05 
                      }}
                      className="text-gray-700 text-sm md:text-base"
                    >
                      {project.Desk.substring(100)}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
              {project.Desk.length > 100 && (
                <button
                  className="mt-2 bg-[#000000] text-white hover:bg-[#222222] py-1.5 px-2.5 text-xs rounded-md md:text-sm md:py-2 md:px-4"
                  onClick={() => toggleReadMore(project._id)}
                >
                  {project.isReadMore ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
