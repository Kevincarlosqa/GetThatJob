import styled from "@emotion/styled";
import JobImg from "../assets/job-card.png";
import {
  RiBuilding3Line,
  RiCalendar2Line,
  RiMoneyDollarCircleLine,
  RiFocus3Line,
} from "react-icons/ri";
import { colors } from "../styles/colors";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { showJob } from "../services/jobs-pro-services";
import { typography } from "../styles";
import CompanyFollowed from "./CompanyFollowed";
import { getFixedSalary } from "./utils";

const CardJobWrapper = styled.div`
  display: flex;
  width: 290px;
  height: 170px;
  padding: 16px;
  flex-direction: column;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  justify-content: space-between;
`;

const CompanyData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  width: 175px;
`;

const LogoWrapper = styled.div`
  width: 74.667px;
  height: 74.667px;
`;
// const Category

export const JobTitle = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0.15px;
  color: ${colors.gray.dark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const CompanyName = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.1px;
  color: ${colors.gray.gray};
`;

export const CategoryJob = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 140% */
  letter-spacing: 0.4px;
  color: ${colors.gray.light};
  font-family: Inter;
`;

export const JobTimeSalary = styled.div`
  display: flex;
  align-items: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.4px;
  gap: 4px;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const BenefitsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  color: ${colors.gray.light};
`;

const SeeMore = styled(Link)`
  text-decoration: none;
  color: ${colors.gray.gray};
  display: flex;
  padding: 8px 8px;
  height: 40px;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${colors.pink.pink};
  :hover {
    background-color: ${colors.gray.bg_dark};
  }
`;

const FollowButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FollowButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const JobsOpen = styled.span`
  ${typography.caption}
`;

function FollowCards({ props }) {
  const navigate = useNavigate();

  const [followData, setFollowData] = useState([]);
  const id = props.followable_id;
  console.log(followData.id);
  useEffect(() => {
    if (props.followable_type == "Job") {
      showJob(id).then(setFollowData).catch(console.log);
    } else {
      showJob(id).then(setFollowData);
    }
  }, []);

  const salaryRange = {
    min: followData.salary ? getFixedSalary(followData.salary[0], "min") : "",
    max: followData.salary ? getFixedSalary(followData.salary[1], "max") : "",
  };

  return (
    <CardJobWrapper>
      <CompanyInfo>
        <LogoWrapper>
          <img src={props.logo} />
        </LogoWrapper>
        {props.followable_type == "Job" ? (
          <CompanyData>
            <CategoryJob>
              <RiBuilding3Line style={{ width: "15px", height: "15px" }} />
              {followData.category}
            </CategoryJob>
            <JobTitle>{followData.title}</JobTitle>
            <CompanyName>{followData.company_name}</CompanyName>

            <BenefitsWrapper>
              <JobTimeSalary>
                <RiCalendar2Line style={{ width: "15px", height: "15px" }} />
                {followData.job_type}
              </JobTimeSalary>
              <JobTimeSalary>
                <RiMoneyDollarCircleLine
                  style={{ width: "15px", height: "15px" }}
                />
                {followData.salary
                  ? `${salaryRange.min} - ${salaryRange.max}`
                  : ""}
              </JobTimeSalary>
            </BenefitsWrapper>
          </CompanyData>
        ) : (
          <CompanyData>
            <CategoryJob>
              <RiBuilding3Line style={{ width: "15px", height: "15px" }} />
              {followData.category}
            </CategoryJob>
            <JobTitle>{followData.title}</JobTitle>
            <CompanyName></CompanyName>

            <BenefitsWrapper>
              <JobTimeSalary>2 jobs openings</JobTimeSalary>
            </BenefitsWrapper>
          </CompanyData>
        )}
      </CompanyInfo>
      <ButtonsContainer>
        <FollowButtonWrapper>
          <RiFocus3Line
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: `${colors.pink.pink}`,
              borderRadius: "50%",
              padding: "4px",
              color: "white",
            }}
          />
          FOLLOWING
        </FollowButtonWrapper>
        {props.followable_type == "Job" ? (
          <SeeMore to={`/jobs/${id}`}>SEE MORE</SeeMore>
        ) : (
          <SeeMore to={`/following/${id}`}>SEE MORE</SeeMore>
        )}
      </ButtonsContainer>
    </CardJobWrapper>
  );
}

export default FollowCards;
