import styled from "@emotion/styled";

import Button from "../components/buttons/Button";
import InputFile from "../components/inputs/InputFile";
import Input from "../components/inputs/Input";
import TextArea from "../components/inputs/Input-textarea";
import { typography } from "../styles/typography";
import { fonts } from "../styles/typography";
import { colors } from "../styles/colors";
import { getRecruiter, updateRecruiter } from "../services/recruiter-service";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const Container = styled.div`
  display: block;
  width: 960px;
  height: 95.5vh;
  margin-top: 2rem;
  margin-left: 7.5rem;
  margin-right: 7.5rem;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.pink.light};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${colors.pink.pink};
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
`;

const Profile = styled.h1`
  ${typography.head.md};
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  width: 18.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
`;

function RecruiterProfile() {
  const [recruiter, setRecruiter] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchRecruiter = async () => {
      try {
        const response = await getRecruiter();
        setRecruiter(response);
      } catch (error) {
        console.error("Error fetching recruiter:", error);
      }
    };

    fetchRecruiter();
  }, []);

  const handleChange = (e) => {
    setRecruiter({
      ...recruiter,
      [e.target.name]: e.target.value,
    });
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, company_name, company_website, company_about, file } =
      e.target.elements;

    const formFile = new FormData();
    formFile.append("file", file);

    const updatedRecruiter = {
      email: email.value,
      company_name: company_name.value,
      company_website: company_website.value,
      company_about: company_about.value,
      // file: formFile,
    };
    try {
      await updateRecruiter(updatedRecruiter)
        .then(console.log("Recruiter updated successfully."))
        .catch(console.log);
    } catch (error) {
      console.error("Error updating recruiter:", error);
    }
  };

  console.log(recruiter);

  return (
    <Container>
      <Profile>Profile</Profile>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          {/* <InputFile 
            id={"updLogo"} 
            name={"updLogo"} 
            label={"Company Logo"} 
            caption={"PNG, JPG, IMG"}
            onChange={handleFileChange}
            file={file}
          ></InputFile> */}
          <Input
            label={"Company Email"}
            type="email"
            name={"email"}
            value={recruiter.email ? recruiter.email : ""}
            onChange={handleChange}
          />
          <Input
            label={"Company Name"}
            name={"company_name"}
            value={recruiter.company_name ? recruiter.company_name : ""}
            onChange={handleChange}
          />
          <Input
            label={"Company Website"}
            type="url"
            name={"company_website"}
            value={recruiter.company_website ? recruiter.company_website : ""}
            onChange={handleChange}
          />
          <TextArea
            label={"About The Company"}
            name={"company_about"}
            value={recruiter.company_about ? recruiter.company_about : ""}
            onChange={handleChange}
          />
        </InputContainer>
        <Button type="primary" size={"sm"}>
          Update Profile
        </Button>
      </form>
    </Container>
  );
}

export default RecruiterProfile;
