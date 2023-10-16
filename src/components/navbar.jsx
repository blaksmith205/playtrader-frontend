"use client";
```jsx
import * as React from "react";
import { useState } from "react";

export default function NavigationBar() {
  const [show, setShow] = useState(() => null);

  return (
    <section className="flex flex-col relative shrink-0 box-border h-auto grow shadow-[1px_2px_8px_1px_rgba(0,0,0,0.12)] w-full self-stretch max-w-[1200px] items-stretch mx-auto px-5 py-2">
      <nav className="flex flex-row w-full max-md:justify-start max-md:items-start max-sm:items-center">
        <div className="relative self-stretch flex flex-row gap-5 justify-between w-full items-center my-3">
          <div className="flex flex-row grow-[1.1674179080885916] self-stretch relative max-md:items-center max-md:w-full max-md:mr-auto max-md:my-auto max-sm:justify-start">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets%2F62955796f30c49898454771daffc73bd%2Fc0802802320a4a1da8dfb6ea714f2e31?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F62955796f30c49898454771daffc73bd%2Fc0802802320a4a1da8dfb6ea714f2e31?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F62955796f30c49898454771daffc73bd%2Fc0802802320a4a1da8dfb6ea714f2e31?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F62955796f30c49898454771daffc73bd%2Fc0802802320a4a1da8dfb6ea714f2e31?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F62955796f30c49898454771daffc73bd%2Fc0802802320a4a1da8dfb6ea714f2e31?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F62955796f30c49898454771daffc73bd%2Fc0802802320a4a1da8dfb6ea714f2e31?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F62955796f30c49898454771daffc73bd%2Fc0802802320a4a1da8dfb6ea714f2e31?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F62955796f30c49898454771daffc73bd%2Fc0802802320a4a1da8dfb6ea714f2e31"className="aspect-square object-contain object-center w-full shrink-0 box-border min-h-[20px] min-w-[20px] overflow-hidden max-h-12 max-w-[89px] mx-auto max-md:w-auto max-md:grow max-md:mr-auto max-sm:max-h-[42px] max-sm:max-w-[53px] max-sm:min-w-[42px] max-sm:mr-auto"
            />
            <div className="relative flex flex-col grow-[3.1608208817763215] mt-4 max-md:hidden max-md:flex-row max-md:mr-auto max-sm:hidden">
              <nav className="relative self-stretch flex flex-row gap-4 justify-start max-md:justify-center">
                <a href="#" className="relative shrink-0 box-border">Home</a>
                <a href="#" className="relative shrink-0 box-border">
                  <p>Top Traders</p>
                </a>
                <a href="#" className="relative shrink-0 box-border ml-0.5 max-md:mx-0.5">About Us</a>
              </nav>
            </div>
          </div>
          <div className="relative flex flex-row grow-0 w-auto ml-auto mt-px max-md:hidden max-sm:hidden">
            <div className="flex flex-col relative shrink-0 box-border h-8 w-0.5 bg-stone-300 my-auto" />
            <div className="relative flex flex-row gap-4 ml-4">
              <button className="relative shrink-0 box-border appearance-none text-black rounded text-center cursor-pointer grow-0 p-3" openLinkInNewTab={false}>
                Login
              </button>
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0663bd40b99a4259a807f6f0014df73d?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0663bd40b99a4259a807f6f0014df73d?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0663bd40b99a4259a807f6f0014df73d?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0663bd40b99a4259a807f6f0014df73d?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0663bd40b99a4259a807f6f0014df73d?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0663bd40b99a4259a807f6f0014df73d?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0663bd40b99a4259a807f6f0014df73d?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F0663bd40b99a4259a807f6f0014df73d"className="aspect-[3.87] object-cover object-center w-full shrink-0 box-border min-h-[20px] min-w-[20px] overflow-hidden mt-5 max-md:flex max-md:max-w-[48px] max-md:w-6 max-md:h-6 max-sm:h-6 max-sm:w-6 max-sm:flex max-sm:ml-auto"
        />
      </nav>
      {show ? (
        <div gridRowWidth="25%" className="flex flex-col relative shrink-0 box-border items-stretch mt-5 max-md:flex max-sm:flex" items={[{ title: [{ "@type": "@builder.io/sdk:Element", "@version": 2, layerName: "Accordion item title", id: "builder-cef2e5f61bd9450998ce98874659e9b4", children: [{ "@type": "@builder.io/sdk:Element", "@version": 2, id: "builder-16064d92114b433f8db00d4548184fe5", component: { name: "Text", options: { text: "Product" } }, responsiveStyles: { large: { textAlign: "left", display: "flex", flexDirection: "column" } } }] }], responsiveStyles: { large: { position: "relative", display: "flex", alignItems: "stretch", flexDirection: "column", paddingBottom: "10px", backgroundColor: "rgba(234, 234, 234, 1)", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }, medium: { backgroundColor: "rgba(255, 255, 255, 1)" } } }, { title: [{ "@type": "@builder.io/sdk:Element", "@version": 2, layerName: "Accordion item title", id: "builder-25444a0cda1a4e138002a06478528f66", children: [{ "@type": "@builder.io/sdk:Element", "@version": 2, id: "builder-29e30f2a1cfa45c8aff75c25a8c2e38f", component: { name: "Text", options: { text: "Solution" } }, responsiveStyles: { large: { textAlign: "left", display: "flex", flexDirection: "column" } } }] }], responsiveStyles: { large: { position: "relative", display: "flex", alignItems: "stretch", flexDirection: "column", paddingBottom: "10px", backgroundColor: "rgba(234, 234, 234, 1)", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }, medium: { backgroundColor: "rgba(255, 255, 255, 1)" } } }, { title: [{ "@type": "@builder.io/sdk:Element", "@version": 2, layerName: "Accordion item title", id: "builder-b87a1f62897442bcab4116e2279b8e1c", children: [{ "@type": "@builder.io/sdk:Element", "@version": 2, id: "builder-a3463ad565344f68b77327369589ef1c", component: { name: "Text", options: { text: "Resources" } }, responsiveStyles: { large: { textAlign: "left", display: "flex", flexDirection: "column" } } }] }], responsiveStyles: { large: { position: "relative", display: "flex", alignItems: "stretch", flexDirection: "column", paddingBottom: "10px", backgroundColor: "rgba(234, 234, 234, 1)", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }, medium: { backgroundColor: "rgba(255, 255, 255, 1)" } } }]} oneAtATime={(event) => false} grid={false} useChildrenForItems={false}>
          <div>
            <div builder="accordion">
              <div builder="accordion-title">
                <div builder-id="builder-cef2e5f61bd9450998ce98874659e9b4" className="relative flex items-stretch flex-col bg-gray-200 p-2.5 max-md:bg-white">
                  <div builder-id="builder-16064d92114b433f8db00d4548184fe5" className="text-left">
                    <div dangerouslySetInnerHTML={{ __html: Product }} className="builder-text" />
                  </div>
                </div>
              </div>
              <div builder="accordion-detail" />
            </div>
            <div builder="accordion">
              <div builder="accordion-title">
                <div builder-id="builder-25444a0cda1a4e138002a06478528f66" className="relative flex items-stretch flex-col bg-gray-200 p-2.5 max-md:bg-white">
                  <div builder-id="builder-29e30f2a1cfa45c8aff75c25a8c2e38f" className="text-left">
                    <div dangerouslySetInnerHTML={{ __html: Solution }} className="builder-text" />
                  </div>
                </div>
              </div>
              <div builder="accordion-detail" />
            </div>
            <div builder="accordion">
              <div builder="accordion-title">
                <div builder-id="builder-b87a1f62897442bcab4116e2279b8e1c" className="relative flex items-stretch flex-col bg-gray-200 p-2.5 max-md:bg-white">
                  <div builder-id="builder-a3463ad565344f68b77327369589ef1c" className="text-left">
                    <div dangerouslySetInnerHTML={{ __html: Resources }} className="builder-text" />
                  </div>
                </div>
              </div>
              <div builder="accordion-detail" />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}