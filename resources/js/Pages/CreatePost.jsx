import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { Inertia } from "@inertiajs/inertia";


export default function CreatePost({id = null, categories = [], postType = {},selectedCategories,tags=[],highlights=[],  selectedTags = [],
  selectedHighlights = [],title: initialTitle = "",content: initialContent = "" ,status: initialstatus = "" ,category: initialCategory = "" ,seoTitle:initialSeo="" ,seoDescription:initialDesc="" ,seoKeywords:initialKey="" }) {
  

  const [typeSlug, setTypeSlug] = useState(postType.slug || '');
  const editorRef = useRef(null);
  const editor = useRef(null);
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(Array.isArray(initialCategory) ? initialCategory : []);


  const [allCategories, setAllCategories] = useState(categories);
  const [status, setStatus] = useState(initialstatus);
  const [selectedCategoriesp, setSelectedCategoriesp] = useState(selectedCategories || []);
  const [selectedTagsp, setSelectedTagsp] = useState(Array.isArray(selectedTags) ? selectedTags : []);
  const [selectedHighlightsp, setSelectedHighlightsp] = useState(Array.isArray(selectedHighlights) ? selectedHighlights : []);

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
          <span>Aswan/Luxor</span>
          </p>
              <div >
                from :
              <svg class="w-5 h-5 text-teal-800 dark:text-white inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <span>10/1/2025</span>

          to :
          <svg class="w-5 h-5 text-teal-800 dark:text-white inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <span>16/1/2025</span>

                </div>

              <h5 class="py-2"> <span class="font-bold">Duration :</span> 4 Days/5 Night</h5>

                <h5 class="font-bold">From : $ 780</h5>

      `,
       script: function () {
      const title = this.getAttribute('title');
        const image = this.getAttribute('image');
        const description = this.getAttribute('description');

        const titleEl = this.querySelector('[data-title]');
        const imageEl = this.querySelector('[data-image]');
        const descEl = this.querySelector('[data-description]');

        if (titleEl && title) titleEl.innerText = title;
        if (imageEl && image) imageEl.src = image;
      if (descEl && description) {
    const editor = grapesjs.editors[0]; 
    const descComp = editor.DomComponents.getWrapper().find('[data-description]')[0];
    if (descComp) {
      descComp.components(decodeURIComponent(description));
    }
  }
}
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
  label: "Tour Card",
  category: "Components",
  content: {
    type: "card-component",
  },
});

// Blog Component 

editor.current.Components.addType("blog-card", {
  model: {
    defaults: {
      traits: [
        { type: "text", label: "Title", name: "title", changeProp: 1 },
        { type: "text", label: "Image URL", name: "image", changeProp: 1 },
        {
          type: "textarea",
          label: "Content (HTML allowed)",
          name: "content",
          changeProp: 1,
        },
      ],
      tagName: "div",
      classes: ["blog-card"],
      components: `
      <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
      <div class="border p-4 rounded-md shadow bg-white">
        <img src="/placeholder.jpg" data-image class="rounded mb-3" />
        <h2 class="text-xl font-bold mb-2" data-title>Blog Title</h2>
        <div class="text-gray-700 leading-relaxed" data-content>
          <p>This is blog content...</p>
        </div>
      </div>
  `,

    },


    init() {
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

      this.on("change:description", () => {
        const desc = this.get("description") || "";
        const descEl = this.find('[data-description]')[0];
        if (descEl) {
          try {
            const parsed = JSON.parse(decodeURIComponent(desc));
            descEl.components(parsed);
          } catch (e) {
            console.warn("Invalid description JSON", e);
          }
        }
      });

     
      const title = this.get("title") || "";
      const image = this.get("image") || "";
      const desc = this.get("description") || "";

      const titleEl = this.find('[data-title]')[0];
      const imgEl = this.find('[data-image]')[0];
      const descEl = this.find('[data-description]')[0];

      if (titleEl) titleEl.components(title);
      if (imgEl) imgEl.addAttributes({ src: image });

      if (descEl) {
        try {
          const parsed = JSON.parse(decodeURIComponent(desc));
          descEl.components(parsed);
        } catch (e) {
          console.warn("Invalid description JSON", e);
        }
      }

    },
  },
});


editor.current.BlockManager.add("Blog Card", {
  label: "Blog Card",
  category: "Components",
  content: {
    type: "blog-card",
  },
});


// single Elements
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


editor.current.addComponents({
  type: typeSlug === "blog" ? "blog-card" : "card-component",
  attributes: {
    title: attrs.title || '',
    image: attrs.image || '',
    description: attrs.description || '',
    cardStyle: attrs.cardStyle || '',
    titleStyle: attrs.titleStyle || '',
    imageStyle: attrs.imageStyle || '',
    descriptionStyle: attrs.descriptionStyle || '',
   
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
        if (comp.get("type") === "card-component" || comp.get("type") === "blog-card" ) {
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
  const cards = wrapperEl.querySelectorAll(".card ,.blog-card");
  const shortcodes = [];

  //save style as json 

  const getStyleObject = (element) => {
  if (!element) return {};
  const computed = window.getComputedStyle(element);
  return {
    color: computed.color,
    backgroundColor:computed.backgroundColor,
    fontSize: computed.fontSize,
    fontFamily: computed.fontFamily,
    fontWeight: computed.fontWeight,
    fontStyle: computed.fontStyle,
    textDecoration: computed.textDecoration,
  };
};


cards.forEach(card => {
  const isBlogCard = card.classList.contains('blog-card');
  
  const titleEl = card.querySelector("[data-title]");
  const imgEl = card.querySelector("[data-image]");
  const descEl = card.querySelector(isBlogCard ? "[data-content]" : "[data-description]");

  const title = titleEl?.innerText || "";
  const image = imgEl?.getAttribute("src") || "";
  const description = descEl?.innerHTML || "";

  const cardStyle = encodeURIComponent(JSON.stringify(getStyleObject(card)));
  const titleStyle = encodeURIComponent(JSON.stringify(getStyleObject(titleEl)));
  const imgStyle = encodeURIComponent(JSON.stringify(getStyleObject(imgEl)));
  const descStyle = encodeURIComponent(JSON.stringify(getStyleObject(descEl)));

  shortcodes.push(
    `[card type="${isBlogCard ? "blog" : "tour"}" title="${title}" image="${image}" description="${encodeURIComponent(description)}" cardStyle="${cardStyle}" titleStyle="${titleStyle}" imageStyle="${imgStyle}" descriptionStyle="${descStyle}"]`
  );
});

  const content = shortcodes.join("\n");

  if (!title) {
    alert("Please enter a title.");
    return;
  }

  if (id) {
    console.log(id,typeSlug)
    Inertia.put(route("post.update", { id: id, slug: typeSlug }), { title, content ,category:selectedCategoriesp,status , seoTitle:seoTitle,
        seoDescription:seoDescription,
          tags: selectedTagsp,
          highlights: selectedHighlightsp,
          post_type_slug: typeSlug,
        seoKeywords:seoKeywords ,});
  } else {
    Inertia.post(route("post.store"), { title, content ,category:selectedCategoriesp ,status, seoTitle:seoTitle,
        seoDescription:seoDescription,
            tags: selectedTagsp,
          highlights: selectedHighlightsp,
          post_type_slug: typeSlug,
        seoKeywords:seoKeywords , });
  }
};


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? `Edit post`: "Create New Post"}
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


<hr />
<div className="p-4">

<h2 className="text-lg font-bold mb-2">Post Details</h2>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-gray-400 rounded p-2 m-4 w-72"
      />

      <select name="status" id="" value={status}
 onChange={(e) => setStatus(e.target.value)}
   className="border m-4 w-50 border-gray-400 rounded" 
 >
  <option value="" disabled>Post Status</option>
  <option value="draft" >Draft</option>
 
  <option value="publish" >Publish</option>
</select>

      <br></br>
<label className="font-bold text-gray-700">Category:</label>
<div className="m-4 space-y-2">

{allCategories.map((cat) => (
  <label key={cat.id} className="flex items-center space-x-2 my-2">
    <input
      type="checkbox"
      value={cat.id}
      checked={selectedCategoriesp.includes(cat.id)}
      onChange={(e) => {
        const id = parseInt(e.target.value);
        if (e.target.checked) {
          setSelectedCategoriesp([...selectedCategoriesp, id]);
        } else {
          setSelectedCategoriesp(selectedCategoriesp.filter((c) => c !== id));
        }
      }}
    />
    <span>{cat.name}</span>
  </label>
))}

</div>

<label className="font-bold text-gray-700">Tags:</label>
<div className="m-4 space-y-2">
  {tags.map((tag) => (
    <label key={tag.id} className="flex items-center space-x-2 my-2">
      <input
        type="checkbox"
        value={tag.id}
        checked={selectedTagsp.includes(tag.id)}
        onChange={(e) => {
          const id = parseInt(e.target.value);
          if (e.target.checked) {
            setSelectedTagsp([...selectedTagsp, id]);
          } else {
            setSelectedTagsp(selectedTagsp.filter((t) => t !== id));
          }
        }}
      />
      <span>{tag.name}</span>
    </label>
  ))}
</div>

<label className="font-bold text-gray-700">Highlights:</label>
<div className="m-4 space-y-2">
  {highlights.map((high) => (
    <label key={high.id} className="flex items-center space-x-2 my-2">
      <input
        type="checkbox"
        value={high.id}
        checked={selectedHighlightsp.includes(high.id)}
        onChange={(e) => {
          const id = parseInt(e.target.value);
          if (e.target.checked) {
            setSelectedHighlightsp([...selectedHighlightsp, id]);
          } else {
            setSelectedHighlightsp(selectedHighlightsp.filter((h) => h !== id));
          }
        }}
      />
      <span>{high.name}</span>
    </label>
  ))}
</div>


  <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {id ? "Update Post" : "Save Post"}
      </button>

</div>
  
    
    </div>
  );
}
