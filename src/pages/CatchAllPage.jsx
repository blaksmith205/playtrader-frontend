import React, { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import BUILDER_API_KEY from '../config.js';
import NotFound from "./NotFound.jsx";
import LoadingPage from "./LoadingPage.jsx";

builder.init(BUILDER_API_KEY);

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function CatchAllPage() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // get the page content from Builder
   useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: window.location.pathname
        })
        .promise();

      setContent(content);
      setNotFound(!content);
      // if the page title is found, 
      // set the document title
      if (content?.data.title) {
       document.title = content.data.title
      }
      setLoading(false);
    }
    fetchContent();
  });
  
  if (loading) {
    return (
      <LoadingPage/>
    )
  }
  // If no page is found, return 
  // a 404 page from your code.
  if (notFound && !isPreviewingInBuilder) {
    return (<NotFound/>)
  }
  // return the page when found
  return (
    <BuilderComponent model="page" content={content}/>
  );
}