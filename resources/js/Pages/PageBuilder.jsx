// resources/js/Pages/Admin/PageBuilder.jsx

import React, { useEffect,useState, useRef } from "react";
import { Inertia } from '@inertiajs/inertia';
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsStyleBg from "grapesjs-style-bg";
import gjsNavbar from "grapesjs-navbar";


export default function PageBuilder({ id = null, title = '', html = '', css = '', components = '', styles = '' , status: initialstatus = "" ,seoTitle:initialSeo="" ,seoDescription:initialDesc="" ,seoKeywords:initialKey=""}) {
  const editorRef = useRef(null);
  const editor = useRef(null);
  const [pageTitle, setPageTitle] = useState(title);
  const [status, setStatus] = useState(initialstatus);

  //SEO
  const [seoTitle, setSeoTitle] = useState(initialSeo);
  const [seoDescription, setSeoDescription] = useState(initialDesc);
  const [seoKeywords, setSeoKeywords] = useState(initialKey);
  const [slug, setSlug] = useState('');

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')   
    .replace(/^-+|-+$/g, ''); 
};

  useEffect(() => {
    
    if (editorRef.current && !editorRef.current.hasChildNodes()) {
      editor.current = grapesjs.init({
        container: editorRef.current,
        height: "100vh",
        fromElement: false,
        storageManager: { type: null },
        plugins: [gjsBlocksBasic, gjsPresetWebpage, gjsStyleBg ,gjsNavbar  ],
        pluginsOpts: {
          [gjsBlocksBasic]: {
            flexGrid: true,
          },
          [gjsPresetWebpage]: {},
          [gjsStyleBg]: {},

        },
        styleManager: [
          {
            name: "Position",
            properties: [
              { name: "Position", property: "position" },
              { name: "Top", property: "top" },
              { name: "Left", property: "left" },
              { name: "Right", property: "right" },
              { name: "Bottom", property: "bottom" },
              { name: "Z-Index", property: "z-index" },
            ],
          },
        ],

    assetManager: {
        upload: '/media/upload',
        uploadName: 'image',
        assets: [],
         headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
  },


  

      });
// Media
function refreshMediaLibrary() {
      fetch('/media/list')
        .then(res => res.json())
        .then(images => {
          if (!Array.isArray(images)) {
            console.error('Expected array of images!');
            return;
          }
          const assets = images.map(img => ({
            src: img.url,
            name: img.name,
          }));

          editor.current.AssetManager.clear();
          editor.current.AssetManager.add(assets);
        });
    }


    editor.current.on('asset:upload:response', () => {
      refreshMediaLibrary();
    });

    refreshMediaLibrary();




    //delete
    editor.current.on('asset:remove', (asset) => {
  const imageUrl = asset.get('src');

  fetch('/media/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify({ url: imageUrl })
  })
    .then(res => res.json())
    .then(data => {
      console.log('Image deleted:', data.message);
    })
    .catch(err => {
      console.error('Error deleting image:', err);
    });
});


    //  Custome Blocks 
      editor.current.BlockManager.add("h1", {
        label: "h1",
        content: "<h1>Write Your Header</h1>",
        category: "Text",
      });

      editor.current.BlockManager.add("h2", {
        label: "h2",
        content: "<h2>Write Your Header</h2>",
        category: "Text",
      });

      editor.current.BlockManager.add("h3", {
        label: "h3",
        content: "<h3>Write Your Header</h3>",
        category: "Text",
      });

      editor.current.BlockManager.add("span", {
        label: "span",
        content: "<span>Write Your Span</span>",
        category: "Text",
      });

      editor.current.BlockManager.add("ul", {
        label: "ul",
        media: `
        <svg class="w-20 h-20 text-stone-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
        </svg>
        ` ,
        content: `
        <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
        <li>item4</li>
        <li>item5</li>
        </ul>
        `
       ,
        category: "Text",
      });
     
      editor.current.BlockManager.add("button", {
        label: "Button",
        media:`
        <svg width="100px" height="100px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#9b9797" stroke="#9b9797" stroke-width="0.00024000000000000003" transform="matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"><path d="M20.5 17h-17A2.502 2.502 0 0 1 1 14.5v-4A2.502 2.502 0 0 1 3.5 8h17a2.502 2.502 0 0 1 2.5 2.5v4a2.502 2.502 0 0 1-2.5 2.5zm-17-8A1.502 1.502 0 0 0 2 10.5v4A1.502 1.502 0 0 0 3.5 16h17a1.502 1.502 0 0 0 1.5-1.5v-4A1.502 1.502 0 0 0 20.5 9zM17 12H7v1h10z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
        
        ` ,
        category: "Form",
        content: `<button style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 4px;">Submit</button>`,
      });

      editor.current.BlockManager.add("input", {
        label: "Input",
        category: "Form",
        content: `<input type="text" placeholder="Write anything" />`,
      });

      editor.current.BlockManager.add("Form", {
        label: "Form",
        category: "Form",
        content: `
          <form style="padding: 10px; margin:20px; border: 1px solid #ccc; border-radius: 4px;">
            <label>Name</label><br/>
            <input type="text" name="name" style="width: 100%; margin-bottom: 10px; padding: 5px;" /><br/>
            <label>Email</label><br/>
            <input type="email" name="email" style="width: 100%; margin-bottom: 10px; padding: 5px;" /><br/>
            <button type="submit" style="padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 4px;">Submit</button>
          </form>
        `,
      });

editor.current.AssetManager.add([
 
]);





// Navbar
editor.current.BlockManager.add("tailwind-navbar-fixed", {
  label: "Tailwind Navbar",
  category: "Layout",
  content: `
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />


<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
  `
});


// card
editor.current.BlockManager.add("Single card", {
  label: "Card With Image",
  category: "Layout",
  content: `
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />



<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg h-100" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>

  `
});


    }
    // ********************************************************************************************************************************

    // Edit Components
    if (components) {
      editor.current.setComponents(JSON.parse(components));
    } else if (html) {
      editor.current.setComponents(html);
    }

    if (styles) {
      editor.current.setStyle(JSON.parse(styles));
    } else if (css) {
      editor.current.setStyle(css);
    }

    editorRef.current = editor.current;
 
  }, []);

 const handleSave = () => {
  
    const html = editor.current.getHtml();
    const css = editor.current.getCss();
    const components = JSON.stringify(editor.current.getComponents());
    const styles = JSON.stringify(editor.current.getStyle());


    const data ={
        title: pageTitle,
        html,
        css,
        components,
        styles,
        status ,
        seoTitle:seoTitle,
        seoDescription:seoDescription,
        seoKeywords:seoKeywords ,
        slug,
    }
    if (id) {

 //Edit page
     Inertia.put(route('pages.update',id),data ,{
 
    });

    } else {
   //new page

Inertia.post(route('pages.store'), data, {
    });
  }
    }
 
  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Page Builder</h1>

    <div ref={editorRef} />
    <div className="p-4">
  

