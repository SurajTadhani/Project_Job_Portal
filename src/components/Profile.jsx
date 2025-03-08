import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

function Profile() {
  useGetAppliedJobs();
  const skills = ["Html", "Css", "Javascript", "Reactjs"]
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);


  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl mt-[140px] mb-[100px] p-8 container ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
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
              <h1 className="font-medium text-xl">{user?.fullname || user?.full_name}</h1>
              <p>
              {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || user?.phone_verified}</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
          {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
          </div>
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <div className="flex items-center gap-2">
              <Button 
                variant="link" 
                className="text-blue-500 p-0 hover:no-underline flex items-center gap-2"
                onClick={() => {
                  window.open(user.profile.resume, '_blank');
                }}
              >
                <span className="hover:underline">{user.profile.resumeOriginalName || 'View Resume'}</span>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <span className="text-black">NA</span>
          )}
        </div>

        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
          {/* Applied Job Table   */}
          <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} description="Update your profile details, including your skills and contact information." />

      </div>
    </>
  );
}

export default Profile;
