import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { COMPANY_API } from "../utils/constant";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";


const CompanySetup = () => {
  const params = useParams();

    useGetCompanyById(params.id);
  
  
  
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB.");
        return;
      }
      setInput({ ...input, file });
    }
  };



  const submitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
  
    if (input.file) {
      formData.append("file", input.file);
    }
  
    try {
      setLoading(true);
    
      const res = await axios.put(`${COMPANY_API}/update/${params.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res)
    
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error("Error in API call:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Internal server error.");
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null
    })
},[singleCompany]);

  return (
    <div className="max-w-xl mx-auto my-10">
      <form onSubmit={submitHandler}>
        <div className="flex items-center gap-5 p-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter company name"
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter company description"
              required
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="Enter company website"
              required
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Enter company location"
              required
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
            />
          </div>
        </div>
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Update
          </Button>
        )}
      </form>
    </div>
  );
};

export default CompanySetup;
