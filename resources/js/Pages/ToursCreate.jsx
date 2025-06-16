import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { Inertia } from "@inertiajs/inertia";


export default function CreateTour({id = null,categories = [] ,title: initialTitle = "",content: initialContent = "" ,status: initialstatus = "" ,category: initialCategory = "" ,seoTitle:initialSeo="" ,seoDescription:initialDesc="" ,seoKeywords:initialKey=""}) {
  const editorRef = useRef(null);
  const editor = useRef(null);
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [allCategories, setAllCategories] = useState(categories);
  const [status, setStatus] = useState(initialstatus);

  //SEO
   const [seoTitle, setSeoTitle] = useState(initialSeo);
   const [seoDescription, setSeoDescription] = useState(initialDesc);
   const [seoKeywords, setSeoKeywords] = useState(initialKey);
   const [slug, setSlug] = useState('');

  useEffect(() => {
    if (editorRef.current && !editorRef.current.hasChildNodes()) {
      editor.current = grapesjs.init({
        container: editorRef.current,
        height: "70vh",
        fromElement: false,
        storageManager: { type: null },
        plugins: [],

        assetManager: {
        upload: '/media/upload',
        uploadName: 'image',
        assets: [],
         headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
  },
      });

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



editor.current.BlockManager.add("Simple Card", {
  label: "Tour card",
  category: "Components",
  content: {
    type: "card-component",
  },
});


editor.current.Components.addType("card-component", {
  model: {
    defaults: {
      traits: [
        { type: "text", label: "Title", name: "title", changeProp: 1 },
        { type: "text", label: "Image URL", name: "image", changeProp: 1 },
        {
          type: "textarea",
          label: "Description (HTML allowed)",
          name: "description",
          changeProp: 1,
        },
      ],

      tagName: "div",
      classes: ["card"],
      components: `
<link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
        <img src="/placeholder.jpg" class="mb-2 rounded" data-image />
        <h2 data-title class="font-bold text-2xl">Tour Title</h2>
        
        <div data-description class="border-gray-800 border-2 p-5 m-4">
        <h3 class="font-bold">Tour overview</h3>
        <p class="py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
       
       <p class="py-2"><svg class="w-6 h-6 text-gray-800 dark:text-white inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
</svg>
Aswan/Luxor
</p>
     <div >
       from :
    <svg class="w-5 h-5 text-teal-800 dark:text-white inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
<input type="date">

to :
 <svg class="w-5 h-5 text-teal-800 dark:text-white inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
<input type="date">

       </div>

     <h5 class="py-2"> <span class="font-bold">Duration :</span> 4 Days/5 Night</h5>

       <h5 class="font-bold">From : $ 780</h5>

       <button type="button" class="focus:outline-none text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-4 dark:focus:ring-yellow-900">Book Now</button>
        </div>
      `,
    },
init() {
  this.on("change:description", () => {
    const desc = this.get("description") || "";
    const descEl = this.find('[data-description]')[0];
    if (descEl) {
      try {
        const parsed = JSON.parse(decodeURIComponent(desc));
        descEl.components(parsed);
      } catch (e) {
        console.warn("Invalid description format", e);
      }
    }
  });

  this.on("change:title", () => {
    const title = this.get("title") || "";
    const titleEl = this.find('[data-title]')[0];
    if (titleEl) {
      titleEl.components(title);
    }
  });

  this.on("change:image", () => {
    const image = this.get("image") || "";
    const imgEl = this.find('[data-image]')[0];
    if (imgEl) {
      imgEl.addAttributes({ src: image });
    }
  });

  // أول تحميل
  const desc = this.get("description") || "";
  const title = this.get("title") || "";
  const image = this.get("image") || "";

  const descEl = this.find('[data-description]')[0];
  const titleEl = this.find('[data-title]')[0];
  const imgEl = this.find('[data-image]')[0];

  if (descEl) {
    try {
      const parsed = JSON.parse(decodeURIComponent(desc));
      descEl.components(parsed);
    } catch (e) {
      console.warn("Invalid description format", e);
    }
  }

  if (titleEl) titleEl.components(title);
  if (imgEl) imgEl.addAttributes({ src: image });
}

   
  },
});



editor.current.AssetManager.add([
 
]);
//edit

if (initialContent) {
  const matches = [...initialContent.matchAll(/\[card(.*?)\]/g)];

  matches.forEach((match) => {
    const attrs = {};
    const attrString = match[1];
    const attrMatches = [...attrString.matchAll(/(\w+)="([^"]*)"/g)];
    attrMatches.forEach(([, key, value]) => {
      attrs[key] = decodeURIComponent(value);
    });

const safeStyle = (styleStr) => {
  return styleStr.replace(/"/g, '&quot;');
};

editor.current.addComponents({
  type: "card-component",
  attributes: {
    title: attrs.title || '',
    image: attrs.image || '',
    description: attrs.description || '',
  },
});


  });
}


}



  }, []);

  const getAllCardComponents = () => {
    const allComponents = [];

    const traverse = (components) => {
      components.forEach((comp) => {
        if (comp.get("type") === "card-component") {
          allComponents.push(comp);
        }

        if (comp.components().length > 0) {
          traverse(comp.components());
        }
      });
    };

    const rootComponents = editor.current.DomComponents.getWrapper().components();
    traverse(rootComponents);

    return allComponents;
  };
  

const handleSave = () => {
  const wrapperEl = editor.current.getWrapper().view.el;
  const cards = wrapperEl.querySelectorAll(".card");
  const shortcodes = [];

  // دالة لتحويل الـ style إلى JSON
  const getStyleObject = (element) => {
    if (!element) return {};
    const computed = window.getComputedStyle(element);
    return {
      color: computed.color,
      backgroundColor: computed.backgroundColor,
      fontSize: computed.fontSize,
      fontFamily: computed.fontFamily,
      fontWeight: computed.fontWeight,
      fontStyle: computed.fontStyle,
      textDecoration: computed.textDecoration,
    };
  };

  // نجيب كل card-component من GrapesJS نفسه
  const allCards = getAllCardComponents();

  allCards.forEach((card) => {
    const title = card.get("title") || "";
    const image = card.get("image") || "";

    const titleStyle = encodeURIComponent(JSON.stringify(getStyleObject(card.view.el.querySelector("h2"))));
    const imgStyle = encodeURIComponent(JSON.stringify(getStyleObject(card.view.el.querySelector("img"))));
    const cardStyle = encodeURIComponent(JSON.stringify(getStyleObject(card.view.el)));

    // نحصل على description كـ JSON
    const descEl = card.find('[data-description]')[0];
    const description = descEl?.components().toJSON() || [];
    const descStyle = encodeURIComponent(JSON.stringify(getStyleObject(descEl?.view?.el)));

    shortcodes.push(
      `[card title="${title}" image="${image}" ` +
      `description="${encodeURIComponent(JSON.stringify(description))}" ` +
      `cardStyle="${cardStyle}" titleStyle="${titleStyle}" imageStyle="${imgStyle}" descriptionStyle="${descStyle}"]`
    );
  });

  const content = shortcodes.join("\n");

  if (!title) {
    alert("Please enter a title.");
    return;
  }

  if (id) {
    Inertia.put(route("tour.update", id), {
      title,
      content,
      category,
      status,
      seoTitle,
      seoDescription,
      seoKeywords,
    });
  } else {
    Inertia.post(route("tour.store"), {
      title,
      content,
      category,
      status,
      seoTitle,
      seoDescription,
      seoKeywords,
    });
  }
};


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Tour" : "Create New Tour"}
      </h1>


      <div ref={editorRef} style={{ border: "1px solid #ddd" }} />
      
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
        placeholder="Tour Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-gray-400 rounded p-2 m-4 w-72"
      />

{/* <select
  name="category_id"
  value={data.category_id}
  onChange={(e) => setData('category_id', e.target.value)}
  className="border rounded px-3 py-2 w-full"
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select> */}






  <label className="font-bold text-gray-700 ">Category :</label>

<select
  name="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border m-4 w-50 border-gray-400 rounded"
>
  <option value="" disabled>Select Tour Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>

<select name="status" id="" value={status}
 onChange={(e) => setStatus(e.target.value)}
   className="border m-4 w-50 border-gray-400 rounded" 
 >
  <option value="" disabled>Tour Status</option>
  <option value="draft" >Draft</option>
 
  <option value="publish" >Publish</option>
</select>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {id ? "Update Post" : "Save Post"}
      </button>
    </div>
  );
}
