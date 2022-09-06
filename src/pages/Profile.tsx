import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader, NotFound } from "../components";

export type response = "PENDING" | "SUCCESS" | "ERROR" | "NOT_FOUND";

function Profile() {
  const params = useParams();
  const username = params.username;
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userRepositories, setUserRepositories] = useState<any>(null);
  const [responseState, setResponseState] = useState<response>("PENDING");

  async function fetchUserProfile() {
    try {
      let res = await fetch(`https://api.github.com/users/${username}`);
      return await res.json();
    } catch (e) {
      return e;
    }
  }

  async function fetchUserRepos(url: string) {
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchPageData() {
    setResponseState("PENDING");
    try {
      let profileData = await fetchUserProfile();
      if (profileData?.message == "Not Found") {
        return setResponseState("NOT_FOUND");
      }
      if (profileData?.message == "Failed to fetch") {
        return setResponseState("ERROR");
      }
      let reposData = await fetchUserRepos(profileData.repos_url);
      setUserProfile(profileData);
      setUserRepositories(reposData);
      setResponseState("SUCCESS");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPageData();
    console.log(userProfile);
  }, []);

  if (responseState === "PENDING") return <Loader />;
  if (responseState === "ERROR") return <NotFound Type={responseState} />;
  if (responseState === "NOT_FOUND") return <NotFound Type={responseState} />;

  return (
    <div>
      <div>Github user is {userProfile?.login}</div>
      <div>No of Repos {userRepositories?.length}</div>

      <br />
      <Link to="/">Home</Link>
    </div>
  );
}

export default Profile;
