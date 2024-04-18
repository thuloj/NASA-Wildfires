import styled from "styled-components";
import { SectionTitle } from "../components/componentStyles";
import COLORS from "../assets/Theme";
import React, { useState, useEffect } from 'react';
import CategoryFilter from '../components/analysisComponents/CategoryFilter';
import axios from 'axios';

interface Resource {
  title: string;
  url: string;
  category: string;
  description: string;
  imageUrl: string;
}

const resources: Resource[] = [
    // Data Types
    {
      title: "Understanding Aerosol Data",
      url: "https://www.nasa.gov/mission_pages/aerosols/home",
      category: "Data Types",
      description: "Learn about aerosols, their properties, and how they affect climate and human health.",
      imageUrl: "",
    },
    {
      title: "Wind Energy Data",
      url: "https://www.nrel.gov/grid/wind-resource-assessment.html",
      category: "Data Types",
      description: "Explore wind energy data resources provided by the National Renewable Energy Laboratory (NREL).",
      imageUrl: "",
    },
    // Analysis Techniques
    {
      title: "Analyzing Aerosol Data",
      url: "https://earthdata.nasa.gov/learn/user-resources/webinar-and-tutorial-resources/aerosol-data",
      category: "Analysis Techniques",
      description: "Discover techniques for analyzing aerosol data using various tools.",
      imageUrl: "",
    },
    {
      title: "GIS Techniques for Solar Data Analysis",
      url: "https://www.nrel.gov/gis/solar.html",
      category: "Analysis Techniques",
      description: "Learn about Geographic Information System (GIS) techniques for analyzing solar data.",
      imageUrl: "",
    },
    // Tutorials and Guides
    {
      title: "NASA Earthdata Webinars",
      url: "https://earthdata.nasa.gov/learn/user-resources/webinar-and-tutorial-resources",
      category: "Tutorials and Guides",
      description: "Find webinars and tutorials on various topics related to NASA Earthdata.",
      imageUrl: "",
    },
    {
      title: "Wind Energy Basics",
      url: "https://www.nrel.gov/research/re-wind.html",
      category: "Tutorials and Guides",
      description: "Learn the basics of wind energy from the National Renewable Energy Laboratory.",
      imageUrl: "",
    },
    // Tools and Software
    {
      title: "Panoply",
      url: "https://www.giss.nasa.gov/tools/panoply/",
      category: "Tools and Software",
      description: "Panoply is a cross-platform application that can plot geo-referenced and other arrays from netCDF, HDF, GRIB, and other datasets.",
      imageUrl: "",
    },
    {
      title: "NASA Worldview",
      url: "https://worldview.earthdata.nasa.gov/",
      category: "Tools and Software",
      description: "Explore Earth's satellite imagery using NASA Worldview, an interactive interface for browsing full-resolution, global satellite imagery.",
      imageUrl: "",
    },
    // Research and Publications
    {
      title: "NASA Earth Observatory",
      url: "https://earthobservatory.nasa.gov/",
      category: "Research and Publications",
      description: "Explore the latest satellite imagery, articles, and research from NASA's Earth Observatory.",
      imageUrl: "",
    },
    {
      title: "NREL Publications Database",
      url: "https://www.nrel.gov/grid/publications.html",
      category: "Research and Publications",
      description: "Browse through research papers, technical reports, and more on renewable energy and energy efficiency from the National Renewable Energy Laboratory.",
      imageUrl: "",
    },
  ];

async function fetchUnsplashImage(query) {
  const accessKey = 'pkFXrkr7qxtu3wAM0i3lxvBo76fACDueFkMqaIx0Qjw';
  const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=1`);

  if (response.data.results.length > 0) {
    return response.data.results[0].urls.small;
  } else {
    return '';
  }
}

async function populateImages() {
  const updatedResources = await Promise.all(resources.map(async resource => {
    const imageUrl = await fetchUnsplashImage(resource.title);
    return { ...resource, imageUrl };
  }));
  return updatedResources;
}

const Analysis: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [updatedResources, setUpdatedResources] = useState(resources);

  useEffect(() => {
    populateImages().then(setUpdatedResources);
  }, []);

  const categories = ["All", "Data Types", "Analysis Techniques", "Tutorials and Guides", "Tools and Software", "Research and Publications"];

  const filteredResources = updatedResources.filter((resource) => selectedCategory === "All" || resource.category === selectedCategory);

  return (
    <AnalysisContainer>
      <SectionTitle className="mt-64">Analysis Resources</SectionTitle>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ResourceList>
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.title} {...resource} />
        ))}
      </ResourceList>
    </AnalysisContainer>
  );
};

const AnalysisContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #4E5055;
`;

const ResourceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`;

const ResourceCard: React.FC<Resource> = ({ title, url, category, description, imageUrl }) => (
  <ResourceCardContainer>
    <ResourceImage src={imageUrl} alt={`${title} thumbnail`} />
    <ResourceInfo>
      <ResourceTitle>{title}</ResourceTitle>
      <ResourceDescription>{description}</ResourceDescription>
      <ResourceLink href={url} target="_blank" rel="noopener noreferrer">
        Learn More
      </ResourceLink>
    </ResourceInfo>
  </ResourceCardContainer>
);

const ResourceCardContainer = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  padding: 1rem;
  margin: 1rem;
  background-color: #FFFDED;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;

const ResourceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const ResourceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
`;

const ResourceTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const ResourceDescription = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
`;

const ResourceLink = styled.a`
  font-size: 1rem;
  font-weight: 600;
  color: #d747b3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Analysis;
