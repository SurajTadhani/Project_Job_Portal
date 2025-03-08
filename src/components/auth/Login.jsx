import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { USER_API } from "../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "@/redux/authSlice";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { supabase } from "@/config";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const SignInWithOauth = async (provider) => {
    try {
      // Initiate OAuth login using Supabase
      const { error } = await supabase.auth.signInWithOAuth({
        provider: `${provider}`,
        // options: {
        //   redirectTo: 'http://localhost:5173', 
        // },
      });

      if (error) {
        console.log(error);
        return;
      }
   

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])

  return (
    <>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-28"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              placeholder="tadhani@gmail.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              placeholder="******************"
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
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}
          <div className="py-4 flex items-center justify-evenly text-[30px] ">
         
             
          
              <FcGoogle
                onClick={() => SignInWithOauth("google")}
                className="cursor-pointer"
              />
           

            <FaFacebook
              onClick={() => SignInWithOauth("facebook")}
              className="cursor-pointer"
            />
            <FaGithub
              onClick={() => SignInWithOauth("github")}
              className="cursor-pointer"
            />
          </div>
          <span className="text-sm">
            Don't have an account?{" "}
            <Link className="text-blue-600" to="/signup">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;
