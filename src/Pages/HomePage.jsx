import { useContext, useEffect, useRef, useState } from "react";
import KOutlinedButton from "../components/kOutlinedButton";
import JobCard from "../components/JobCard";
import Hero from "../components/Hero";
import jobFilter from "../assets/job-filter.svg";
import { dbObject } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";
import { KButton, KDropDown, KTextField } from "../components/components";
import Scaffold from "../components/Scaffold";
import noData from "../assets/no-data.svg";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const { isScroll, setisScroll, _id } = useContext(Context);
  const [rolesList, setRolesList] = useState([]);
  const [vacancyList, setvacancyList] = useState([]);
  const [statesList, setstatesList] = useState([]);
  const [selectedState, setSelectedState] = useState("Pan India");
  const [selectedRole, setselectedRole] = useState("1");
  const [selectedDistance, setselectedDistance] = useState("");
  const [pageNo, setpageNo] = useState(0);
  const [citySearch, setCitySearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const openingsRef = useRef(null);

  async function fetchRoles() {
    try {
      const response = await dbObject.get("/role/fetch-roles.php");
      if (!response.data.error) {
        setRolesList(response.data.response);
      }
    } catch (error) {}
  }

  async function fetchVacancies() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pageNo", pageNo);
      formData.append("searchKey", searchKey);
      formData.append("city", citySearch);
      formData.append("state", selectedState);
      formData.append("distanceRange", selectedDistance);
      formData.append("roleId", selectedRole);
      const response = await dbObject.post(
        "/vacancy/fetch-vacancies.php",
        formData
      );
      if (!response.data.error) {
        setvacancyList(response.data.response);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function fetchStates() {
    try {
      const response = await dbObject.get("/states/fetch-states.php");
      if (!response.data.error) {
        setstatesList(response.data.response);
      }
    } catch (error) {}
  }

  async function clearFilter() {
    setselectedRole("1");
    setselectedDistance("");
    setSearchKey("");
    setCitySearch("");
    setSelectedState("Pan India");
    setpageNo(0);
    await fetchVacancies();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRoles();
    fetchStates();
  }, []);

  useEffect(() => {
    fetchVacancies();
  }, [selectedRole, pageNo, selectedDistance, selectedState]);

  useEffect(() => {
    if (isScroll) {
      openingsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setisScroll(false);
    }
  }, [isScroll]);

  return (
    <Scaffold isLoading={loading}>
      <Hero
        title="Healthcare jobs & opportunities"
        subtitle="curated job openings for Physicians, Nurses, Doctors ..."
        buttonLabel="Search company"
      >
        <div className="items-center">
          <h1 className="font-semibold text-gray-700 text-center md:text-2xl text-lg tracking-wide">
            Trending Job searches
          </h1>
          <p className="font-medium text-gray-400 text-center mt-2 md:text-sm text-[10px]">
            Most frequent searches by healthcare job seekers like you
          </p>
        </div>
      </Hero>

      <div className="bg-gray-50 rounded-bl-lg rounded-br-lg md:max-w-[1000px] mx-5 md:mx-auto drop-shadow-xl p-5">
        <div className="grid md:grid-cols-2 md:gap-10 items-center">
          <div className=" max-h-[400px] max-w-[400px] mx-auto flex justify-center content-center">
            <img className="h-full w-full" src={jobFilter} alt="filter-image" />
          </div>
          <div className="rounded-xl">
            <label className="kLabel mt-5">Filter by Role</label>
            <div className="flex flex-wrap">
              {rolesList.map((data, index) => (
                <div key={index}>
                  <KOutlinedButton
                    onClick={() => {
                      setselectedRole(data.id);
                    }}
                    isActive={selectedRole == data.id}
                    label={data.title}
                  />
                </div>
              ))}
            </div>

            <label className="kLabel mt-5">Filter by distance (km)</label>
            <div className="flex flex-wrap">
              <KOutlinedButton
                id={0}
                label="0 - 100 kms"
                isActive={selectedDistance === "0-100"}
                onClick={() => {
                  setselectedDistance("0-100");
                }}
              />
              <KOutlinedButton
                id={0}
                label="100 - 200 kms"
                isActive={selectedDistance === "100-200"}
                onClick={() => {
                  setselectedDistance("100-200");
                }}
              />
              <KOutlinedButton
                id={0}
                label="200 - 300 kms"
                isActive={selectedDistance === "200-300"}
                onClick={() => {
                  setselectedDistance("200-300");
                }}
              />
            </div>

            <div className="flex items-center gap-2 mt-5">
              <KTextField
                name="city"
                id="city"
                maxLength={10}
                margin="mb-0"
                placeholder="Search by city ..."
                label="Search by city"
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                }}
              />
              <KDropDown
                id="state"
                name="state"
                label="Search by state"
                margin="mb-0"
                onChange={(e) => {
                  setSelectedState(e.target.value);
                }}
                value={selectedState}
              >
                {statesList.map((data, index) => (
                  <option key={index} value={data.stateName}>
                    {data.stateName}
                  </option>
                ))}
              </KDropDown>
            </div>
          </div>
        </div>

        <div className="md:flex shadow-sm gap-2 mt-4">
          <input
            type="text"
            className="kTextField"
            name="searchKey"
            id="searchKey"
            placeholder="Search by tags, job profiles ..."
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
          <div className="grid grid-cols-2 flex-shrink-0 gap-2 mt-3 md:mt-0">
            <KButton
              onClick={fetchVacancies}
              label="Apply Filter"
              width="w-full"
            />
            <KButton
              onClick={clearFilter}
              label="Clear Filter"
              btnColor="bg-yellow-500"
              width="w-full"
            />
          </div>
        </div>
      </div>
      <div className="px-0 md:px-5">
        <h2
          ref={openingsRef}
          className="my-10 font-medium text-gray-700 text-center text-xl"
        >
          Recent Openings
        </h2>

        {vacancyList.length !== 0 ? (
          <>
            {vacancyList.map((data, index) => (
              <div key={index}>
                <JobCard data={data} />
              </div>
            ))}
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-around p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 light:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing{" "}
                <span className="font-semibold text-gray-900 light:text-white">
                  {vacancyList.length}
                </span>{" "}
                of Page
                <span className="font-semibold text-gray-900 light:text-white">
                  {" "}
                  {pageNo + 1}
                </span>
              </span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                  <button
                    onClick={() => {
                      if (pageNo > 0) {
                        setpageNo(pageNo - 1);
                      }
                    }}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Previous
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setpageNo(pageNo + 1);
                    }}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-10 mb-5">
              <img
                src={noData}
                alt="no-data"
                className="mx-auto h-48 w-4h-48"
              />
              <h1 className="text-2xl text-gray-400 font-bold mx-auto text-center">
                Sorry! No data found
              </h1>
            </div>
          </>
        )}
      </div>
    </Scaffold>
  );
}

export default HomePage;
