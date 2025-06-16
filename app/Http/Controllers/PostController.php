<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Inertia\Inertia;

use App\Models\PostComponent;
use App\Models\Post_type;

use Illuminate\Http\Request;

class PostController extends Controller
{

function renderShortcodes($content)
{

return preg_replace_callback('/\[card(.*?)\]/', function ($matches) {
        $attrs = [];
        preg_match_all('/(\w+)="([^"]*)"/', $matches[1], $attrMatches, PREG_SET_ORDER);

       foreach ($attrMatches as $attr) {
            $attrs[$attr[1]] = $attr[2];
        }
  return view('Shortcodes', [
    'title' => $attrs['title'] ?? '',
    'image' => $attrs['image'] ?? '',
    'description' => urldecode($attrs['description'] ?? ''),

    'cardStyle' => $attrs['cardStyle'] ?? '{}',
    'titleStyle' => $attrs['titleStyle'] ?? '{}',
    'imageStyle' => $attrs['imageStyle'] ?? '{}',
    'descriptionStyle' => $attrs['descriptionStyle'] ?? '{}',
])->render();

 }, $content);
}


public function index($slug)
{
    $postType = Post_type::where('slug',$slug)->firstOrFail();

    $posts = Post::where('post_type_id', $postType->id)
        ->with('category:id,name')
        ->get(['id', 'title', 'content', 'status', 'category_id']);

    $posts->each(function ($post) {
        $post->content = $this->renderShortcodes($post->content);
    });

    return Inertia::render('ViewPost', [
        'posts' => $posts,
        'postType' => $postType,
    ]);
}



    /**
     * Show the form for creating a new resource.
     */
public function create($slug)
{
    $postType = Post_type::where('slug', $slug)->firstOrFail();

    $categories = $postType->categories()->select('categories.id', 'categories.name')->get();

   
    return Inertia::render('CreatePost', [
        'categories' => $categories,
         'postType' => [
            'id' => $postType->id, 
            'slug' => $postType->slug, 
        ],
    ]);
}


    /**
     * Store a newly created resource in storage.
     */



   public function store(Request $request)
{
    $postType = Post_type::where('slug', $request->post_type_slug)->firstOrFail();

    $post = new Post();
    $post->title = $request->title;
    $post->content = $request->content;
    $post->status = $request->status;
    $post->category_id = $request->category;
    $post->seo_title = $request->seoTitle;
    $post->seo_description = $request->seoDescription;
    $post->seo_keywords = $request->seoKeywords;
    $post->post_type_id = $postType->id;

    $post->save();

    return to_route('post.index' ,$postType->slug)->with('success', 'Post created successfully');

}


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       
    $post = Post::findOrFail($id);
    $post->content = $this->renderShortcodes($post->content);

    
    $seoTitle = $post->seo_title;
    $seoDescription = $post->seo_description;
    $seoKeywords = $post->seo_keywords;

    return inertia('OnePost', [
          'post' => $post,
          'seo' => [
            'title' => $seoTitle,
            'description' => $seoDescription,
            'keywords' => $seoKeywords,
        ]
    ]);


    
    }
    /**
     * Show the form for editing the specified resource.
     */
public function edit($id ,$slug)
{
     $postType = Post_type::where('slug', $slug)->firstOrFail();

    $post = Post::findOrFail($id);
     $categories = $postType->categories()->select('categories.id', 'categories.name')->get();
  
    return inertia('CreatePost', [
        'id' => $post->id,
        'title' => $post->title,
        'category' => $post->category_id,
        'content' => $post->content ,
        'status' => $post->status ,
        'categories' => $categories,
         'seoTitle' => $post->seo_title,
        'seoDescription' => $post->seo_description,
        'seoKeywords' => $post->seo_keywords,
         'postType' => $postType,
    ]);
}

    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, $id ,$slug)
{
     $postType = Post_type::where('slug', $request->post_type_slug)->firstOrFail();

    $post = Post::findOrFail($id);
    $post->title = $request->title;
    $post->content = $request->content;
    $post->status = $request->status;
    $post->category_id = $request->category;
    $post->seo_title = $request->seoTitle;
    $post->seo_description = $request->seoDescription;
    $post->seo_keywords = $request->seoKeywords;
    $post->post_type_id = $postType->id;

    $post->save();

    return to_route('post.index' ,$postType->slug)->with('success', 'Post created successfully');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

    $post = Post::findOrFail($id);
    $post->delete();

    return redirect()->back()->with('success', 'post deleted successfully.');

    }
}
