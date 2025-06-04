import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { Inertia } from "@inertiajs/inertia";
// import pluginCKEditor from 'grapesjs-plugin-ckeditor';

export default function CreatePost({id = null,  categories = [] ,title: initialTitle = "",content: initialContent = "" ,status: initialstatus = "" ,category: initialCategory = "" ,seoTitle:initialSeo="" ,seoDescription:initialDesc="" ,seoKeywords:initialKey=""}) {
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
   editor.current.BlockManager.add("p", {
        label: "p",
        content: "<p>Write Your Header</p>",
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

        <img src="/placeholder.jpg" class="mb-2 rounded" data-image />
        <h2 data-title>Default Title</h2>
        
        <div data-description class="border-gray-800 border-2 p-5 m-4">
        <h3>Default Description</h3>
        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, incidunt? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, incidunt?</p>
        </div>
      `,
    },

    init() {
      this.on("change:description", () => {
        const desc = this.get("description") || "";
        const descEl = this.find('[data-description]')[0];
        if (descEl) {
          descEl.components(desc); 
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
    },
  },
});


editor.current.BlockManager.add("Simple Card", {
  label: "Card",
  category: "Components",
  content: {
    type: "card-component",
    
  },
});


editor.current.AssetManager.add([
 
]);







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



editor.current.addComponents(`
 <div class="card" style="${safeStyle(attrs.cardStyle || '')}">
    <img src="${attrs.image || '/placeholder.jpg'}" style="${safeStyle(attrs.imageStyle || '')}" class="mb-2 rounded" />
    <h2 style="${safeStyle(attrs.titleStyle || '')}">${attrs.title || 'Default Title'}</h2>
    <div style="${safeStyle(attrs.descriptionStyle || '')}">${attrs.description || 'Default Description'}</div>
  </div>
`);


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
  };const handleSave = () => {
  const wrapperEl = editor.current.getWrapper().view.el;
  const cards = wrapperEl.querySelectorAll(".card");
  const shortcodes = [];

  const getStyleString = (element) => {
    if (!element) return '';
    const computed = window.getComputedStyle(element);
    return `color:${computed.color}; background-color:${computed.backgroundColor};font-size:${computed.fontSize};font-family:${computed.fontFamily};font-weight:${computed.fontWeight};font-style:${computed.fontStyle}; text-decoration:${computed.textDecoration};`;
  };

  cards.forEach(card => {
    const titleEl = card.querySelector("h2");
    const imgEl = card.querySelector("img");
    const descEl = card.querySelector("div");

    const title = titleEl?.innerText || '';
    const image = imgEl?.getAttribute("src") || '';
    const description = descEl?.innerHTML || '';



    const cardStyle = card.getAttribute("style") || getStyleString(card);
    const titleStyle = titleEl?.getAttribute("style") || getStyleString(titleEl);
    const imgStyle = imgEl?.getAttribute("style") || getStyleString(imgEl);
    const descStyle = descEl?.getAttribute("style") || getStyleString(descEl);

    shortcodes.push(
 
  `[card title="${title}" image="${image}" description="${encodeURIComponent(description)}" ` +
  `cardStyle="${encodeURIComponent(cardStyle)}" ` +
  `titleStyle="${encodeURIComponent(titleStyle)}" ` +
  `imageStyle="${encodeURIComponent(imgStyle)}" ` +
  `descriptionStyle="${encodeURIComponent(descStyle)}"]`


    );
  });

  const content = shortcodes.join("\n");

  if (!title) {
    alert("Please enter a title.");
    return;
  }

  if (id) {
    Inertia.put(route("posts.update", id), { title, content ,category,status , seoTitle:seoTitle,
        seoDescription:seoDescription,
        seoKeywords:seoKeywords ,});
  } else {
    Inertia.post(route("posts.store"), { title, content ,category,status,   seoTitle:seoTitle,
        seoDescription:seoDescription,
        seoKeywords:seoKeywords , });
  }
};


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Post" : "Create New Post"}
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
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-gray-400 rounded p-2 m-4 w-72"
      />
  <label className="font-bold text-gray-700 ">Category :</label>

<select
  name="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border m-4 w-50 border-gray-400 rounded"
>
  <option value="" disabled>Select Post Category</option>
  {allCategories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>

<select name="status" id="" value={status}
 onChange={(e) => setStatus(e.target.value)}
   className="border m-4 w-50 border-gray-400 rounded" 
 >
  <option value="" disabled>Post Status</option>
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
