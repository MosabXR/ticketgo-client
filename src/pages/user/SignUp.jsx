import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
  Spinner,
} from "@material-tailwind/react";

import { signUp } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  // Naviagte after sign in
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Mutation
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.data.token);
      // navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // Form Handling
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      signUpMutation.mutate(values);
    },
  });

  return (
    <Card
      shadow={false}
      className="md:px-24 md:py-14 py-8 border border-gray-300"
    >
      <CardHeader shadow={false} floated={false} className="text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-xl md:!text-3xl lg:text-4xl"
        >
          Sign Up
        </Typography>
        <Typography className="!text-gray-600 text-[14px] md:text-[18px] font-normal">
          Sign up to create your account and start your journey with us.
        </Typography>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 md:mt-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <Input
                id="firstName"
                color="gray"
                size="lg"
                name="firstName"
                label="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                error={formik.touched.firstName && formik.errors.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <Typography color="red" className="text-sm mt-1">
                  {formik.errors.firstName}
                </Typography>
              )}
            </div>
            <div className="w-full">
              <Input
                id="lastName"
                color="gray"
                size="lg"
                name="lastName"
                label="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={formik.touched.lastName && formik.errors.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <Typography color="red" className="text-sm mt-1">
                  {formik.errors.lastName}
                </Typography>
              )}
            </div>
          </div>
          <div>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              label="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="red" className="text-sm mt-1">
                {formik.errors.email}
              </Typography>
            )}
          </div>
          <div>
            <Input
              id="password"
              color="gray"
              size="lg"
              type="password"
              name="password"
              label="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography color="red" className="text-sm mt-1">
                {formik.errors.password}
              </Typography>
            )}
          </div>
          <div>
            <Input
              id="confirmPassword"
              color="gray"
              size="lg"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <Typography color="red" className="text-sm mt-1">
                  {formik.errors.confirmPassword}
                </Typography>
              )}
          </div>
          <Button
            type="submit"
            size="lg"
            color="gray"
            fullWidth
            disabled={signUpMutation.isPending}
            className="flex items-center justify-center gap-2"
          >
            sign up
          </Button>
          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
            fullWidth
            disabled
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />
            sign up with google
          </Button>
          <Typography
            variant="small"
            className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
          >
            Upon signing up, you consent to abide by our{" "}
            <a href="#" className="text-gray-900">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-gray-900">
              Privacy Policy.
            </a>
          </Typography>
        </form>
      </CardBody>
    </Card>
  );
}

export default SignUp;
