import styled from "@emotion/styled";
import JobPostCard from "./JobPostCard";
import { useState } from "react";
const Container = styled.div`
  display: block;
  width: 960px;
  margin: auto;
  margin-top: 32px;
  & h1 {
    font-family: Montserrat;
    font-size: 34px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.25px;
    color: #373737;
    margin-bottom: 16px;
  }
`;

const JobPostContainer = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  & > div > p {
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  & > div:first-child {
  }
  & > div:first-child > div {
    display: flex;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.25px;
  }
  & > div:last-child {
  }
  & > div:last-child > h3 {
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px; /* 140% */
    letter-spacing: 0.15px;
    color: #373737;
    margin-bottom: 8px;
  }
  & > div:last-child > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const JobPostings = () => {
  return (
    <Container>
      <h1>Job Postings</h1>
      <JobPostContainer>
        <div>
          <p>Filter your Job Postings</p>
          <div>
            <input type="checkbox" id="all" />
            <label htmlFor="all">All</label>
            <input type="checkbox" id="onTrack" />
            <label htmlFor="onTrack">With candidates on track</label>
            <input type="checkbox" id="closed" />
            <label htmlFor="closed">Closed</label>
          </div>
        </div>
        <div>
          <h3>4 jobs postings found</h3>
          <div>
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
          </div>
        </div>
      </JobPostContainer>
    </Container>
  );
};

export default JobPostings;