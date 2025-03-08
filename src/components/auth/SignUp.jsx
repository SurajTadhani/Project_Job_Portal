import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API } from "../utils/constant";

import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function SignUp() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading,user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFilesHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!input.fullname || !input.email || !input.password || !input.phoneNumber) {
      toast.error("All fields are required.");
      return;
    }
    if (!input.role) {
      toast.error("Please select a role.");
      return;
    }
  
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    
    if (input.file) {
      formData.append("file", input.file);
    }
  
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/login", { replace: true }); // Use replace to prevent going back to signup
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])

  return (
    <>
      <div>
        <div className="flex items-center justify-center max-w-7xl mx-auto mt-10">
          <form
            onSubmit={submitHandler}
            className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          >
            <h1 className="font-bold text-xl mb-5">Sign Up</h1>
            <div className="my-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Suraj Tadhani"
              />
            </div>
            <div className="my-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="tadhani@gmail.com"
              />
            </div>
            <div className="my-2">
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="8080808080"
              />
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="***********"
              />
            </div>
            <div className="flex items-center justify-between">
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  name='file'
                  onChange={changeFilesHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-5">
            {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
            

              <div>
                <span className="text-sm">
                  Already have an account?
                  <Link className="text-blue-600" to="/login">
                    Login
                  </Link>{" "}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
