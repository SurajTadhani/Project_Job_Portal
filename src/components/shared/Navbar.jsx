import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API } from "../utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { supabase } from "@/config";
import { setLoading } from '@/redux/authSlice'




function Navbar() {
  const { user } = useSelector((store) => store.auth);
  // console.log(user.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading
  
      try {
        const { data, error } = await supabase.auth.getUser();
  
        if (error || !data?.user) {
          return;
        }
  
        const oAuthUser = data.user.user_metadata;
  
       
        dispatch(setUser(oAuthUser));
  
        
        if (oAuthUser?.full_name) {
          toast.success(`Welcome back! ${oAuthUser.full_name}`);
        }
  
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []); 
  
  const logoutHandler = async () => {
    try {
      // First, log out from Supabase
      const { error: supabaseError } = await supabase.auth.signOut();
      if (supabaseError) {
        throw new Error(`Supabase logout failed: ${supabaseError.message}`);
      }
  
      // Then, log out from your backend
      const res = await axios.get(`${USER_API}/logout`, {
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
  
      // Handle errors safely
      const errorMessage = error?.response?.data?.message || error.message || "Logout failed";
      toast.error(errorMessage);
    }
  };
  

  return (
    <>
      <div className="bg-white fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold">
                Job<span className="text-[#F83002]">Portal</span>
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-12">
            <ul className="flex font-medium items-center gap-5">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                 
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browser">Browse</Link>
                  </li>
                </>
              )}
            </ul>

            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="login">
                  {" "}
                  <Button variant="outline">Login</Button>
                </Link>

                <Link to="signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  {user ? (
                    <Avatar className="cursor-pointer border">
                      <AvatarImage
                        className="text-red-500"
                        src={
                          user?.avatar?.url ||
                          user?.avatar_url ||
                          "https://res.cloudinary.com/dkdx1zqfm/image/upload/v1702733344/job_portal_avatars/default_avatar_p3z5op.png"
                        }
                        
                        alt={user?.fullname || user.full_name || "User"}
                      />
                    </Avatar>
                  ) : (
                    <p>Loading...</p>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="">
                    <div className="flex gap-2 space-y-2 items-center">
                      <Avatar className="cursor-pointer border">
                        <AvatarImage
                          src={
                            user?.avatar?.url ||
                          user?.avatar_url ||
                            "https://res.cloudinary.com/dkdx1zqfm/image/upload/v1702733344/job_portal_avatars/default_avatar_p3z5op.png"
                          }
                          alt={user?.fullname || user.full_name || "User"}
                        />
                      </Avatar>

                      <div>
                        <h4 className="font-medium">{user?.fullname || user.full_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col my-2 text-gray-600">
                     

{(user && (user.role === "student" || user.email_verified === true )) && (
  <div className="flex w-fit items-center gap-2 cursor-pointer">
    <User2 />
    <Button variant="link">
      <Link to="/profile">Profile</Link>
    </Button>
  </div>
)}


                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
