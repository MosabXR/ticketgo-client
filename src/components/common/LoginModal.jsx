import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../services/authService";
import toast from "react-hot-toast";

export function LoginModal({ open, setOpen }) {
  // Navigate after sign in
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Mutation
  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log(data);
      setOpen(false);
      localStorage.setItem("token", data.data.token);
      navigate("/");
      formik.resetForm();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Form Handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      signInMutation.mutate(values);
    },
  });

  // Password Visibility
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Dialog open={open} handler={setOpen} size="sm">
      <DialogHeader className="flex justify-center">Sign In</DialogHeader>
      <DialogBody>
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
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
          <div className="mb-6">
            <Input
              id="password"
              size="lg"
              name="password"
              label="Password"
              type={passwordShown ? "text" : "password"}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              error={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon
                      className={`h-5 w-5 cursor-pointer ${
                        formik.touched.password && formik.errors.password
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  ) : (
                    <EyeSlashIcon
                      className={`h-5 w-5 cursor-pointer ${
                        formik.touched.password && formik.errors.password
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  )}
                </i>
              }
            />
            {formik.touched.password && formik.errors.password && (
              <Typography color="red" className="text-sm mt-1">
                {formik.errors.password}
              </Typography>
            )}
          </div>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            sign in
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
            disabled
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />
            sign in with google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="font-medium text-gray-900"
            >
              Create account
            </Link>
          </Typography>
        </form>
      </DialogBody>
      <DialogFooter>
        {/* <Button variant="text" color="red" onClick={setOpen} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={setOpen}>
          <span>Confirm</span>
        </Button> */}
      </DialogFooter>
    </Dialog>
  );
}

export default LoginModal;