{/* Seo */}

<div className="p-4">
  <h2 className="text-lg font-bold mb-2">SEO Settings</h2>
  
  <input
    type="text"
    placeholder="Meta Title"
    className="border p-2 rounded w-full mb-2"
    value={seoTitle}
    onChange={(e) => setSeoTitle(e.target.value)}
  />

  <textarea
    placeholder="Meta Description"
    className="border p-2 rounded w-full mb-2"
    rows={3}
    value={seoDescription}
    onChange={(e) => setSeoDescription(e.target.value)}
  />

  <input
    type="text"
    placeholder="Meta Keywords (comma separated)"
    className="border p-2 rounded w-full mb-2"
    value={seoKeywords}
    onChange={(e) => setSeoKeywords(e.target.value)}
  />
</div>
      <input
        type="text"
        value={pageTitle}
        onChange={(e) => {
        const newTitle = e.target.value;
        setPageTitle(newTitle);
        setSlug(generateSlug(newTitle));
      }}
      
        
        placeholder="Add Page title .."
        className="border p-3 border-gray-400 rounded-md mb-4 w-50"
      />
{/* 
      <input
  type="text"
  value={slug}
  onChange={(e) => setSlug(e.target.value)}
  placeholder="Page Slug"
  className="border p-3 border-gray-400 rounded-md mb-4 w-50"
/> */}


<select name="status" id="" value={status}
 onChange={(e) => setStatus(e.target.value)}
   className="border m-4 w-50 border-gray-400 rounded" 
 >

  <option value="" disabled>Page Status</option>
  <option value="draft" >Draft</option>
  <option value="publish" >Publish</option>
</select>


      <button
        onClick={handleSave}
        className="bg-pink-600 text-white px-4 py-2 rounded m-4">
      Save Page
      </button>
    </div>
    </div>
  );
}
