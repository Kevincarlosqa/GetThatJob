import { useState } from "react";
import styled from "@emotion/styled";
import { RiArrowRightSLine } from "react-icons/ri";

import Input from "./inputs/Input";
import TextArea from "./inputs/Input-textarea";
import Button from "../components/buttons/Button";
import InputFile from "./inputs/InputFile";
import { createUser, createUserWFile } from "../services/recruiter-service";
import { useAuth } from "../context/auth-context";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: auto;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: auto;
`;

const Label = styled.label`
  width: 360px;
`;

const ButtonSection = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row;
  gap: 16px;
`;

export default function RecruiterForm({ step, setStatus }) {
  const { loginRecruiter } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    company_name: "",
    company_website: "",
    company_about: "",
    resume: null,
  });

  const {
    email,
    password,
    passwordConfirmation,
    company_name,
    company_website,
    company_about,
    resume,
  } = formData;

  async function handleSubmit(event) {
    event.preventDefault();
    if (password === passwordConfirmation) {
      setStatus({
        step: 2,
        0: "Done!",
        1: "In Progress",
        2: "Pending",
      });
    } else {
      console.log("Passwords doesn't match.");
    }
  }

  async function handleSkip(event) {
    event.preventDefault();

    setFormData({
      ...formData,
      company_website: "",
      company_about: "",
      resume: null,
    });

    const userData = {
      email,
      password,
      company_name,
    };

    try {
      await createUser(userData)
        .then(console.log("User created successfully."))
        .catch(console.log);
    } catch (error) {
      console.log("Error creating user: ", error);
    }

    const credentials = {
      email,
      password,
    };

    loginRecruiter(credentials);
  }

  async function handleFinish(event) {
    event.preventDefault();

    const userData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    const formFile = new FormData();
    if (resume) {
      formFile.append("resume", resume);
      for (const [key, value] of Object.entries(userData)) {
        formFile.append(key, value);
      }
    }

    try {
      resume
        ? await createUserWFile(formFile)
        : await createUser(userData)
            .then(console.log("User created successfully."))
            .catch(console.log);
    } catch (error) {
      console.error("Error creating user:", error);
    }

    const credentials = {
      email,
      password,
    };

    loginRecruiter(credentials);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]:
        name === "company_name" || name === "company_about"
          ? value
          : value.trim(),
    });
  }

  function handleFileChange(event) {
    setFormData({
      ...formData,
      resume: event.target.files[0],
    });
  }

  let form;
  switch (step) {
    case 1:
      form = (
        <Form onSubmit={handleSubmit}>
          <InfoSection>
            <Input
              name="company_name"
              value={company_name}
              onChange={handleChange}
              placeholder={"My Company S.A"}
              label={"company name"}
              required
            />
            <Input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder={"some.user@mail.com"}
              label={"email"}
              required
            />
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder={"******"}
              label={"password"}
              required
            />
            <Input
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleChange}
              placeholder={"******"}
              label={"password confirmation"}
              required
            />
          </InfoSection>
          <Button
            style={{ alignSelf: "center", flexDirection: "row-reverse" }}
            type={"primary"}
            size={"sm"}
            icon={<RiArrowRightSLine />}
          >
            Next
          </Button>
        </Form>
      );
      break;
    case 2:
      form = (
        <Form>
          <Label>
            You can complete this information later but we recommend you to do
            it now
          </Label>
          <InfoSection>
            <Input
              name="company_website"
              value={company_website}
              onChange={handleChange}
              placeholder={"https://www.mycompany.sa"}
              label={"company website"}
            />
            <TextArea
              name="company_about"
              value={company_about}
              onChange={handleChange}
              placeholder={
                "My Company SA has the vision to change the way how..."
              }
              label={"About the company"}
            />
            <InputFile
              id={"logo"}
              name={"logo"}
              label={"upload the company logo"}
              caption={"Max size 5MB"}
              onChange={handleFileChange}
              file={resume}
            ></InputFile>
          </InfoSection>
          <ButtonSection>
            <Button type={"secondary"} size={"sm"} onClick={handleSkip}>
              skip this!
            </Button>
            <Button
              style={{ flexDirection: "row-reverse" }}
              type={"primary"}
              size={"sm"}
              onClick={handleFinish}
              icon={<RiArrowRightSLine />}
            >
              Finish
            </Button>
          </ButtonSection>
        </Form>
      );
      break;
    default:
      break;
  }

  return form;
}
