import React, { useEffect, useState } from "react";
import { BuilderComponent, builder } from '@builder.io/react'
import BUILDER_API_KEY from '../config.js';
import NotFound from "./NotFound.jsx";
import LoadingPage from "./LoadingPage.jsx";
import { Navigate } from "react-router-dom";

builder.init(BUILDER_API_KEY);
  
export default function BuilderPage({user, path, requireAuth, hide}) {
  const [pageJson, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function fetchPage() {
      if (!requireAuth || user) {
        const json = await builder.get("page", {url: path}).promise();

        setPage(json);
        // if the page title is found, 
        // set the document title
        if (json?.data.title) {
          document.title = json.data.title
        }
        setLoading(false);
      }
    }
    fetchPage();
  }, [path, user]);

  // Hide the login page if necessary and redirect to the provided url
  if (hide && !loading && user) {
    return (<Navigate to={hide.url} replace={true}/>);
  }
  // User needs to be signed in so redirect to login page
  if (requireAuth && !loading && !user) {
    return (<Navigate to={"/login"} replace={true}/>);
  }  
  // Otherwise show the loading page when loading data
  if (loading) {
    return (
      <LoadingPage/>
    )
  }
  if (pageJson) {
    // return the page when found
    return (
      <BuilderComponent model="page" content={pageJson}/>
    );
  } else {
    return (
      <NotFound/>
    );
  }
}

