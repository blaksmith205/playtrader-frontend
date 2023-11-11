
import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import BUILDER_API_KEY from '../config.js';
import NoPage from "./NoPage.jsx";

// Put your API key here
builder.init(BUILDER_API_KEY);

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function BuilderPage({data}) {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

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
    }
    fetchContent();
  }, [window.location.pathname]);
  
  // If no page is found, return 
  // a 404 page from your code.
  // The following hypothetical 
  // <FourOhFour> is placeholder.
  if (notFound && !isPreviewingInBuilder) {
    return (<NoPage/>)
  }

  // return the page when found
  return (
    <BuilderComponent data={data} model="page" content={content} />
  );
}