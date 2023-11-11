import React, { useEffect, useState } from "react";
import { BuilderComponent, builder } from '@builder.io/react'
import BUILDER_API_KEY from '../config.js';
import NotFound from "./NotFound.jsx";
import LoadingPage from "./LoadingPage.jsx";

builder.init(BUILDER_API_KEY);
  
export default function BuilderPage({path}) {
  const [pageJson, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function fetchPage() {
      const json = await builder.get("page", {url: path}).promise();

      setPage(json);
      // if the page title is found, 
      // set the document title
      if (json?.data.title) {
        document.title = json.data.title
      }
      setLoading(false);
    }
    fetchPage();
  }, [path]);

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

