import React, { useEffect } from "react";
import Navbar from "../shared-component/Navbar";
import ApplicantTable from "./ApplicantTable";
import axios from "axios";
import { APPLICATION_API } from "../../../utils/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicantionSlice";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (e) {
        console.log("Some error occured in applicants page", e);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Applicants {applicants.applications.length}</h1>
      <ApplicantTable />
    </div>
  );
}

export default Applicants;
